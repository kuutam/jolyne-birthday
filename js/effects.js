/* ══════════════════════════════════════════
   effects.js — tarjetas personalidad
   ══════════════════════════════════════════ */

(function () {

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("visible");
      });
    },
    { threshold: 0.1 },
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

  let lastSpark = 0;
  document.addEventListener("mousemove", (e) => {
    const now = Date.now();
    if (now - lastSpark < 80) return;
    lastSpark = now;
    if (Math.random() > 0.3) return;
    const s = document.createElement("div");
    s.className = "cursor-spark";
    const size = 3 + Math.random() * 5 + "px";
    s.style.cssText = `left:${e.clientX}px;top:${e.clientY}px;width:${size};height:${size};background:${Math.random() > 0.5 ? "var(--teal)" : "var(--cyan)"};`;
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 700);
  });

  document.querySelectorAll(".p-card").forEach((card) => {
    card.addEventListener("click", (e) => {
      window.Sounds && window.Sounds.cardTap();
      const r = document.createElement("div");
      r.className = "ripple-el";
      r.style.left = e.offsetX + "px";
      r.style.top = e.offsetY + "px";
      card.appendChild(r);
      setTimeout(() => r.remove(), 700);
    });
  });

  window.spawnFloatHearts = function (cx, cy, items) {
    items.forEach((em, i) => {
      const h = document.createElement("span");
      h.className = "float-heart";
      h.textContent = em;
      const ox = (Math.random() - 0.5) * 320;
      const oy = (Math.random() - 0.5) * 180;
      h.style.cssText = `left:${cx + ox}px;top:${cy + oy}px;animation-delay:${i * 0.07}s;font-size:${0.8 + Math.random() * 1.2}rem;`;
      document.body.appendChild(h);
      setTimeout(() => h.remove(), 4500);
    });
  };
})();
