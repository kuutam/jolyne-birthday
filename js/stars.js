/* ══════════════════════════════════════════
   stars.js — Fondo de estrellas animadas
   ══════════════════════════════════════════ */

(function() {
  const canvas = document.getElementById('stars-canvas');
  const ctx    = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const stars = Array.from({length: 130}, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.4,
    alpha: 0.1 + Math.random() * 0.5,
    speed: 0.0003 + Math.random() * 0.001,
    phase: Math.random() * Math.PI * 2,
  }));

  const particles = Array.from({length: 18}, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: 1 + Math.random() * 2,
    vy: -(0.2 + Math.random() * 0.4),
    vx: (Math.random() - 0.5) * 0.2,
    alpha: 0.3 + Math.random() * 0.4,
  }));

  function draw(t) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
      const a = s.alpha * (0.7 + 0.3 * Math.sin(t * s.speed + s.phase));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${a})`;
      ctx.fill();
    });
    particles.forEach(p => {
      p.y += p.vy; p.x += p.vx;
      if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,201,177,${p.alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
})();
