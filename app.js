/**
 * Aditya Kumar Singh - Autonomous Systems & Intelligence Dossier
 * Main Interactive Application Controller
 */

import { ADITYA_PROFILE, ADITYA_SKILLS, ADITYA_PROJECTS } from './knowledge-base.js';
import { PortfolioAIAssistant } from './ai-assistant.js';
import { cyberAudio } from './cyber-audio.js';

let lenisInstance = null;
const coPilot = new PortfolioAIAssistant();

document.addEventListener('DOMContentLoaded', () => {
  initLenisSmoothScroll();
  initCyberAudio();
  initThemeToggle();
  initMetricsCards();
  initResumeModal();
  initLiveClock();
  initParticleCanvas();
  initTypingEffect();
  renderSystemPillars();
  renderArchitectureProjects('all');
  renderArsenalMatrix();
  initTextScramble();
  initSkillCircuitSync();
  initProjectFilters();
  initAICoPilotChat();
  initFloatingCoPilot();
  initCyberTerminal();
  initContactHub();
  initSettingsModal();
  initMobileMenu();
  initScrollSpy();
  initScrollProgressBar();
  initHeroScrollIndicator();
  initScrollObserver();
  initArchInspectorModal();
  initCommandPalette();
  initProjectSandboxModal();
  initParallaxTilt();
  registerServiceWorker();
  initNetworkTelemetry();
  initPWAInstall();

  // Update footer year
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

/* ==========================================================================
   0. AIR-GAPPED PWA SERVICE WORKER & NETWORK TELEMETRY
   ========================================================================== */
let deferredPwaPrompt = null;

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').then((reg) => {
        console.log('[PWA] Air-Gapped Service Worker active:', reg.scope);
      }).catch((err) => {
        console.warn('[PWA] Service Worker registration failed:', err);
      });
    });
  }
}

function initNetworkTelemetry() {
  const ribbonIndicator = document.getElementById('telemetry-network-indicator');
  const pulseDot = document.getElementById('network-pulse-dot');
  const statusText = document.getElementById('network-status-text');

  function updateNetworkStatus(isExplicitOffline = false) {
    const isOnline = isExplicitOffline ? false : navigator.onLine;
    if (isOnline) {
      ribbonIndicator?.classList.remove('offline');
      pulseDot?.classList.remove('pulse-emerald');
      if (statusText) statusText.innerHTML = 'AIR-GAPPED &amp; OFFLINE AI R&amp;D';
    } else {
      ribbonIndicator?.classList.add('offline');
      pulseDot?.classList.add('pulse-emerald');
      if (statusText) statusText.innerHTML = 'AIR-GAPPED MODE ACTIVE (100% OFFLINE)';
      cyberAudio.play('whoosh');
      showToast('Air-Gapped Mode: Running 100% Offline 🛡️');

      // Update stat cards to offline cached state
      document.querySelectorAll('#fallback-metric-leetcode, #fallback-metric-gfg, #fallback-metric-github').forEach(fb => {
        fb.style.display = 'flex';
        if (!fb.querySelector('.metric-offline-badge')) {
          const b = document.createElement('span');
          b.className = 'metric-offline-badge';
          b.innerHTML = '<i class="fa-solid fa-shield-halved"></i> OFFLINE CACHED';
          fb.appendChild(b);
        }
      });
      document.querySelectorAll('#img-metric-leetcode, #img-metric-gfg, #img-metric-github').forEach(img => {
        img.style.display = 'none';
      });
    }
  }

  window.addEventListener('online', () => {
    updateNetworkStatus(false);
    cyberAudio.play('chime');
    showToast('Telemetry Link Restored: Online 🌐');
    updateMetricsCardsTheme(document.documentElement.getAttribute('data-theme') || 'dark');
  });

  window.addEventListener('offline', () => updateNetworkStatus(true));
  updateNetworkStatus();
}

function initPWAInstall() {
  const installBtn = document.getElementById('btn-install-pwa');

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPwaPrompt = e;
    if (installBtn) installBtn.classList.remove('hidden');
  });

  installBtn?.addEventListener('click', async () => {
    if (!deferredPwaPrompt) {
      showToast('App is already running in standalone mode or installed! 📱');
      return;
    }
    cyberAudio.play('success');
    deferredPwaPrompt.prompt();
    const { outcome } = await deferredPwaPrompt.userChoice;
    if (outcome === 'accepted') {
      showToast('Installing Aditya // SYS Native App... 🚀');
    }
    deferredPwaPrompt = null;
    installBtn.classList.add('hidden');
  });

  window.addEventListener('appinstalled', () => {
    installBtn?.classList.add('hidden');
    showToast('Aditya // SYS Native App Installed! 📱');
  });
}

/* ==========================================================================
   0.5. CYBER AUDIO HAPTIC CONTROLLER (WEB AUDIO API)
   ========================================================================== */
function initCyberAudio() {
  const soundBtn = document.getElementById('btn-sound-toggle');
  const icon = document.getElementById('sound-toggle-icon');
  if (!soundBtn || !icon) return;

  const isMuted = localStorage.getItem('aditya_portfolio_sfx') === 'muted';
  if (isMuted) {
    soundBtn.classList.add('muted');
    icon.className = 'fa-solid fa-volume-xmark';
  } else {
    soundBtn.classList.remove('muted');
    icon.className = 'fa-solid fa-volume-high';
  }

  soundBtn.addEventListener('click', () => {
    const active = cyberAudio.toggleMute();
    if (active) {
      soundBtn.classList.remove('muted');
      icon.className = 'fa-solid fa-volume-high';
      showToast('Cyber Audio Haptics: Active 🔊');
    } else {
      soundBtn.classList.add('muted');
      icon.className = 'fa-solid fa-volume-xmark';
      showToast('Cyber Audio: Muted 🔇');
    }
  });
}

/* ==========================================================================
   1. QUANTUM SHIFT THEME TOGGLE (NEURAL DARK / STUDIO LIGHT)
   ========================================================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById('btn-theme-toggle');
  const icon = document.getElementById('theme-toggle-icon');
  const html = document.documentElement;

  // Retrieve saved preference or default to dark
  const savedTheme = localStorage.getItem('aditya_theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme, icon);
  updateMetricsCardsTheme(savedTheme);

  toggleBtn?.addEventListener('click', () => {
    cyberAudio.play('chime');
    const currentTheme = html.getAttribute('data-theme') || 'dark';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';

    html.setAttribute('data-theme', nextTheme);
    localStorage.setItem('aditya_theme', nextTheme);
    updateThemeIcon(nextTheme, icon);
    updateMetricsCardsTheme(nextTheme);
    showToast(`Switched to ${nextTheme === 'dark' ? 'Neural Obsidian Dark' : 'Studio Light'} mode`);
  });
}

function updateThemeIcon(theme, iconEl) {
  if (!iconEl) return;
  if (theme === 'dark') {
    iconEl.className = 'fa-solid fa-sun';
  } else {
    iconEl.className = 'fa-solid fa-moon';
  }
}

/* ==========================================================================
   METRIC STAT CARDS (THEME SYNC & GRACEFUL FALLBACKS)
   ========================================================================== */
function initMetricsCards() {
  const cards = [
    { imgId: 'img-metric-leetcode', fallbackId: 'fallback-metric-leetcode' },
    { imgId: 'img-metric-gfg', fallbackId: 'fallback-metric-gfg' },
    { imgId: 'img-metric-github', fallbackId: 'fallback-metric-github' }
  ];

  cards.forEach(({ imgId, fallbackId }) => {
    const img = document.getElementById(imgId);
    const fallback = document.getElementById(fallbackId);
    if (!img || !fallback) return;

    img.addEventListener('error', () => {
      img.style.display = 'none';
      fallback.style.display = 'flex';
    });

    img.addEventListener('load', () => {
      img.style.display = 'block';
      fallback.style.display = 'none';
    });
  });

  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  updateMetricsCardsTheme(currentTheme);
}

function updateMetricsCardsTheme(theme) {
  const isLight = theme === 'light';

  const lcImg = document.getElementById('img-metric-leetcode');
  if (lcImg) {
    lcImg.src = `https://leetcard.jacoblin.cool/singhaditya7864?theme=${isLight ? 'light' : 'dark'}&font=Fira%20Code`;
  }

  const gfgImg = document.getElementById('img-metric-gfg');
  if (gfgImg) {
    gfgImg.src = `https://gfgstatscard.vercel.app/singhaditya7864?theme=${isLight ? 'light' : 'dark'}`;
  }

  const ghImg = document.getElementById('img-metric-github');
  if (ghImg) {
    ghImg.src = isLight
      ? 'https://github-readme-stats.vercel.app/api?username=ADITYAKUMARSINGH16&show_icons=true&theme=default&hide_border=true&bg_color=ffffff&title_color=0284c7&icon_color=0284c7&text_color=0f172a'
      : 'https://github-readme-stats.vercel.app/api?username=ADITYAKUMARSINGH16&show_icons=true&theme=tokyonight&hide_border=true&bg_color=0d1117&title_color=38bdf8&icon_color=38bdf8&text_color=e2e8f0';
  }
}

/* ==========================================================================
   RESUME DOSSIER MODAL
   ========================================================================== */
function initResumeModal() {
  const modal = document.getElementById('resume-dossier-modal');
  const closeBtn = document.getElementById('btn-close-resume-modal');
  const copyBtn = document.getElementById('btn-copy-resume-summary');
  const heroBtn = document.getElementById('hero-resume-btn');
  const heroPreviewBtn = document.getElementById('hero-preview-cv-btn');
  const navBtn = document.getElementById('nav-resume-btn');
  const footerLink = document.getElementById('footer-resume-link');

  if (!modal) return;

  function openResume() {
    modal.classList.add('active');
  }

  function closeResume() {
    modal.classList.remove('active');
  }

  heroPreviewBtn?.addEventListener('click', openResume);
  footerLink?.addEventListener('click', (e) => {
    e.preventDefault();
    openResume();
  });
  closeBtn?.addEventListener('click', closeResume);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeResume();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeResume();
    }
  });

  copyBtn?.addEventListener('click', () => {
    const summary = `ADITYA KUMAR SINGH - CURRICULUM VITAE
Phone: (+91) 7273963985 | Email: singhaditya7864@gmail.com
GitHub: https://github.com/ADITYAKUMARSINGH16 | LinkedIn: https://www.linkedin.com/in/aditya-kumar-singh-7a439b315/
Permanent Address: Katihar, Bihar, India | College: Techno India University, West Bengal

PROFILE:
Motivated Computer Science and Business Systems undergraduate with hands-on experience developing AI-powered applications using Python, FastAPI, Ollama, Retrieval-Augmented Generation (RAG), and Docker. Skilled in locally hosted AI systems, voice assistants, semantic search, and multi-agent workflows.

EDUCATION:
- B.Tech in Computer Science and Business Systems (CSBS) | Techno India University (Aug 2022 – July 2026) | CGPA: 7.54/10
- Higher Secondary: A. A. M. Children’s Academy, Katihar, Bihar (Aug 2019 – July 2021) | 65.8%
- Secondary: R. K. M. Vidya Mandir, Katihar, Bihar (Aug 2017 – May 2019) | 63.8%

FEATURED PROJECTS:
- AURA: Autonomous AI Voice Assistant (Python, FastAPI, Ollama, Gemma, STT/TTS, OCR, Tactical HUD)
- Nyaya AI Offline: AI-Powered Legal Assistant (Python, Ollama, RAG, Docker, n8n, Pinecone, Multi-Agent Reasoning)
- Wiz-Bulb-Sync: Ambient IoT Lighting Automation (Python, UDP Sockets, WiZ Protocol, Sub-50ms Sync)

TECHNICAL SKILLS:
- Languages: Python, Java, JavaScript, SQL
- AI/ML: Generative AI, Large Language Models (LLMs), RAG, Ollama, Vector Embeddings, Semantic Search, Multi-Agent Systems
- Tools & Frameworks: FastAPI, Docker, n8n, Pinecone, Git, GitHub, REST APIs, OCR, STT, TTS

CERTIFICATIONS:
- Cybersecurity Virtual Internship – EduSkills (Palo Alto Networks) [May – July 2023]
- Android Developer Virtual Internship – EduSkills (Google for Developers) [Sep – Nov 2023]
- Networking Virtual Internship – EduSkills (Juniper Networks) [Jan – Mar 2024]`;

    navigator.clipboard.writeText(summary).then(() => {
      showToast('Official Resume summary copied to clipboard! 📋');
    });
  });
}

/* ==========================================================================
   1.5. ARCHITECTURE STEP INSPECTOR MODAL (PHASE 2 DEEP DIVE)
   ========================================================================== */
let activeInspectorProject = null;
let activeInspectorStep = 0;

function initArchInspectorModal() {
  const modal = document.getElementById('arch-inspector-modal');
  const closeBtn = document.getElementById('btn-close-arch-inspector');
  const askBtn = document.getElementById('inspector-ask-copilot-btn');

  closeBtn?.addEventListener('click', () => modal?.classList.remove('active'));
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.classList.contains('active')) {
      modal.classList.remove('active');
    }
  });

  askBtn?.addEventListener('click', () => {
    if (!activeInspectorProject) return;
    modal?.classList.remove('active');
    const proj = ADITYA_PROJECTS.find(p => p.id === activeInspectorProject);
    const step = proj?.architecture?.[activeInspectorStep];
    const query = `Explain how ${proj?.title} implements ${step?.title || 'its architecture'}`;
    handleDirectProjectQuery(query);
  });
}

function openArchInspector(projectId, stepIndex = 0) {
  const proj = ADITYA_PROJECTS.find(p => p.id === projectId);
  if (!proj || !proj.architecture) return;

  activeInspectorProject = projectId;
  activeInspectorStep = stepIndex;

  const modal = document.getElementById('arch-inspector-modal');
  const badge = document.getElementById('inspector-project-badge');
  const repoLink = document.getElementById('inspector-repo-link');

  if (badge) badge.textContent = `<${proj.title.split(' ')[0].toUpperCase()} // SYS>`;
  if (repoLink) repoLink.href = proj.github;

  renderInspectorStep(proj, stepIndex);
  modal?.classList.add('active');
}

function renderInspectorStep(proj, stepIndex) {
  activeInspectorStep = stepIndex;
  const step = proj.architecture[stepIndex];
  if (!step) return;

  const numEl = document.getElementById('inspector-step-num');
  const titleEl = document.getElementById('inspector-step-title');
  const descEl = document.getElementById('inspector-step-desc');
  const packetCode = document.getElementById('inspector-packet-code');
  const decisionBox = document.getElementById('inspector-decision-text');
  const techPills = document.getElementById('inspector-tech-pills');
  const switcher = document.getElementById('inspector-step-switcher');

  if (numEl) numEl.textContent = step.step;
  if (titleEl) titleEl.textContent = step.title;
  if (descEl) descEl.textContent = step.desc;

  if (packetCode) {
    packetCode.textContent = step.packet || `// Simulated Telemetry Datagram\n{\n  "node": "${step.title}",\n  "status": "HEALTHY_ACTIVE"\n}`;
  }

  if (decisionBox) {
    decisionBox.innerHTML = `<strong>Architectural Rationale:</strong> ${step.designNote || 'Engineered with strict local execution, thread safety, and minimal memory overhead.'}`;
  }

  if (techPills) {
    techPills.innerHTML = proj.techStack.map(t => `<span>${t}</span>`).join('');
  }

  if (switcher) {
    switcher.innerHTML = proj.architecture.map((s, idx) => `
      <button type="button" class="step-switch-btn ${idx === stepIndex ? 'active' : ''}" data-step-idx="${idx}">
        Step ${s.step}: ${s.title.split(' ')[0]}
      </button>
    `).join('');

    switcher.querySelectorAll('[data-step-idx]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.getAttribute('data-step-idx'), 10);
        renderInspectorStep(proj, idx);
      });
    });
  }
}

/* ==========================================================================
   1.5. INTERACTIVE PROJECT SIMULATION LAB / LIVE SANDBOX (PHASE 3)
   ========================================================================== */
function initProjectSandboxModal() {
  const modal = document.getElementById('project-sandbox-modal');
  const closeBtn = document.getElementById('btn-close-sandbox');
  const tabs = document.querySelectorAll('.sandbox-tab-btn');
  const contents = document.querySelectorAll('.sandbox-tab-content');

  if (!modal) return;

  closeBtn?.addEventListener('click', () => {
    modal.classList.remove('active');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      modal.classList.remove('active');
    }
  });

  // Tab Switching
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      cyberAudio.play('keyClick');
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      const targetTab = tab.getAttribute('data-sandbox-tab');
      const targetContent = document.getElementById(`tab-sandbox-${targetTab}`);
      if (targetContent) targetContent.classList.add('active');
    });
  });

  // 1. WiZ-Bulb UDP Simulation Logic
  let currentColor = '#38bdf8';
  let currentDimming = 100;

  const bulbGlass = document.getElementById('wiz-bulb-glass');
  const ambientGlow = document.getElementById('wiz-ambient-glow');
  const dimmingSlider = document.getElementById('wiz-dimming-slider');
  const dimmingVal = document.getElementById('wiz-dimming-val');
  const customColorInput = document.getElementById('wiz-custom-color');
  const presetDots = document.querySelectorAll('.wiz-preset-dot');
  const transmitBtn = document.getElementById('btn-transmit-udp');
  const packetStream = document.getElementById('wiz-packet-stream');
  const pingPill = document.getElementById('wiz-ping-pill');
  const statusText = document.getElementById('wiz-status-text');

  function hexToRgb(hex) {
    const clean = hex.replace('#', '');
    const num = parseInt(clean, 16);
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255
    };
  }

  function updateBulbVisuals(colorHex, dimming) {
    currentColor = colorHex;
    currentDimming = dimming;
    const rgb = hexToRgb(colorHex);
    const alpha = (dimming / 100).toFixed(2);

    if (bulbGlass) {
      bulbGlass.style.background = `radial-gradient(circle at 35% 35%, #ffffff 0%, ${colorHex} 45%, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.8) 100%)`;
      bulbGlass.style.boxShadow = `0 0 ${Math.round(25 * (dimming / 100))}px ${colorHex}, inset 0 0 15px rgba(255, 255, 255, 0.6)`;
    }

    if (ambientGlow) {
      ambientGlow.style.background = `radial-gradient(circle, ${colorHex} 0%, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${0.25 * (dimming / 100)}) 45%, transparent 70%)`;
      ambientGlow.style.opacity = (0.35 + 0.5 * (dimming / 100)).toFixed(2);
      ambientGlow.style.transform = `scale(${(0.85 + 0.3 * (dimming / 100)).toFixed(2)})`;
    }

    if (dimmingVal) dimmingVal.textContent = `${dimming}%`;

    const packet = {
      method: "setPilot",
      env: "local_udp_broadcast",
      target_ip: "192.168.1.150",
      target_port: 38899,
      params: {
        r: rgb.r,
        g: rgb.g,
        b: rgb.b,
        dimming: parseInt(dimming, 10)
      },
      telemetry: {
        status: "READY",
        socket_type: "SOCK_DGRAM"
      }
    };

    if (packetStream) packetStream.textContent = JSON.stringify(packet, null, 2);
  }

  presetDots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      cyberAudio.play('keyClick');
      presetDots.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
      const c = dot.getAttribute('data-color');
      if (customColorInput) customColorInput.value = c;
      updateBulbVisuals(c, currentDimming);
    });
  });

  customColorInput?.addEventListener('input', (e) => {
    presetDots.forEach(d => d.classList.remove('active'));
    updateBulbVisuals(e.target.value, currentDimming);
  });

  dimmingSlider?.addEventListener('input', (e) => {
    updateBulbVisuals(currentColor, e.target.value);
  });

  transmitBtn?.addEventListener('click', () => {
    cyberAudio.play('ping');
    const rgb = hexToRgb(currentColor);
    const simulatedPing = (Math.random() * 3.5 + 4.8).toFixed(1);

    if (pingPill) pingPill.textContent = `${simulatedPing} ms (LAN ACK)`;
    if (statusText) statusText.textContent = `UDP Socket Sent • ${simulatedPing}ms RTT`;

    const packet = {
      method: "setPilot",
      env: "local_udp_broadcast",
      target_ip: "192.168.1.150",
      target_port: 38899,
      params: {
        r: rgb.r,
        g: rgb.g,
        b: rgb.b,
        dimming: parseInt(currentDimming, 10)
      },
      telemetry: {
        status: "ACK_RECEIVED",
        socket_type: "SOCK_DGRAM",
        round_trip_ms: parseFloat(simulatedPing),
        packet_loss: "0.0%"
      }
    };

    if (packetStream) packetStream.textContent = JSON.stringify(packet, null, 2);
    showToast(`WiZ UDP datagram transmitted (${simulatedPing}ms RTT) 💡`);
  });

  // Initialize WiZ default state
  updateBulbVisuals('#38bdf8', 100);

  // 2. AURA Tactical HUD Sandbox Logic
  const auraCmdButtons = document.querySelectorAll('.aura-cmd-btn');
  const auraConsole = document.getElementById('aura-response-console');

  const auraResponses = {
    status: `[AURA SYS // 16:20:00]\n• Core Engine: FastAPI on 127.0.0.1:8000 (PID 4921)\n• Local LLM: Ollama/Gemma:2b-instruct (4096 ctx)\n• Audio Stream: PyAudio 16kHz WebRTC VAD active\n• Tactical HUD: Rendering 60.0 FPS\n> All autonomous submodules operational.`,
    diagnostic: `[AURA DIAGNOSTIC SCAN]\n• Memory Footprint: 218 MB VRAM / 640 MB RAM\n• Audio Latency: 18.2 ms end-to-end\n• Token Generation: 44.8 tokens/sec on local accelerator\n• Network: 100% Air-Gapped (0 external requests)\n> Security integrity: ZERO DATA LEAKS DETECTED.`,
    ocr: `[AURA VISION OCR CAPTURE]\n• Screen Area: Primary Display (2560x1440)\n• Ingestion: Tesseract OCR + OpenCV grayscale preprocessing\n• Detected Code Snippet: "class TransformerBlock(nn.Module)"\n• Context Injected into Gemma conversational buffer\n> Context ready for voice discussion.`
  };

  auraCmdButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      cyberAudio.play('whoosh');
      auraCmdButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cmdKey = btn.getAttribute('data-aura-cmd');
      if (auraConsole && auraResponses[cmdKey]) {
        auraConsole.innerHTML = `<code>${escapeHtml(auraResponses[cmdKey]).replace(/\n/g, '<br/>')}</code>`;
      }
    });
  });

  // 3. Nyaya AI Courtroom Simulation Logic
  const nyayaCaseButtons = document.querySelectorAll('.nyaya-case-btn');
  const nyayaPipeline = document.getElementById('nyaya-agents-pipeline');
  const nyayaVerdict = document.getElementById('nyaya-verdict-box');

  const nyayaCases = {
    ip: {
      title: "AI Code Infringement under Copyright Act 1957",
      agents: [
        { role: "Legal Assistant", icon: "fa-robot", task: "Pinecone semantic retrieval queried Sections 14, 51 & 52 of Copyright Act 1957. Identified relevant case precedent: Eastern Book Co. v. D.B. Modak." },
        { role: "Petitioner Counsel", icon: "fa-scale-balanced", task: "Argues unauthorized scraping without license constitutes infringement of owner's exclusive reproduction rights under Sec 14(a)(i)." },
        { role: "Defense Counsel", icon: "fa-shield-halved", task: "Pleads statutory Fair Dealing defense under Section 52(1)(a)(i) for non-commercial research and algorithmic transformation." },
        { role: "Judicial Bench", icon: "fa-gavel", task: "Balanced Decree: Mere statistical model weights do not reproduce verbatim expression; dismissed subject to strict attribution." }
      ],
      verdict: "<strong>Judicial Consensus Verdict:</strong> The bench establishes that ephemeral training tokenization constitutes non-infringing transformative use under Indian jurisprudence, provided source attribution is preserved."
    },
    contract: {
      title: "Smart Contract Automated Breach under Section 73 ICA",
      agents: [
        { role: "Legal Assistant", icon: "fa-robot", task: "Indexed Section 73 & 74 of the Indian Contract Act 1872 regarding compensation for breach of unliquidated obligations." },
        { role: "Petitioner Counsel", icon: "fa-scale-balanced", task: "Claims automated oracle exploit resulted in unconscionable loss of token collateral without consent." },
        { role: "Defense Counsel", icon: "fa-shield-halved", task: "Asserts protocol terms: 'Code is law' constitutes voluntary assumption of technical execution risk (volenti non fit injuria)." },
        { role: "Judicial Bench", icon: "fa-gavel", task: "Holding: Algorithmic autonomy does not supersede statutory requirements of free consent under Section 10 of ICA." }
      ],
      verdict: "<strong>Judicial Consensus Verdict:</strong> Restitution granted. While protocol execution is decentralized, contractual validity under Section 10 ICA requires consensus ad idem, requiring return of collateral."
    },
    dpdp: {
      title: "Cross-Border Data Transfer under DPDP Act 2023",
      agents: [
        { role: "Legal Assistant", icon: "fa-robot", task: "Queried Digital Personal Data Protection Act 2023, Sections 16 & 33 (Data Fiduciary responsibilities and territorial restrictions)." },
        { role: "Petitioner Counsel", icon: "fa-scale-balanced", task: "Highlights cross-border telemetry routing of biometric voice data without verifiable parental/explicit consent." },
        { role: "Defense Counsel", icon: "fa-shield-halved", task: "Demonstrates 100% local on-device inference via air-gapped Gemma model; no data ever leaves localhost." },
        { role: "Judicial Bench", icon: "fa-gavel", task: "Finding: Since data processing is strictly local (localhost loopback), no cross-border transmission took place." }
      ],
      verdict: "<strong>Judicial Consensus Verdict:</strong> Full Compliance Validated. Because Nyaya AI and AURA run air-gapped on client hardware, zero statutory DPDP data transfers occurred. Complaint dismissed."
    }
  };

  function renderNyayaCase(caseKey) {
    const data = nyayaCases[caseKey] || nyayaCases.ip;
    if (nyayaPipeline) {
      nyayaPipeline.innerHTML = data.agents.map((ag, i) => `
        <div class="nyaya-agent-card active-step">
          <div class="nyaya-agent-header">
            <i class="fa-solid ${ag.icon}"></i>
            <span>Agent ${i + 1}: ${ag.role}</span>
          </div>
          <div class="nyaya-agent-action">${ag.task}</div>
        </div>
      `).join('');
    }
    if (nyayaVerdict) {
      nyayaVerdict.innerHTML = data.verdict;
    }
  }

  nyayaCaseButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      cyberAudio.play('keyClick');
      nyayaCaseButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const caseKey = btn.getAttribute('data-case');
      renderNyayaCase(caseKey);
    });
  });

  renderNyayaCase('ip');

  // 4. Emotion Detector Simulator Logic
  const emotionPresetChips = document.querySelectorAll('[data-emotion-preset]');
  const emotionBadge = document.getElementById('emotion-primary-tag');
  const barFocused = document.getElementById('prob-bar-focused');
  const barNeutral = document.getElementById('prob-bar-neutral');
  const barHappy = document.getElementById('prob-bar-happy');
  const barSurprised = document.getElementById('prob-bar-surprised');
  const valFocused = document.getElementById('prob-val-focused');
  const valNeutral = document.getElementById('prob-val-neutral');
  const valHappy = document.getElementById('prob-val-happy');
  const valSurprised = document.getElementById('prob-val-surprised');

  const emotionPresets = {
    focused: { primary: "FOCUSED (94.2%)", focused: 94, neutral: 18, happy: 42, surprised: 6 },
    happy: { primary: "OFFER EXTENDED (96.5%)", focused: 65, neutral: 12, happy: 96, surprised: 34 },
    surprised: { primary: "IMPRESSED (89.0%)", focused: 72, neutral: 8, happy: 62, surprised: 89 }
  };

  emotionPresetChips.forEach(chip => {
    chip.addEventListener('click', () => {
      cyberAudio.play('keyClick');
      const presetKey = chip.getAttribute('data-emotion-preset');
      const p = emotionPresets[presetKey] || emotionPresets.focused;

      if (emotionBadge) emotionBadge.textContent = p.primary;
      if (barFocused) barFocused.style.width = `${p.focused}%`;
      if (barNeutral) barNeutral.style.width = `${p.neutral}%`;
      if (barHappy) barHappy.style.width = `${p.happy}%`;
      if (barSurprised) barSurprised.style.width = `${p.surprised}%`;

      if (valFocused) valFocused.textContent = `${p.focused}%`;
      if (valNeutral) valNeutral.textContent = `${p.neutral}%`;
      if (valHappy) valHappy.textContent = `${p.happy}%`;
      if (valSurprised) valSurprised.textContent = `${p.surprised}%`;
    });
  });
}

function openProjectSandbox(projectId = 'wiz') {
  const modal = document.getElementById('project-sandbox-modal');
  if (!modal) return;

  let tabName = 'wiz';
  if (projectId.includes('aura')) tabName = 'aura';
  else if (projectId.includes('nyaya') || projectId.includes('nayaya')) tabName = 'nyaya';
  else if (projectId.includes('emotion') || projectId.includes('vision')) tabName = 'emotion';
  else tabName = 'wiz';

  // Activate tab
  const tabs = document.querySelectorAll('.sandbox-tab-btn');
  const contents = document.querySelectorAll('.sandbox-tab-content');

  tabs.forEach(t => {
    t.classList.toggle('active', t.getAttribute('data-sandbox-tab') === tabName);
  });

  contents.forEach(c => {
    c.classList.toggle('active', c.id === `tab-sandbox-${tabName}`);
  });

  modal.classList.add('active');
  cyberAudio.play('whoosh');
}

/* ==========================================================================
   1.6. 3D INTERACTIVE PARALLAX TILT
   ========================================================================== */
function initParallaxTilt() {
  const tiltElements = document.querySelectorAll('.arch-card, .pillar-card, .hero-avatar-card');
  tiltElements.forEach(el => {
    el.classList.add('interactive-tilt');

    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      el.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });
}

/* ==========================================================================
   2. LIVE IST CLOCK (TELEMETRY RIBBON)
   ========================================================================== */
function initLiveClock() {
  const clockEl = document.getElementById('live-ist-clock');
  if (!clockEl) return;

  function updateTime() {
    const now = new Date();
    // Format to Indian Standard Time (IST)
    const options = {
      timeZone: 'Asia/Kolkata',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    const timeString = new Intl.DateTimeFormat('en-IN', options).format(now);
    clockEl.innerHTML = `<i class="fa-regular fa-clock" style="color: var(--accent-cyan); margin-right: 4px;"></i> India (IST) • ${timeString}`;
  }

  updateTime();
  setInterval(updateTime, 1000);
}

/* ==========================================================================
   3. NEURAL PARTICLE CANVAS
   ========================================================================== */
function initParticleCanvas() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor((width * height) / 19000), 60);

  const mouse = { x: -1000, y: -1000, radius: 130 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.radius = Math.random() * 1.6 + 0.8;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.hypot(dx, dy);
      if (dist < mouse.radius) {
        const force = (mouse.radius - dist) / mouse.radius;
        this.x -= (dx / dist) * force * 2;
        this.y -= (dy / dist) * force * 2;
      }
    }

    draw() {
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? 'rgba(56, 189, 248, 0.6)' : 'rgba(2, 132, 199, 0.4)';
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.hypot(dx, dy);

        if (dist < 125) {
          const alpha = (1 - dist / 125) * (isDark ? 0.2 : 0.08);
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   4. DYNAMIC TYPING SUBTITLE
   ========================================================================== */
function initTypingEffect() {
  const target = document.getElementById('hero-typing-target');
  if (!target) return;

  const lines = [
    "Offline Legal Tech (Nayaya AI • Air-Gapped RAG)",
    "Ambient Smart Hardware (Wiz-Bulb-Sync • Local UDP)",
    "Edge Computer Vision (Real-Time Emotion Recognition)",
    "Algorithmic Problem Solving (LeetCode & GFG)"
  ];

  let lineIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentLine = lines[lineIndex];

    if (isDeleting) {
      target.textContent = currentLine.substring(0, charIndex - 1);
      charIndex--;
    } else {
      target.textContent = currentLine.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? 25 : 55;

    if (!isDeleting && charIndex === currentLine.length) {
      delay = 2400;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      lineIndex = (lineIndex + 1) % lines.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }

  type();
}

/* ==========================================================================
   5. RENDER SYSTEM PILLARS
   ========================================================================== */
function renderSystemPillars() {
  const container = document.getElementById('system-pillars-container');
  if (!container) return;

  container.innerHTML = ADITYA_PROFILE.pillars.map(pillar => `
    <div class="pillar-card">
      <span class="hud-corner top-left"></span>
      <span class="hud-corner top-right"></span>
      <span class="hud-corner bottom-left"></span>
      <span class="hud-corner bottom-right"></span>
      <div class="pillar-header">
        <span class="pillar-icon">${pillar.icon}</span>
        <h3 class="pillar-title">${pillar.title}</h3>
      </div>
      <p class="pillar-summary">${pillar.summary}</p>
    </div>
  `).join('');
}

/* ==========================================================================
   6. RENDER ARCHITECTURE PROJECTS
   ========================================================================== */
function renderArchitectureProjects(filter = 'all') {
  const container = document.getElementById('architecture-container');
  if (!container) return;

  const filtered = filter === 'all' 
    ? ADITYA_PROJECTS 
    : ADITYA_PROJECTS.filter(p => p.category === filter);

  container.innerHTML = filtered.map(proj => `
    <article class="arch-card" data-category="${proj.category}">
      <span class="hud-corner top-left"></span>
      <span class="hud-corner top-right"></span>
      <span class="hud-corner bottom-left"></span>
      <span class="hud-corner bottom-right"></span>
      <div class="arch-card-top">
        <span class="arch-card-icon">${proj.icon}</span>
        <span class="arch-status-pill ${proj.statusColor || 'cyan'}">
          <span class="pulse-dot-sm"></span> ${proj.status}
        </span>
      </div>

      <h3 class="arch-title">${proj.title}</h3>
      <p class="arch-summary">${proj.summary}</p>

      <!-- System Flow Visualization -->
      ${proj.architecture ? `
        <div class="arch-flow-diagram">
          <div class="flow-header">
            <span><i class="fa-solid fa-network-wired"></i> System Architecture Flow</span>
            <span class="flow-interactive-badge"><i class="fa-solid fa-arrow-pointer"></i> Click step to inspect</span>
          </div>
          <ul class="flow-steps-list">
            ${proj.architecture.map((s, idx) => `
              <li class="flow-step-item interactive-step" data-project-id="${proj.id}" data-step-index="${idx}" title="Click to inspect this architectural node">
                <span class="step-num">${s.step}</span>
                <div>
                  <span class="step-name">${s.title}:</span> ${s.desc}
                </div>
                <i class="fa-solid fa-chevron-right step-arrow-icon"></i>
              </li>
            `).join('')}
          </ul>
        </div>
      ` : ''}

      <div class="arch-tech-tags">
        ${proj.techStack.map(t => `<span class="arch-tag">${t}</span>`).join('')}
      </div>

      <div class="arch-footer">
        <button type="button" class="arch-btn inspect-btn" data-inspect-project="${proj.id}" title="Deep Dive Architecture Inspector">
          <i class="fa-solid fa-magnifying-glass-chart"></i> Deep Dive
        </button>
        <button type="button" class="arch-btn sandbox-btn" data-sandbox-project="${proj.id}" title="Launch Interactive Simulation Lab">
          <i class="fa-solid fa-flask"></i> Interactive Lab
        </button>
        <a href="${proj.github}" target="_blank" rel="noopener noreferrer" class="arch-btn" title="View Source Code">
          <i class="fa-brands fa-github"></i> Source
        </a>
        ${proj.liveDemo ? `
          <a href="${proj.liveDemo}" target="_blank" rel="noopener noreferrer" class="arch-btn" title="Live Preview">
            <i class="fa-solid fa-arrow-up-right-from-square"></i> Demo
          </a>
        ` : ''}
        <button class="arch-btn ask-copilot" data-ask-project="${proj.title}">
          <i class="fa-solid fa-microchip"></i> Ask Co-Pilot
        </button>
      </div>
    </article>
  `).join('');

  // Attach Step Inspector triggers
  container.querySelectorAll('.interactive-step').forEach(stepEl => {
    stepEl.addEventListener('click', (e) => {
      cyberAudio.play('ping');
      const projId = e.currentTarget.getAttribute('data-project-id');
      const stepIdx = parseInt(e.currentTarget.getAttribute('data-step-index'), 10) || 0;
      openArchInspector(projId, stepIdx);
    });
  });

  // Attach Deep Dive Inspector triggers
  container.querySelectorAll('[data-inspect-project]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      cyberAudio.play('whoosh');
      const projId = e.currentTarget.getAttribute('data-inspect-project');
      openArchInspector(projId, 0);
    });
  });

  // Attach Interactive Sandbox triggers
  container.querySelectorAll('[data-sandbox-project]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      cyberAudio.play('whoosh');
      const projId = e.currentTarget.getAttribute('data-sandbox-project');
      openProjectSandbox(projId);
    });
  });

  // Attach Ask Co-Pilot triggers
  container.querySelectorAll('[data-ask-project]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      cyberAudio.play('ping');
      const projTitle = e.currentTarget.getAttribute('data-ask-project');
      handleDirectProjectQuery(projTitle);
    });
  });

  initTextScramble();
  initSkillCircuitSync();
}

function initProjectFilters() {
  const buttons = document.querySelectorAll('.project-filters .filter-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      renderArchitectureProjects(filter);
    });
  });
}

function handleDirectProjectQuery(projectName) {
  const section = document.getElementById('ai-copilot-section');
  if (section) section.scrollIntoView({ behavior: 'smooth' });

  const input = document.getElementById('ai-user-input');
  if (input) {
    input.value = `Explain the architecture of ${projectName}`;
    const form = document.getElementById('ai-chat-form');
    if (form) {
      setTimeout(() => form.dispatchEvent(new Event('submit', { cancelable: true })), 350);
    }
  }
}

/* ==========================================================================
   7. RENDER ARSENAL MATRIX
   ========================================================================== */
function renderArsenalMatrix() {
  const container = document.getElementById('arsenal-container');
  if (!container) return;

  container.innerHTML = `
    <!-- Languages -->
    <div class="arsenal-card">
      <span class="hud-corner top-left"></span>
      <span class="hud-corner top-right"></span>
      <span class="hud-corner bottom-left"></span>
      <span class="hud-corner bottom-right"></span>
      <div class="arsenal-card-header">
        <span class="arsenal-card-icon">💻</span>
        <h3 class="arsenal-card-title">Core Languages</h3>
      </div>
      <div class="arsenal-items-list">
        ${ADITYA_SKILLS.languages.map(l => `
          <div class="arsenal-item">
            <div class="arsenal-item-top">
              <span class="arsenal-name">${l.name}</span>
              <span class="arsenal-badge">${l.level}</span>
            </div>
            <p class="arsenal-desc">${l.role}</p>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- AI & Offline RAG -->
    <div class="arsenal-card">
      <span class="hud-corner top-left"></span>
      <span class="hud-corner top-right"></span>
      <span class="hud-corner bottom-left"></span>
      <span class="hud-corner bottom-right"></span>
      <div class="arsenal-card-header">
        <span class="arsenal-card-icon">🧠</span>
        <h3 class="arsenal-card-title">AI &amp; Offline RAG</h3>
      </div>
      <div class="arsenal-items-list">
        ${ADITYA_SKILLS.aiAndRAG.map(ai => `
          <div class="arsenal-item">
            <div class="arsenal-item-top">
              <span class="arsenal-name">${ai.name}</span>
            </div>
            <p class="arsenal-desc">${ai.desc}</p>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Systems & IoT Protocols -->
    <div class="arsenal-card">
      <span class="hud-corner top-left"></span>
      <span class="hud-corner top-right"></span>
      <span class="hud-corner bottom-left"></span>
      <span class="hud-corner bottom-right"></span>
      <div class="arsenal-card-header">
        <span class="arsenal-card-icon">⚡</span>
        <h3 class="arsenal-card-title">Systems &amp; IoT Protocols</h3>
      </div>
      <div class="arsenal-items-list">
        ${ADITYA_SKILLS.systemsAndIot.map(sys => `
          <div class="arsenal-item">
            <div class="arsenal-item-top">
              <span class="arsenal-name">${sys.name}</span>
            </div>
            <p class="arsenal-desc">${sys.desc}</p>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Web & Tooling -->
    <div class="arsenal-card">
      <span class="hud-corner top-left"></span>
      <span class="hud-corner top-right"></span>
      <span class="hud-corner bottom-left"></span>
      <span class="hud-corner bottom-right"></span>
      <div class="arsenal-card-header">
        <span class="arsenal-card-icon">🛠️</span>
        <h3 class="arsenal-card-title">Web &amp; Tooling</h3>
      </div>
      <div class="arsenal-items-list">
        ${ADITYA_SKILLS.webAndTools.map(tool => `
          <div class="arsenal-item">
            <div class="arsenal-item-top">
              <span class="arsenal-name">${tool.name}</span>
            </div>
            <p class="arsenal-desc">${tool.desc}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  initTextScramble();
  initSkillCircuitSync();
}

/* ==========================================================================
   8. PORTFOLIO AI CO-PILOT CHAT ENGINE
   ========================================================================== */
function initAICoPilotChat() {
  const form = document.getElementById('ai-chat-form');
  const input = document.getElementById('ai-user-input');
  const messagesContainer = document.getElementById('chat-messages-container');
  const clearBtn = document.getElementById('clear-chat-btn');
  const voiceToggle = document.getElementById('voice-synthesis-toggle');
  const voiceIcon = document.getElementById('voice-icon');
  const voiceText = document.getElementById('voice-text');
  const waveform = document.getElementById('audio-waveform-eq');

  // Handle Voice Toggle
  voiceToggle?.addEventListener('click', () => {
    const isVoiceActive = coPilot.toggleSpeech();
    if (isVoiceActive) {
      voiceToggle.classList.add('active');
      voiceIcon.className = 'fa-solid fa-volume-high';
      voiceText.textContent = 'Voice Active';
      showToast('Voice Readout Active 🔊');
    } else {
      voiceToggle.classList.remove('active');
      voiceIcon.className = 'fa-solid fa-volume-xmark';
      voiceText.textContent = 'Voice Muted';
      showToast('Voice Muted 🔇');
    }
  });

  // Handle Form Submit
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = input.value.trim();
    if (!query) return;

    input.value = '';
    await executeCoPilotQuery(query, messagesContainer, waveform);
  });

  // Handle Sidebar and Chips Query Clicks
  document.querySelectorAll('[data-query]').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const q = e.currentTarget.getAttribute('data-query');
      if (!q) return;
      await executeCoPilotQuery(q, messagesContainer, waveform);
    });
  });

  // Reset Session
  clearBtn?.addEventListener('click', () => {
    messagesContainer.innerHTML = `
      <div class="copilot-msg assistant">
        <div class="msg-avatar"><i class="fa-solid fa-robot"></i></div>
        <div class="msg-body">
          <p>Session reset! What would you like to explore in Aditya Kumar Singh's portfolio?</p>
        </div>
      </div>
    `;
    showToast('Co-Pilot session reset');
  });
}

async function executeCoPilotQuery(query, container, waveform) {
  // Append User message
  appendCoPilotMessage(container, 'user', query);

  // Typing indicator
  const typingEl = appendTypingIndicator(container);
  if (waveform) waveform.classList.add('active');

  try {
    const res = await coPilot.ask(query);
    typingEl.remove();

    if (res) {
      await appendAssistantResponse(container, res.text, res.quickActions);
      coPilot.speak(res.text);
    }
  } catch (err) {
    typingEl.remove();
    appendCoPilotMessage(container, 'assistant', "Telemetry error processing query. Please re-try.");
  } finally {
    if (waveform) {
      setTimeout(() => waveform.classList.remove('active'), 2500);
    }
  }
}

function appendCoPilotMessage(container, role, text) {
  const msgEl = document.createElement('div');
  msgEl.className = `copilot-msg ${role}`;
  const icon = role === 'user' ? 'fa-user' : 'fa-robot';

  msgEl.innerHTML = `
    <div class="msg-avatar"><i class="fa-solid ${icon}"></i></div>
    <div class="msg-body">
      <p>${escapeHtml(text)}</p>
    </div>
  `;

  container.appendChild(msgEl);
  container.scrollTop = container.scrollHeight;
  return msgEl;
}

function appendTypingIndicator(container) {
  const el = document.createElement('div');
  el.className = 'copilot-msg assistant';
  el.innerHTML = `
    <div class="msg-avatar"><i class="fa-solid fa-robot"></i></div>
    <div class="msg-body">
      <div class="typing-dots">
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
      </div>
    </div>
  `;
  container.appendChild(el);
  container.scrollTop = container.scrollHeight;
  return el;
}

async function appendAssistantResponse(container, markdownText, quickActions = []) {
  const msgEl = document.createElement('div');
  msgEl.className = 'copilot-msg assistant';

  const formattedHtml = parseMarkdownToHtml(markdownText);

  msgEl.innerHTML = `
    <div class="msg-avatar"><i class="fa-solid fa-robot"></i></div>
    <div class="msg-body">
      <div class="msg-content">${formattedHtml}</div>
      ${quickActions && quickActions.length > 0 ? `
        <div class="copilot-prompt-chips" style="padding: 0.6rem 0 0 0; border-top: 1px solid var(--border-subtle); margin-top: 0.6rem;">
          ${quickActions.map(action => `<button class="copilot-chip" data-query="${escapeHtml(action)}">${action}</button>`).join('')}
        </div>
      ` : ''}
    </div>
  `;

  container.appendChild(msgEl);
  container.scrollTop = container.scrollHeight;

  // Bind new quick action buttons inside message
  msgEl.querySelectorAll('[data-query]').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const q = e.currentTarget.getAttribute('data-query');
      if (q) {
        await executeCoPilotQuery(q, container, document.getElementById('audio-waveform-eq'));
      }
    });
  });
}

function parseMarkdownToHtml(md) {
  return md
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/^\s*-\s+(.+)$/gm, '<li>$1</li>')
    .replace(/^\s*\d+\.\s+(.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*?<\/li>\s*)+/gs, match => `<ul>${match}</ul>`)
    .replace(/\n{2,}/g, '</p><p>')
    .replace(/\n/g, '<br/>')
    .replace(/^(?!<ul|<p)(.*)$/gm, match => match ? `<p>${match}</p>` : '');
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, m => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[m]));
}

/* ==========================================================================
   9. FLOATING CO-PILOT DRAWER
   ========================================================================== */
function initFloatingCoPilot() {
  const launcher = document.getElementById('btn-toggle-float-drawer');
  const launcherWrap = document.getElementById('floating-ai-launcher');
  const launcherIcon = launcher?.querySelector('i');
  const closeBtn = document.getElementById('btn-close-float-drawer');
  const drawer = document.getElementById('floating-ai-drawer');
  const form = document.getElementById('drawer-chat-form');
  const input = document.getElementById('drawer-user-input');
  const messages = document.getElementById('drawer-chat-messages');

  function openDrawer() {
    drawer?.classList.remove('hidden');
    launcherWrap?.classList.add('active-open');
    if (launcherIcon) launcherIcon.className = 'fa-solid fa-xmark';
    setTimeout(() => {
      input?.focus();
      if (messages) messages.scrollTop = messages.scrollHeight;
    }, 150);
  }

  function closeDrawer() {
    drawer?.classList.add('hidden');
    launcherWrap?.classList.remove('active-open');
    if (launcherIcon) launcherIcon.className = 'fa-solid fa-brain';
  }

  launcher?.addEventListener('click', (e) => {
    e.stopPropagation();
    if (drawer?.classList.contains('hidden')) {
      openDrawer();
    } else {
      closeDrawer();
    }
  });

  closeBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    closeDrawer();
  });

  // Close when clicking anywhere outside drawer and launcher
  document.addEventListener('click', (e) => {
    if (drawer && !drawer.classList.contains('hidden')) {
      if (!drawer.contains(e.target) && !launcher?.contains(e.target)) {
        closeDrawer();
      }
    }
  });

  // Close on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer && !drawer.classList.contains('hidden')) {
      closeDrawer();
    }
  });

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = input.value.trim();
    if (!query) return;

    input.value = '';
    await executeCoPilotQuery(query, messages, null);
    if (messages) messages.scrollTop = messages.scrollHeight;
  });

  drawer?.querySelectorAll('[data-query]').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const q = e.currentTarget.getAttribute('data-query');
      if (q) {
        await executeCoPilotQuery(q, messages, null);
        if (messages) messages.scrollTop = messages.scrollHeight;
      }
    });
  });
}

/* ==========================================================================
   10. CYBER TELEMETRY CONSOLE (WITH HISTORY, AUTOCOMPLETE & EXPANDED CLI)
   ========================================================================== */
function initCyberTerminal() {
  const input = document.getElementById('terminal-cli-input');
  const outputBody = document.getElementById('terminal-output-body');
  const presetChips = document.querySelectorAll('.terminal-presets .preset-chip');

  if (!input || !outputBody) return;

  const commandHistory = [];
  let historyIndex = -1;

  const knownCommands = [
    'help',
    'clear',
    'cls',
    'aditya --inspect aura',
    'aditya --inspect nayaya-ai',
    'aditya --inspect wiz-bulb-sync',
    'aditya --inspect emotion-detector',
    'aditya --skills',
    'aditya --certifications',
    'aditya --stats',
    'aditya --education',
    'aditya --phone',
    'aditya --resume',
    'aditya --hire',
    'aditya --contact',
    'aditya --sandbox',
    'aditya --lab',
    'aditya --offline',
    'aditya --airgap',
    'aditya --install'
  ];

  function runCommand(cmd) {
    const raw = cmd.trim();
    const cleanCmd = raw.toLowerCase();
    if (!cleanCmd) return;

    cyberAudio.play('success');

    // Track history
    commandHistory.push(raw);
    historyIndex = commandHistory.length;

    const echoLine = document.createElement('div');
    echoLine.className = 'terminal-line';
    echoLine.innerHTML = `<span class="term-green">aditya@cli</span>:<span class="term-violet">~</span>$ ${escapeHtml(raw)}`;
    outputBody.appendChild(echoLine);

    const resLine = document.createElement('div');
    resLine.className = 'terminal-line';

    if (cleanCmd.includes('offline') || cleanCmd.includes('airgap') || cleanCmd.includes('pwa')) {
      const isOnline = navigator.onLine;
      resLine.innerHTML = `
        <span class="term-cyan">[AIR-GAPPED OFFLINE ARCHITECTURE STATUS]</span><br/>
        &bull; <strong>Link State:</strong> ${isOnline ? '<span class="term-green">ONLINE (Live Telemetry)</span>' : '<span class="term-emerald">100% AIR-GAPPED (Disconnected)</span>'}<br/>
        &bull; <strong>Service Worker:</strong> Registered &amp; Active (Cache: aditya-sys-v4.0)<br/>
        &bull; <strong>Pre-Cached Subsystems:</strong> Core UI, Knowledge Base, Local AI Co-Pilot, Speech Engine, 1-Page Resume PDF<br/>
        &bull; <strong>Air-Gap Guarantee:</strong> 100% of reasoning executes on localhost. Zero external server dependencies required.
      `;
    } else if (cleanCmd.includes('install')) {
      if (deferredPwaPrompt) {
        deferredPwaPrompt.prompt();
        resLine.innerHTML = `<span class="term-green">Launching native PWA app installation prompt...</span>`;
      } else {
        resLine.innerHTML = `<span class="term-cyan">App is already installed or running in standalone PWA mode!</span>`;
      }
    } else if (cleanCmd.includes('sandbox') || cleanCmd.includes('lab') || cleanCmd.includes('sim')) {
      openProjectSandbox('wiz');
      resLine.innerHTML = `
        <span class="term-cyan">[INTERACTIVE SIMULATION LAB ACTIVATED]</span><br/>
        &bull; <strong>Testing Environments:</strong> WiZ-Bulb Local UDP Sockets, AURA Tactical HUD, Nyaya AI Courtroom, Emotion Vision CNN<br/>
        Launching real-time simulation lab modal...
      `;
    } else if (cleanCmd.includes('aura') || cleanCmd.includes('inspect aura')) {
      resLine.innerHTML = `
        <span class="term-cyan">[SYSTEM INSPECT: AURA Autonomous Voice Assistant]</span><br/>
        &bull; <strong>Engine:</strong> Python, FastAPI, Ollama (Gemma:2b-instruct), PyAudio<br/>
        &bull; <strong>Capabilities:</strong> Bidirectional STT/TTS, wake-word ('Hey Aura'), OCR screen reading, Tactical HUD<br/>
        &bull; <strong>Telemetry:</strong> Real-time hardware monitoring &amp; 60 FPS Tactical HUD<br/>
        &bull; <strong>Repository:</strong> <a href="https://github.com/ADITYAKUMARSINGH16/AURA-AI_ASSISTANT" target="_blank" class="term-cyan">ADITYAKUMARSINGH16/AURA-AI_ASSISTANT</a>
      `;
    } else if (cleanCmd.includes('nayaya') || cleanCmd.includes('nyaya')) {
      resLine.innerHTML = `
        <span class="term-cyan">[SYSTEM INSPECT: Nyaya AI Offline]</span><br/>
        &bull; <strong>Domain:</strong> Air-Gapped Indian Legal &amp; Judicial Assistant<br/>
        &bull; <strong>Architecture:</strong> 4-Role Multi-Agent Workflow (Assistant ➔ Lawyer ➔ Opposing Counsel ➔ Judge)<br/>
        &bull; <strong>Retrieval:</strong> Pinecone Vector Embeddings (sentence-transformers/all-MiniLM-L6-v2)<br/>
        &bull; <strong>DevOps:</strong> Containerized Docker &amp; automated n8n document processing pipelines<br/>
        &bull; <strong>Repository:</strong> <a href="https://github.com/ADITYAKUMARSINGH16/nayaya-ai-offline" target="_blank" class="term-cyan">ADITYAKUMARSINGH16/nayaya-ai-offline</a>
      `;
    } else if (cleanCmd.includes('wiz-bulb') || cleanCmd.includes('wiz')) {
      resLine.innerHTML = `
        <span class="term-cyan">[SYSTEM INSPECT: Wiz-Bulb-Sync]</span><br/>
        &bull; <strong>Protocol:</strong> Local UDP Datagram Sockets (Port 38899)<br/>
        &bull; <strong>Sync Latency:</strong> &lt;50ms Ambient Illumination &amp; Screen/Music Reactivity<br/>
        &bull; <strong>Zero Cloud:</strong> 100% direct LAN communication without third-party gateways<br/>
        &bull; <strong>Repository:</strong> <a href="https://github.com/ADITYAKUMARSINGH16/Wiz-Bulb-Sync" target="_blank" class="term-cyan">ADITYAKUMARSINGH16/Wiz-Bulb-Sync</a>
      `;
    } else if (cleanCmd.includes('emotion') || cleanCmd.includes('vision') || cleanCmd.includes('opencv')) {
      resLine.innerHTML = `
        <span class="term-cyan">[SYSTEM INSPECT: Emotion Detector]</span><br/>
        &bull; <strong>Vision:</strong> OpenCV facial landmark crop + CNN Softmax classification<br/>
        &bull; <strong>FPS:</strong> ~60 FPS real-time webcam inference with visual probability meters<br/>
        &bull; <strong>Repository:</strong> <a href="https://github.com/ADITYAKUMARSINGH16/Emotion-Detector" target="_blank" class="term-cyan">ADITYAKUMARSINGH16/Emotion-Detector</a>
      `;
    } else if (cleanCmd.includes('certif') || cleanCmd.includes('internship') || cleanCmd.includes('credential')) {
      resLine.innerHTML = `
        <span class="term-yellow">[VERIFIED VIRTUAL INTERNSHIPS &amp; CERTIFICATIONS]</span><br/>
        1. 🛡️ <strong>Cybersecurity Virtual Internship</strong> &mdash; EduSkills (Palo Alto Networks) [May – July 2023]<br/>
        2. 🤖 <strong>Android Developer Virtual Internship</strong> &mdash; EduSkills (Google for Developers) [Sep – Nov 2023]<br/>
        3. 🌐 <strong>Networking Virtual Internship</strong> &mdash; EduSkills (Juniper Networks) [Jan – Mar 2024]
      `;
    } else if (cleanCmd.includes('stats') || cleanCmd.includes('metric') || cleanCmd.includes('coding')) {
      resLine.innerHTML = `
        <span class="term-green">[ENGINEERING &amp; ALGORITHMIC METRICS]</span><br/>
        &bull; <strong>University CGPA:</strong> 7.54 / 10 (Techno India University, West Bengal)<br/>
        &bull; <strong>LeetCode:</strong> <a href="https://leetcode.com/u/singhaditya7864/" target="_blank" class="term-cyan">leetcode.com/u/singhaditya7864</a> (Graphs, DP, Trees, Binary Search)<br/>
        &bull; <strong>GeeksforGeeks:</strong> <a href="https://www.geeksforgeeks.org/profile/singhaditya7864" target="_blank" class="term-cyan">geeksforgeeks.org/profile/singhaditya7864</a><br/>
        &bull; <strong>GitHub:</strong> <a href="https://github.com/ADITYAKUMARSINGH16" target="_blank" class="term-cyan">github.com/ADITYAKUMARSINGH16</a>
      `;
    } else if (cleanCmd.includes('education') || cleanCmd.includes('college') || cleanCmd.includes('school')) {
      resLine.innerHTML = `
        <span class="term-green">[ACADEMIC PROFILE]</span><br/>
        &bull; <strong>Degree:</strong> B.Tech in Computer Science and Business Systems (CSBS)<br/>
        &bull; <strong>Institution:</strong> Techno India University, West Bengal (Aug 2022 &ndash; July 2026) | CGPA: 7.54/10<br/>
        &bull; <strong>12th:</strong> A. A. M. Children’s Academy, Katihar, Bihar (65.8%)<br/>
        &bull; <strong>10th:</strong> R. K. M. Vidya Mandir, Katihar, Bihar (63.8%)
      `;
    } else if (cleanCmd.includes('phone') || cleanCmd.includes('mobile') || cleanCmd.includes('call')) {
      resLine.innerHTML = `
        📞 <strong>Direct Phone:</strong> <a href="tel:+917273963985" class="term-cyan">(+91) 7273963985</a> (Available for engineering interviews &amp; inquiries)
      `;
    } else if (cleanCmd.includes('skills')) {
      resLine.innerHTML = `
        <span class="term-yellow">[LANGUAGES]</span> Python (Primary), Java (OOP/Systems), JavaScript/TypeScript, SQL<br/>
        <span class="term-yellow">[AI/ML]</span> Generative AI, Local LLMs (Ollama/Gemma), RAG, Pinecone, Multi-Agent Systems, Semantic Search<br/>
        <span class="term-yellow">[SYSTEMS &amp; TOOLS]</span> FastAPI, Docker, n8n, UDP Sockets, WiZ Protocol, Linux, Git
      `;
    } else if (cleanCmd.includes('hire')) {
      resLine.innerHTML = `
        <span class="term-green">[WHY HIRE ADITYA KUMAR SINGH]</span><br/>
        1. <strong>Pragmatic AI Engineer:</strong> Proven ability to ship locally hosted LLMs, multi-agent reasoning, and RAG systems.<br/>
        2. <strong>Low-Level Systems Range:</strong> Skilled in raw UDP sockets, hardware datagrams, and FastAPI microservices.<br/>
        3. <strong>Academic &amp; Algorithmic Grounding:</strong> B.Tech in CSBS (7.54 CGPA) + persistent LeetCode/GFG coder.<br/>
        Contact directly: <a href="mailto:singhaditya7864@gmail.com" class="term-cyan">singhaditya7864@gmail.com</a> | <a href="tel:+917273963985" class="term-cyan">(+91) 7273963985</a>
      `;
    } else if (cleanCmd.includes('contact')) {
      resLine.innerHTML = `
        📞 <strong>Phone:</strong> (+91) 7273963985<br/>
        📧 <strong>Email:</strong> singhaditya7864@gmail.com<br/>
        🐙 <strong>GitHub:</strong> github.com/ADITYAKUMARSINGH16<br/>
        💼 <strong>LinkedIn:</strong> linkedin.com/in/aditya-kumar-singh-7a439b315<br/>
        🏠 <strong>Permanent Base:</strong> Katihar, Bihar, India
      `;
    } else if (cleanCmd.includes('resume') || cleanCmd.includes('cv')) {
      const modal = document.getElementById('resume-dossier-modal');
      modal?.classList.add('active');
      resLine.innerHTML = `
        <span class="term-cyan">[SYSTEM DOSSIER: RESUME &amp; CREDENTIALS]</span><br/>
        &bull; <strong>Candidate:</strong> Aditya Kumar Singh (B.Tech CSBS @ Techno India University, CGPA: 7.54)<br/>
        &bull; <strong>Official 1-Page PDF:</strong> <a href="assets/Aditya_Kumar_Singh_Resume.pdf" download="Aditya_Kumar_Singh_Resume.pdf" class="term-cyan">Download Official Resume PDF</a><br/>
        Opening interactive dossier preview modal...
      `;
    } else if (cleanCmd === 'clear' || cleanCmd === 'cls') {
      outputBody.innerHTML = '';
      input.value = '';
      return;
    } else if (cleanCmd === 'help') {
      resLine.innerHTML = `
        Available CLI commands:<br/>
        &bull; <span class="term-cyan">aditya --inspect aura</span> (Autonomous Voice Assistant)<br/>
        &bull; <span class="term-cyan">aditya --inspect nayaya-ai</span> (Air-Gapped Multi-Agent RAG)<br/>
        &bull; <span class="term-cyan">aditya --inspect wiz-bulb-sync</span> (Local UDP Smart Lighting)<br/>
        &bull; <span class="term-cyan">aditya --inspect emotion-detector</span> (OpenCV CNN Vision)<br/>
        &bull; <span class="term-cyan">aditya --sandbox</span> (Launch Live Interactive Simulation Lab)<br/>
        &bull; <span class="term-cyan">aditya --skills</span> (Full technical arsenal)<br/>
        &bull; <span class="term-cyan">aditya --certifications</span> (Palo Alto, Google, Juniper)<br/>
        &bull; <span class="term-cyan">aditya --stats</span> (LeetCode, GFG, GitHub, CGPA)<br/>
        &bull; <span class="term-cyan">aditya --education</span> (CSBS degree &amp; schools)<br/>
        &bull; <span class="term-cyan">aditya --phone</span> (Direct contact number)<br/>
        &bull; <span class="term-cyan">aditya --resume</span> (Open dossier &amp; download PDF)<br/>
        &bull; <span class="term-cyan">aditya --hire</span> (Recruiter brief)<br/>
        &bull; <span class="term-cyan">aditya --contact</span> (All contact channels)<br/>
        &bull; <span class="term-cyan">clear</span> (Clear screen)
      `;
    } else {
      resLine.innerHTML = `<span style="color: var(--accent-rose);">Command '${cleanCmd}' not recognized. Press [Tab] to see completions or type 'help'.</span>`;
    }

    outputBody.appendChild(resLine);
    outputBody.scrollTop = outputBody.scrollHeight;
    input.value = '';
  }

  // Keyboard navigation: Enter, ArrowUp, ArrowDown, Tab
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      runCommand(input.value);
    } else if (e.key === 'ArrowUp') {
      cyberAudio.play('keyClick');
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex > 0) {
        historyIndex--;
        input.value = commandHistory[historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      cyberAudio.play('keyClick');
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        input.value = commandHistory[historyIndex];
      } else {
        historyIndex = commandHistory.length;
        input.value = '';
      }
    } else if (e.key === 'Tab') {
      cyberAudio.play('keyClick');
      e.preventDefault();
      const currentVal = input.value.trim().toLowerCase();
      if (!currentVal) {
        input.value = 'help';
        return;
      }
      const matches = knownCommands.filter(c => c.startsWith(currentVal) || c.includes(currentVal));
      if (matches.length === 1) {
        input.value = matches[0];
      } else if (matches.length > 1) {
        const hintLine = document.createElement('div');
        hintLine.className = 'terminal-line';
        hintLine.innerHTML = `<span class="term-dim">Completions:</span> ${matches.map(m => `<span class="term-cyan">${m}</span>`).join(' &bull; ')}`;
        outputBody.appendChild(hintLine);
        outputBody.scrollTop = outputBody.scrollHeight;
        input.value = matches[0];
      }
    } else if (e.key.length === 1) {
      cyberAudio.play('keyClick');
    }
  });

  presetChips.forEach(chip => {
    chip.addEventListener('click', () => {
      cyberAudio.play('keyClick');
      const cmd = chip.getAttribute('data-cmd');
      if (cmd) runCommand(cmd);
    });
  });
}

/* ==========================================================================
   10.5. GLOBAL COMMAND PALETTE (CTRL+K)
   ========================================================================== */
function initCommandPalette() {
  const modal = document.getElementById('command-palette-modal');
  const input = document.getElementById('cmd-palette-input');
  const resultsContainer = document.getElementById('cmd-palette-results');
  const triggerBtn = document.getElementById('btn-cmd-palette');

  if (!modal || !input || !resultsContainer) return;

  let selectedIndex = 0;

  const commands = [
    // Simulation Labs (Phase 3)
    { title: "WiZ-Bulb-Sync UDP Testing Lab", desc: "Interactive LAN UDP Datagram lighting simulator (<10ms ping)", cat: "Simulation Labs", icon: "fa-flask", action: () => { closePalette(); openProjectSandbox('wiz'); } },
    { title: "AURA Tactical HUD Simulation", desc: "Simulated 60 FPS radar sweep, audio telemetry & voice engine", cat: "Simulation Labs", icon: "fa-crosshairs", action: () => { closePalette(); openProjectSandbox('aura'); } },
    { title: "Nyaya AI 4-Agent Courtroom", desc: "Multi-agent judicial consensus dispute simulation", cat: "Simulation Labs", icon: "fa-scale-balanced", action: () => { closePalette(); openProjectSandbox('nyaya'); } },
    { title: "Emotion Vision CNN Lab", desc: "Real-time webcam facial landmarking & confidence meters", cat: "Simulation Labs", icon: "fa-face-smile", action: () => { closePalette(); openProjectSandbox('emotion'); } },

    // Projects
    { title: "AURA Voice Assistant", desc: "FastAPI, Ollama, Gemma, Tactical HUD, STT/TTS", cat: "Projects", icon: "fa-microphone-lines", action: () => openArchInspector('aura-ai', 0) },
    { title: "Nyaya AI Offline", desc: "Air-Gapped Legal Assistant, Multi-Agent, Pinecone RAG", cat: "Projects", icon: "fa-scale-balanced", action: () => openArchInspector('nayaya-ai', 0) },
    { title: "Wiz-Bulb-Sync", desc: "Ambient IoT Lighting via local UDP socket packets", cat: "Projects", icon: "fa-lightbulb", action: () => openArchInspector('wiz-bulb-sync', 0) },
    { title: "Emotion Detector", desc: "Real-time OpenCV facial landmarking & CNNs", cat: "Projects", icon: "fa-eye", action: () => openArchInspector('emotion-detector', 0) },
    { title: "OmniDownloader", desc: "Multi-threaded segmented stream downloader utility", cat: "Projects", icon: "fa-download", action: () => scrollToSection('systems') },
    { title: "India Interactive Map", desc: "Vector GIS visualization of Indian states & territories", cat: "Projects", icon: "fa-map-location-dot", action: () => scrollToSection('systems') },

    // Sections
    { title: "Production Systems & Architecture", desc: "Explore deep-dive technical cards and flows", cat: "Navigation", icon: "fa-diagram-project", action: () => scrollToSection('systems') },
    { title: "Portfolio AI Co-Pilot", desc: "Interactive intelligence agent answering recruiter queries", cat: "Navigation", icon: "fa-brain", action: () => scrollToSection('ai-copilot-section') },
    { title: "Core Engineering Arsenal", desc: "Programming languages, AI/ML, and system tooling", cat: "Navigation", icon: "fa-layer-group", action: () => scrollToSection('arsenal') },
    { title: "Coding Metrics & Activity", desc: "LeetCode, GeeksforGeeks, and GitHub statistics", cat: "Navigation", icon: "fa-code-commit", action: () => scrollToSection('metrics') },
    { title: "Telemetry Shell Console", desc: "Interactive developer CLI for terminal queries", cat: "Navigation", icon: "fa-terminal", action: () => scrollToSection('terminal-section') },
    { title: "Initiate Transmission / Contact", desc: "Direct phone, email, and transmission channels", cat: "Navigation", icon: "fa-satellite-dish", action: () => scrollToSection('contact') },

    // Actions & Credentials
    { title: "Download Official Resume PDF", desc: "1-Page Engineering Resume (LaTeX, verified)", cat: "Actions", icon: "fa-file-pdf", action: () => downloadResume() },
    { title: "Preview Resume Dossier", desc: "Interactive credentials and qualifications modal", cat: "Actions", icon: "fa-id-card", action: () => openResumeModal() },
    { title: "Air-Gapped Offline Status", desc: "Inspect Service Worker caching & zero-cloud integrity", cat: "Actions", icon: "fa-shield-halved", action: () => { closePalette(); const termInput = document.getElementById('terminal-cli-input'); if (termInput) { termInput.value = 'aditya --offline'; termInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })); document.getElementById('terminal-section')?.scrollIntoView({ behavior: 'smooth' }); } } },
    { title: "Install Air-Gapped App (PWA)", desc: "Install Aditya // SYS to desktop or mobile home screen", cat: "Actions", icon: "fa-download", action: () => { closePalette(); document.getElementById('btn-install-pwa')?.click(); } },
    { title: "Verified Certifications", desc: "Palo Alto Networks, Google for Developers, Juniper Networks", cat: "Actions", icon: "fa-certificate", action: () => openResumeModal() },
    { title: "Toggle Cyber Audio Haptics (SFX)", desc: "Mute or unmute synthesized Web Audio sound effects", cat: "Actions", icon: "fa-volume-high", action: () => document.getElementById('btn-sound-toggle')?.click() },
    { title: "Call Aditya (+91 7273963985)", desc: "Direct cellular phone connection", cat: "Actions", icon: "fa-phone", action: () => window.location.href = 'tel:+917273963985' },
    { title: "Email Aditya", desc: "singhaditya7864@gmail.com", cat: "Actions", icon: "fa-envelope", action: () => window.location.href = 'mailto:singhaditya7864@gmail.com' },
    { title: "Toggle Theme (Obsidian / Light)", desc: "Switch color mode between Dark and Light", cat: "Actions", icon: "fa-circle-half-stroke", action: () => document.getElementById('btn-theme-toggle')?.click() },

    // Social / Profiles
    { title: "GitHub Profile", desc: "github.com/ADITYAKUMARSINGH16", cat: "Profiles", icon: "fa-brands fa-github", action: () => window.open('https://github.com/ADITYAKUMARSINGH16', '_blank') },
    { title: "LinkedIn Network", desc: "linkedin.com/in/aditya-kumar-singh-7a439b315", cat: "Profiles", icon: "fa-brands fa-linkedin", action: () => window.open('https://www.linkedin.com/in/aditya-kumar-singh-7a439b315/', '_blank') },
    { title: "LeetCode Profile", desc: "leetcode.com/u/singhaditya7864", cat: "Profiles", icon: "fa-code", action: () => window.open('https://leetcode.com/u/singhaditya7864/', '_blank') },
    { title: "GeeksforGeeks Profile", desc: "geeksforgeeks.org/profile/singhaditya7864", cat: "Profiles", icon: "fa-laptop-code", action: () => window.open('https://www.geeksforgeeks.org/profile/singhaditya7864', '_blank') }
  ];

  function openPalette() {
    cyberAudio.play('whoosh');
    modal.classList.add('active');
    input.value = '';
    selectedIndex = 0;
    renderResults('');
    setTimeout(() => input.focus(), 60);
  }

  function closePalette() {
    modal.classList.remove('active');
  }

  function scrollToSection(id) {
    closePalette();
    const el = document.getElementById(id);
    if (el) {
      if (lenisInstance) {
        lenisInstance.scrollTo(el, { offset: -72, duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  function downloadResume() {
    closePalette();
    cyberAudio.play('success');
    const link = document.createElement('a');
    link.href = 'assets/Aditya_Kumar_Singh_Resume.pdf';
    link.download = 'Aditya_Kumar_Singh_Resume.pdf';
    link.click();
  }

  function openResumeModal() {
    closePalette();
    cyberAudio.play('whoosh');
    const m = document.getElementById('resume-dossier-modal');
    m?.classList.add('active');
  }

  function renderResults(filterText) {
    const q = filterText.toLowerCase().trim();
    const filtered = q
      ? commands.filter(c => c.title.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q) || c.cat.toLowerCase().includes(q))
      : commands;

    if (filtered.length === 0) {
      resultsContainer.innerHTML = `
        <div style="padding: 2rem; text-align: center; color: var(--text-dim); font-size: 0.9rem;">
          <i class="fa-solid fa-search" style="font-size: 1.5rem; margin-bottom: 0.5rem; display: block; opacity: 0.5;"></i>
          No matching telemetry nodes or commands found for "${escapeHtml(filterText)}"
        </div>
      `;
      return;
    }

    if (selectedIndex >= filtered.length) selectedIndex = 0;

    const categories = [...new Set(filtered.map(c => c.cat))];
    let html = '';
    let flatIdx = 0;

    categories.forEach(cat => {
      html += `<div class="cmd-category-title">${cat}</div>`;
      const itemsInCat = filtered.filter(c => c.cat === cat);
      itemsInCat.forEach(item => {
        const isSel = flatIdx === selectedIndex;
        html += `
          <div class="cmd-item ${isSel ? 'selected' : ''}" data-cmd-idx="${flatIdx}">
            <div class="cmd-item-left">
              <span class="cmd-item-icon"><i class="fa-solid ${item.icon}"></i></span>
              <div class="cmd-item-meta">
                <div class="cmd-item-title">${item.title}</div>
                <div class="cmd-item-desc">${item.desc}</div>
              </div>
            </div>
            <span class="cmd-item-badge">${item.cat}</span>
          </div>
        `;
        flatIdx++;
      });
    });

    resultsContainer.innerHTML = html;

    resultsContainer.querySelectorAll('.cmd-item').forEach(el => {
      el.addEventListener('click', () => {
        cyberAudio.play('success');
        const idx = parseInt(el.getAttribute('data-cmd-idx'), 10);
        if (filtered[idx]) {
          closePalette();
          filtered[idx].action();
        }
      });
    });
  }

  input.addEventListener('input', () => {
    selectedIndex = 0;
    renderResults(input.value);
  });

  input.addEventListener('keydown', (e) => {
    const items = resultsContainer.querySelectorAll('.cmd-item');
    if (e.key === 'ArrowDown') {
      cyberAudio.play('keyClick');
      e.preventDefault();
      if (items.length > 0) {
        selectedIndex = (selectedIndex + 1) % items.length;
        renderResults(input.value);
        scrollSelectedIntoView();
      }
    } else if (e.key === 'ArrowUp') {
      cyberAudio.play('keyClick');
      e.preventDefault();
      if (items.length > 0) {
        selectedIndex = (selectedIndex - 1 + items.length) % items.length;
        renderResults(input.value);
        scrollSelectedIntoView();
      }
    } else if (e.key === 'Enter') {
      cyberAudio.play('success');
      e.preventDefault();
      const q = input.value.toLowerCase().trim();
      const filtered = q
        ? commands.filter(c => c.title.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q) || c.cat.toLowerCase().includes(q))
        : commands;
      if (filtered[selectedIndex]) {
        closePalette();
        filtered[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      closePalette();
    } else if (e.key.length === 1) {
      cyberAudio.play('keyClick');
    }
  });

  function scrollSelectedIntoView() {
    const sel = resultsContainer.querySelector('.cmd-item.selected');
    if (sel) sel.scrollIntoView({ block: 'nearest' });
  }

  triggerBtn?.addEventListener('click', openPalette);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closePalette();
  });

  // Global Ctrl+K / Cmd+K listener
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (modal.classList.contains('active')) {
        closePalette();
      } else {
        openPalette();
      }
    }
  });
}

/* ==========================================================================
   11. CONTACT HUB & CLIPBOARD
   ========================================================================== */
function initContactHub() {
  const form = document.getElementById('portfolio-contact-form');
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const copyTransmissionBtn = document.getElementById('btn-copy-transmission');
  const statusBox = document.getElementById('transmission-status');

  copyEmailBtn?.addEventListener('click', () => {
    navigator.clipboard.writeText('singhaditya7864@gmail.com').then(() => {
      showToast('Email singhaditya7864@gmail.com copied! 📋');
    });
  });

  function getTransmissionData() {
    return {
      name: document.getElementById('contact-name')?.value.trim() || 'Colleague / Recruiter',
      email: document.getElementById('contact-email')?.value.trim() || 'Not specified',
      subject: document.getElementById('contact-subject')?.value.trim() || 'Engineering Opportunity / Collaboration',
      message: document.getElementById('contact-message')?.value.trim() || ''
    };
  }

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const { name, email, subject, message } = getTransmissionData();

    const mailto = `mailto:singhaditya7864@gmail.com?subject=${encodeURIComponent(`[Transmission] ${subject}`)}&body=${encodeURIComponent(`From: ${name} (${email})\n\nMessage:\n${message}`)}`;
    
    // Use location.href to prevent unwanted blank popup tab
    window.location.href = mailto;

    showToast(`Launching mail client for ${name}... ✉️`);
    
    if (statusBox) {
      statusBox.style.display = 'block';
      statusBox.innerHTML = `
        <i class="fa-solid fa-paper-plane" style="color: var(--accent-cyan); margin-right: 6px;"></i>
        Mail client invoked for <strong>${escapeHtml(name)}</strong>! If your email software did not open automatically, click <strong>Copy Transmission</strong> or email directly at <a href="mailto:singhaditya7864@gmail.com" class="term-cyan">singhaditya7864@gmail.com</a>.
      `;
    }
  });

  copyTransmissionBtn?.addEventListener('click', () => {
    const { name, email, subject, message } = getTransmissionData();
    const payload = `To: singhaditya7864@gmail.com\nSubject: [Transmission] ${subject}\nFrom: ${name} (${email})\n\n${message || '(No message body provided)'}`;

    navigator.clipboard.writeText(payload).then(() => {
      showToast('Transmission payload copied! 📋');
      if (statusBox) {
        statusBox.style.display = 'block';
        statusBox.innerHTML = `
          <i class="fa-solid fa-circle-check" style="color: var(--accent-emerald); margin-right: 6px;"></i>
          Payload copied to clipboard! You can paste directly into Gmail, Outlook, or any webmail service addressed to <strong>singhaditya7864@gmail.com</strong>.
        `;
      }
    });
  });
}

/* ==========================================================================
   12. SETTINGS MODAL
   ========================================================================== */
function initSettingsModal() {
  const openBtn = document.getElementById('ai-settings-btn');
  const closeBtn = document.getElementById('btn-close-settings-modal');
  const modal = document.getElementById('ai-settings-modal');
  const providerSelect = document.getElementById('setting-provider-select');
  const apiKeyGroup = document.getElementById('setting-apikey-group');
  const apiKeyInput = document.getElementById('setting-api-key');
  const settingsForm = document.getElementById('ai-provider-settings-form');

  if (!openBtn || !modal) return;

  openBtn.addEventListener('click', () => {
    providerSelect.value = coPilot.customProvider;
    apiKeyInput.value = coPilot.customApiKey;
    apiKeyGroup.style.display = providerSelect.value === 'local' ? 'none' : 'block';
    modal.classList.add('active');
  });

  closeBtn?.addEventListener('click', () => modal.classList.remove('active'));
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('active'); });

  providerSelect?.addEventListener('change', () => {
    apiKeyGroup.style.display = providerSelect.value === 'local' ? 'none' : 'block';
  });

  settingsForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const prov = providerSelect.value;
    const key = apiKeyInput.value.trim();

    coPilot.customProvider = prov;
    coPilot.customApiKey = key;

    localStorage.setItem('portfolio_ai_provider', prov);
    localStorage.setItem('portfolio_ai_api_key', key);

    modal.classList.remove('active');
    showToast(`AI Provider set to: ${prov.toUpperCase()}`);
  });
}

/* ==========================================================================
   13. MOBILE MENU
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const menu = document.getElementById('nav-menu');
  const icon = toggleBtn?.querySelector('i');

  if (!toggleBtn || !menu) return;

  function closeMenu() {
    menu.classList.remove('mobile-open');
    if (icon) {
      icon.className = 'fa-solid fa-bars';
    }
  }

  function toggleMenu() {
    const isOpen = menu.classList.toggle('mobile-open');
    if (icon) {
      icon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
    }
  }

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  document.addEventListener('click', (e) => {
    if (menu.classList.contains('mobile-open')) {
      if (!menu.contains(e.target) && !toggleBtn.contains(e.target)) {
        closeMenu();
      }
    }
  });
}

/* ==========================================================================
   14. SCROLL SPY & DYNAMIC TELEMETRY BREADCRUMB
   ========================================================================== */
const SECTION_TELEMETRY_MAP = {
  'hero': 'SYS // OPERATIONAL',
  'systems': 'ARCH // SYSTEMS',
  'arsenal': 'TECH // ARSENAL',
  'metrics': 'CODE // TELEMETRY',
  'terminal-section': 'CLI // TERMINAL',
  'contact': 'UPLINK // CONTACT'
};

function initScrollSpy() {
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  const brandTag = document.getElementById('brand-status-tag');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });

        // Dynamic status tag update in Navbar
        if (brandTag && SECTION_TELEMETRY_MAP[id]) {
          brandTag.innerHTML = `<span class="pulse-dot-sm"></span> ${SECTION_TELEMETRY_MAP[id]}`;
        }
      }
    });
  }, {
    threshold: 0.25,
    rootMargin: "-60px 0px -40% 0px"
  });

  sections.forEach(s => observer.observe(s));
}

/* ==========================================================================
   TOAST HELPER
   ========================================================================== */
function showToast(message) {
  const toast = document.getElementById('toast-notification');
  const msgEl = document.getElementById('toast-message');
  if (!toast || !msgEl) return;

  msgEl.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3200);
}

/* ==========================================================================
   15. LENIS SMOOTH SCROLL ENGINE, PARALLAX & KINETIC REVEALS
   ========================================================================== */
function initLenisSmoothScroll() {
  const bar = document.getElementById('scroll-progress-bar');
  const indicator = document.getElementById('hero-scroll-trigger');

  if (typeof window.Lenis !== 'undefined') {
    lenisInstance = new window.Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential ease-out
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 0.95,
      smoothTouch: false,
      touchMultiplier: 1.8,
    });

    function raf(time) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Scroll hook for progress, hero indicator, and parallax layers
    lenisInstance.on('scroll', ({ scroll, limit, velocity }) => {
      // Top scroll progress bar
      if (bar && limit > 0) {
        const progress = Math.min(100, Math.max(0, (scroll / limit) * 100));
        bar.style.width = `${progress}%`;
        bar.setAttribute('aria-valuenow', Math.round(progress));
      }

      // Hero indicator fade
      if (indicator) {
        if (scroll > 85) {
          indicator.classList.add('scrolled-hidden');
        } else {
          indicator.classList.remove('scrolled-hidden');
        }
      }

      // Velocity skewing on cards (subtle kinetic response)
      updateVelocitySkew(velocity);
    });

    // Intercept internal anchor link clicks for smooth Lenis glide
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          cyberAudio.playClick();
          lenisInstance.scrollTo(target, {
            offset: -72,
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
          });

          // Close mobile menu if open
          const navMenu = document.getElementById('nav-menu');
          const mobileToggle = document.getElementById('mobile-menu-toggle');
          if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
          }
        }
      });
    });
  } else {
    // Native fallback when Lenis is not available
    initScrollProgressBarFallback();
    initHeroScrollIndicatorFallback();
  }
}

let skewTimeout = null;
function updateVelocitySkew(velocity) {
  if (Math.abs(velocity) < 1.5) return;
  const cards = document.querySelectorAll('.arch-card, .pillar-card');
  const clampedSkew = Math.max(-2.5, Math.min(2.5, velocity * 0.12));

  cards.forEach(card => {
    card.style.transform = `skewY(${clampedSkew.toFixed(2)}deg)`;
  });

  clearTimeout(skewTimeout);
  skewTimeout = setTimeout(() => {
    cards.forEach(card => {
      card.style.transform = '';
    });
  }, 140);
}

function initScrollProgressBar() {
  // Handled inside initLenisSmoothScroll when Lenis is loaded
}

function initScrollProgressBarFallback() {
  const bar = document.getElementById('scroll-progress-bar');
  if (!bar) return;

  let ticking = false;
  function updateProgress() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = `${progress}%`;
    bar.setAttribute('aria-valuenow', Math.round(progress));
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateProgress);
      ticking = true;
    }
  }, { passive: true });

  updateProgress();
}

function initHeroScrollIndicator() {
  // Handled inside initLenisSmoothScroll when Lenis is loaded
}

function initHeroScrollIndicatorFallback() {
  const indicator = document.getElementById('hero-scroll-trigger');
  if (!indicator) return;

  let ticking = false;
  function handleScroll() {
    if (window.scrollY > 85) {
      indicator.classList.add('scrolled-hidden');
    } else {
      indicator.classList.remove('scrolled-hidden');
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(handleScroll);
      ticking = true;
    }
  }, { passive: true });

  handleScroll();
}

function initScrollObserver() {
  const elements = document.querySelectorAll('.reveal-on-scroll, .arch-card, .pillar-card, .arsenal-card, .metric-card-link, .system-pillar-item, .contact-card, .telemetry-card');
  if (!elements.length) return;

  elements.forEach(el => el.classList.add('scroll-reveal'));

  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.08,
    rootMargin: '0px 0px -30px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   16. CRYPTOGRAPHIC TEXT SCRAMBLER ("DATA DECODING")
   ========================================================================== */
const SCRAMBLE_GLYPHS = '01!@#$%^&*<>[]{}~=+ABCDEF';

function scrambleElement(el) {
  if (el.dataset.scrambling === 'true') return;
  const original = el.getAttribute('data-original-text') || el.textContent.trim();
  el.setAttribute('data-original-text', original);
  el.dataset.scrambling = 'true';
  el.classList.add('scramble-active');

  let frame = 0;
  const totalFrames = Math.max(14, Math.floor(original.length * 1.8));

  cyberAudio.playTick?.();

  const interval = setInterval(() => {
    frame++;
    const progress = frame / totalFrames;
    const revealedCount = Math.floor(progress * original.length);

    el.textContent = original
      .split('')
      .map((char, idx) => {
        if (char === ' ' || char === '\n' || char === '\t') return char;
        if (idx < revealedCount) return original[idx];
        return SCRAMBLE_GLYPHS[Math.floor(Math.random() * SCRAMBLE_GLYPHS.length)];
      })
      .join('');

    if (frame >= totalFrames) {
      clearInterval(interval);
      el.textContent = original;
      el.dataset.scrambling = 'false';
      el.classList.remove('scramble-active');
    }
  }, 28);
}

function initTextScramble() {
  const targets = document.querySelectorAll('.arch-title, .pillar-title, .arsenal-card-title, .section-title, #brand-badge-code, .dock-pill-btn span');
  targets.forEach(el => {
    if (el.children.length === 0) {
      el.setAttribute('data-original-text', el.textContent.trim());
      el.removeEventListener('mouseenter', el._scrambleHandler);
      el._scrambleHandler = () => scrambleElement(el);
      el.addEventListener('mouseenter', el._scrambleHandler);
    }
  });
}

/* ==========================================================================
   17. NEURAL CIRCUIT: SKILL TO PROJECT HIGHLIGHT
   ========================================================================== */
function initSkillCircuitSync() {
  const skillItems = document.querySelectorAll('.arsenal-item, .arch-tag');
  const projectCards = document.querySelectorAll('.arch-card');

  skillItems.forEach(item => {
    item.removeEventListener('mouseenter', item._circuitEnter);
    item.removeEventListener('mouseleave', item._circuitLeave);

    item._circuitEnter = () => {
      const skillName = (item.querySelector('.arsenal-name')?.textContent || item.textContent).trim().toLowerCase();
      if (!skillName || skillName.length < 2) return;

      item.classList.add('circuit-source');

      projectCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(skillName)) {
          card.classList.add('circuit-pulse-highlight');
        }
      });
      cyberAudio.playTick?.();
    };

    item._circuitLeave = () => {
      item.classList.remove('circuit-source');
      projectCards.forEach(card => {
        card.classList.remove('circuit-pulse-highlight');
      });
    };

    item.addEventListener('mouseenter', item._circuitEnter);
    item.addEventListener('mouseleave', item._circuitLeave);
  });
}

