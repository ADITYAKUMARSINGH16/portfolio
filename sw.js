/**
 * AIR-GAPPED SERVICE WORKER (PWA)
 * Enables 100% offline functionality, static asset caching,
 * and graceful fallback for Aditya Kumar Singh's portfolio.
 */

const CACHE_NAME = 'aditya-sys-v6.5';

// Core local application assets required for 100% offline air-gapped operation
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './style.css',
  './style.css?v=6.5',
  './app.js',
  './app.js?v=6.5',
  './knowledge-base.js',
  './knowledge-base.js?v=6.5',
  './ai-assistant.js',
  './ai-assistant.js?v=6.5',
  './cyber-audio.js',
  './cyber-audio.js?v=6.5',
  './manifest.json',
  './assets/icon-192.svg',
  './assets/icon-512.svg',
  './assets/Aditya_Kumar_Singh_Resume.pdf'
];

// External CDN dependencies (FontAwesome, Lenis, Google Fonts)
const EXTERNAL_CDN_ASSETS = [
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/webfonts/fa-solid-900.woff2',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/webfonts/fa-brands-400.woff2',
  'https://unpkg.com/lenis@1.1.18/dist/lenis.min.js',
  'https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800;900&display=swap'
];

// 1. Install & Pre-cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      // Pre-cache core local assets
      await cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('[SW] Core precache warning:', err);
      });

      // Best-effort pre-cache for external CDN dependencies
      await Promise.allSettled(
        EXTERNAL_CDN_ASSETS.map((url) =>
          fetch(url, { mode: 'cors' })
            .then((res) => {
              if (res.ok || res.type === 'opaque') {
                return cache.put(url, res);
              }
            })
            .catch((err) => console.warn('[SW] External asset caching bypassed for:', url, err))
        )
      );
    }).then(() => self.skipWaiting())
  );
});

// 2. Activate & Purge Old Caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            console.log('[SW] Deleting obsolete cache:', name);
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. Fetch Strategy: Cache-First for Local, Stale-While-Revalidate for CDN/Fonts
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Ignore non-GET requests
  if (event.request.method !== 'GET') return;

  // Handle local origin requests (Cache First with ignoreSearch fallback)
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          // Fetch update in background to keep cache fresh
          fetch(event.request).then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => cache.put(event.request, networkResponse));
            }
          }).catch(() => {});
          return cachedResponse;
        }

        // Check fallback without query string if version query missed
        return caches.match(event.request, { ignoreSearch: true }).then((queryFallback) => {
          if (queryFallback) {
            fetch(event.request).then((networkResponse) => {
              if (networkResponse && networkResponse.status === 200) {
                caches.open(CACHE_NAME).then((cache) => cache.put(event.request, networkResponse));
              }
            }).catch(() => {});
            return queryFallback;
          }

          return fetch(event.request).then((networkResponse) => {
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse;
            }
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseToCache));
            return networkResponse;
          }).catch(() => {
            // If HTML request fails offline, fallback to index.html
            if (event.request.headers.get('accept')?.includes('text/html')) {
              return caches.match('./index.html');
            }
          });
        });
      })
    );
    return;
  }

  // Handle external CDN/Fonts requests (Stale While Revalidate)
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        if (networkResponse && (networkResponse.status === 200 || networkResponse.type === 'opaque')) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseToCache));
        }
        return networkResponse;
      }).catch(() => {
        return cachedResponse;
      });

      return cachedResponse || fetchPromise;
    })
  );
});
