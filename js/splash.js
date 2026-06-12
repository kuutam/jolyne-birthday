/* ══════════════════════════════════════════
   splash.js — Pantalla de bienvenida
   ══════════════════════════════════════════ */

(function () {
  // ── Canvas de partículas ──────────────────
  const canvas = document.getElementById('splash-canvas');
  const ctx    = canvas.getContext('2d');

  function resizeSplash() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeSplash();
  window.addEventListener('resize', resizeSplash);

  const particles = Array.from({ length: 80 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.6,
    a: 0.1 + Math.random() * 0.5,
    sp: 0.0004 + Math.random() * 0.001,
    ph: Math.random() * Math.PI * 2,
    teal: Math.random() > 0.5,
  }));

  function drawParticles(t) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      const alpha = p.a * (0.6 + 0.4 * Math.sin(t * p.sp + p.ph));
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.teal
        ? `rgba(0,201,177,${alpha})`
        : `rgba(255,255,255,${alpha * 0.7})`;
      ctx.fill();
    });
    requestAnimationFrame(drawParticles);
  }
  requestAnimationFrame(drawParticles);

  // ── Animación de textos secuencial ───────
  const lines = document.querySelectorAll('.sp-line');
  const btn   = document.getElementById('splash-btn');

  lines.forEach((line, i) => {
    setTimeout(() => {
      line.classList.add('sp-visible');
    }, 600 + i * 900);
  });

  
  setTimeout(() => {
    btn.classList.add('sp-visible');
  }, 600 + lines.length * 900 + 200);

  // ── Click en el botón → transición ───────
  btn.addEventListener('click', () => {
    document.body.classList.remove('splash-open');
    window.Sounds && window.Sounds.heartBurst();

    // Burst de corazones
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    ['💚','✨','🎂','🌊','💌','🎉','⭐','💚'].forEach((em, i) => {
      const h = document.createElement('span');
      h.textContent = em;
      h.style.cssText = `
        position:fixed;font-size:${1.2+Math.random()}rem;
        left:${cx + (Math.random()-0.5)*340}px;
        top:${cy + (Math.random()-0.5)*200}px;
        pointer-events:none;z-index:10001;opacity:0;
        animation:splashHeart 1.2s ease-out ${i*0.07}s forwards;
      `;
      document.body.appendChild(h);
      setTimeout(() => h.remove(), 1800);
    });

    // Fade out del splash
    const splash = document.getElementById('splash');
    splash.classList.add('sp-exit');
    setTimeout(() => splash.remove(), 900);
  });
})();