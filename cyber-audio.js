/**
 * CYBER AUDIO HAPTIC SYNTHESIZER
 * Zero external audio files — uses Web Audio API oscillators and noise generators.
 * Provides micro-tactile sound effects for cyberpunk interactions:
 * - 'keyClick': Mechanical keyboard click
 * - 'chime': Harmonic sci-fi dual-frequency chord
 * - 'whoosh': Filtered noise sweep on modal/palette opening
 * - 'ping': Crisp high-tech UDP network packet ACK
 * - 'success': Melodic ascending triad
 */

class CyberAudioSynthesizer {
  constructor() {
    this.ctx = null;
    this.isMuted = localStorage.getItem('aditya_portfolio_sfx') === 'muted';
    this.isInitialized = false;

    // Auto-resume on first interaction
    const initAudio = () => {
      this.init();
      window.removeEventListener('click', initAudio);
      window.removeEventListener('keydown', initAudio);
    };
    window.addEventListener('click', initAudio, { once: true });
    window.addEventListener('keydown', initAudio, { once: true });
  }

  init() {
    if (this.isInitialized) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.isInitialized = true;
      }
    } catch (e) {
      console.warn('Web Audio not supported or blocked:', e);
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    localStorage.setItem('aditya_portfolio_sfx', this.isMuted ? 'muted' : 'enabled');
    if (!this.isMuted) {
      this.play('chime');
    }
    return !this.isMuted;
  }

  play(type) {
    if (this.isMuted) return;
    if (!this.ctx) this.init();
    if (!this.ctx) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }

    try {
      const now = this.ctx.currentTime;

      switch (type) {
        case 'keyClick': {
          // Subtle mechanical click (fast resonant burst)
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(1200, now);
          osc.frequency.exponentialRampToValueAtTime(180, now + 0.035);

          gain.gain.setValueAtTime(0.04, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now);
          osc.stop(now + 0.04);
          break;
        }

        case 'chime': {
          // Sci-fi harmonic dual chime (D5 + A5)
          const freqs = [587.33, 880];
          freqs.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + idx * 0.04);

            gain.gain.setValueAtTime(0.05, now + idx * 0.04);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now + idx * 0.04);
            osc.stop(now + 0.48);
          });
          break;
        }

        case 'whoosh': {
          // Low-pass filtered swoosh for modals & palette
          const bufferSize = this.ctx.sampleRate * 0.15;
          const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
          const data = buffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
          }

          const noise = this.ctx.createBufferSource();
          noise.buffer = buffer;

          const filter = this.ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(800, now);
          filter.frequency.exponentialRampToValueAtTime(140, now + 0.14);

          const gain = this.ctx.createGain();
          gain.gain.setValueAtTime(0.06, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

          noise.connect(filter);
          filter.connect(gain);
          gain.connect(this.ctx.destination);
          noise.start(now);
          break;
        }

        case 'ping': {
          // High-tech network UDP datagram ACK (pure high ping)
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(1760, now);
          osc.frequency.exponentialRampToValueAtTime(880, now + 0.09);

          gain.gain.setValueAtTime(0.08, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now);
          osc.stop(now + 0.1);
          break;
        }

        case 'success': {
          // Ascending triad (C5 -> E5 -> G5)
          const notes = [523.25, 659.25, 783.99];
          notes.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            const startTime = now + idx * 0.06;

            osc.frequency.setValueAtTime(freq, startTime);
            gain.gain.setValueAtTime(0.05, startTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.28);

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(startTime);
            osc.stop(startTime + 0.3);
          });
          break;
        }

        default:
          break;
      }
    } catch (err) {
      // Graceful fallback if audio graph throws
    }
  }
}

export const cyberAudio = new CyberAudioSynthesizer();
