/* ══════════════════════════════════════════
   sounds.js — Motor de sonido 
   ══════════════════════════════════════════ */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this._booted = false;
  }

  _boot() {
    if (this._booted) return;
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      this._booted = true;
    } catch(e) { this.enabled = false; }
  }

  _resume() {
    this._boot();
    if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  _osc(type, freq, gain, start, dur, freqEnd) {
    if (!this.enabled) return;
    this._resume();
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const g   = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t + start);
    if (freqEnd) osc.frequency.exponentialRampToValueAtTime(freqEnd, t + start + dur * 0.8);
    g.gain.setValueAtTime(gain, t + start);
    g.gain.exponentialRampToValueAtTime(0.001, t + start + dur);
    osc.connect(g); g.connect(this.ctx.destination);
    osc.start(t + start); osc.stop(t + start + dur + 0.02);
  }

  _noise(gainVal, dur, filterFreq) {
    if (!this.enabled) return;
    this._resume();
    const sr = this.ctx.sampleRate;
    const buf = this.ctx.createBuffer(1, sr * dur, sr);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++)
      d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 2) * gainVal;
    const src = this.ctx.createBufferSource();
    if (filterFreq) {
      const f = this.ctx.createBiquadFilter();
      f.type = 'bandpass'; f.frequency.value = filterFreq; f.Q.value = 0.8;
      src.buffer = buf; src.connect(f); f.connect(this.ctx.destination);
    } else {
      src.buffer = buf; src.connect(this.ctx.destination);
    }
    src.start();
  }

  // ── SOUNDS ───────────────────────────────

  /* Navegación / click genérico */
  navClick() {
    this._osc('sine', 900, 0.06, 0, 0.07, 500);
  }

  /* Click en tarjeta personalidad */
  cardTap() {
    this._osc('sine', 660, 0.08, 0, 0.05);
    this._osc('sine', 880, 0.05, 0.04, 0.06);
  }

  /* Voltear carta de razones */
  cardFlip() {
    this._noise(0.25, 0.05, 2200);
    this._osc('triangle', 440, 0.07, 0.04, 0.12);
  }

  /* Click en track de música */
  musicNote() {
    [523, 659].forEach((f, i) =>
      this._osc('triangle', f, 0.1, i * 0.06, 0.25));
  }

  /* Sobre — vibración */
  envelopeShake() {
    this._noise(0.15, 0.08, 400);
  }

  /* Sello se rompe */
  sealBreak() {
    for (let i = 0; i < 6; i++)
      this._osc('sawtooth', 150 + Math.random() * 500, 0.06, i * 0.025, 0.1);
  }

  /* Solapa se abre (whoosh) */
  flapOpen() {
    this._osc('sine', 90, 0.18, 0, 0.5, 350);
  }

  /* Carta sube — shimmer romántico */
  letterRise() {
    [523, 659, 784, 1047].forEach((f, i) =>
      this._osc('sine', f, 0.07, 0.3 + i * 0.08, 0.3));
  }

  /* Corazones flotan  */
  heartBurst() {
    [392, 494, 587, 784].forEach((f, i) =>
      this._osc('triangle', f, 0.09, i * 0.06, 0.22));
  }

  /* Modal carta se abre */
  letterOpen() {
    [261, 329, 392, 523].forEach((f, i) =>
      this._osc('sine', f, 0.08, i * 0.1, 0.35));
  }

  /* Modal cierra */
  modalClose() {
    [523, 392, 261].forEach((f, i) =>
      this._osc('sine', f, 0.06, i * 0.07, 0.18));
  }

  /* Galería — foto se abre (clic de cámara) */
  cameraClick() {
    this._noise(0.35, 0.025);
    this._osc('sine', 200, 0.06, 0.02, 0.12, 80);
  }

  /* Galería — video se abre */
  videoPlay() {
    this._osc('square', 180, 0.06, 0,    0.08, 700);
    this._osc('sine',   700, 0.07, 0.07, 0.14);
  }
}

window.Sounds = new SoundEngine();

// Botón de toggle en nav
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('sound-toggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const on = window.Sounds.toggle();
    btn.textContent = on ? '🔊' : '🔇';
  });

  // Activar nav links con sonido
  document.querySelectorAll('nav a').forEach(a => {
    a.addEventListener('click', () => window.Sounds.navClick());
  });
});
