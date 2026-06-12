/* ══════════════════════════════════════════
   envelope.js — Sobre animado + carta modal
   ══════════════════════════════════════════ */

(function () {
  const scene = document.getElementById("envelope-scene");
  const envWrap = document.getElementById("env-wrap");
  const envFlapWrap = document.getElementById("env-flap-wrap");
  const envSeal = document.getElementById("env-seal");
  const envLetter = document.getElementById("env-letter");
  const openBtn = document.getElementById("open-letter-btn");
  const modalBg = document.getElementById("letter-modal-bg");
  const modalClose = document.getElementById("modal-close");
  let opened = false;

  // ── Explosión de partículas de sello ────────────────────
  function burstSeal() {
    const rect = envSeal.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const colors = [
      "#00C9B1",
      "#7FF5E8",
      "#fff",
      "#00877A",
      "#F0C060",
      "#00e5cc",
    ];
    for (let i = 0; i < 28; i++) {
      const p = document.createElement("div");
      p.className = "seal-particle";
      const angle = (i / 28) * 360;
      const dist = 60 + Math.random() * 80;
      const size = 4 + Math.random() * 6 + "px";
      p.style.cssText = `
        left:${cx}px; top:${cy}px;
        width:${size}; height:${size};
        background:${colors[Math.floor(Math.random() * colors.length)]};
        --tx:${Math.cos((angle * Math.PI) / 180) * dist}px;
        --ty:${Math.sin((angle * Math.PI) / 180) * dist}px;
        animation-duration:${0.8 + Math.random() * 0.6}s;
        border-radius:${Math.random() > 0.5 ? "50%" : "3px"};
      `;
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 1600);
    }
  }

    // ── Música de fondo para la carta ──────────────────────────────────────────
    let _letterAudio = null;

      async function startLetterMusic() {
    try {
      _letterAudio = new Audio('sounds/only.mp3');
      _letterAudio.volume = 0;

      _letterAudio.play().catch(() => {});

      // Fade in suave
      let v = 0;
      const fi = setInterval(() => {
        v = Math.min(v + 0.015, 0.40);
        if (_letterAudio) _letterAudio.volume = v;
        if (v >= 0.40) clearInterval(fi);
      }, 80);

      setTimeout(() => { stopLetterMusic(); }, 120000);

    } catch(e) {}
  }

  function stopLetterMusic() {
    if (!_letterAudio) return;
    const audio = _letterAudio;
    _letterAudio = null;

    // Fade out suave
    const fo = setInterval(() => {
      if (audio.volume > 0.02) {
        audio.volume -= 0.015;
      } else {
        audio.pause();
        audio.src = '';
        clearInterval(fo);
      }
    }, 80);
  }

  // ── Secuencia de apertura completa ─────────────────
  function openEnvelope() {
    if (opened) return;
    opened = true;
    envWrap.classList.remove("idle");
    envWrap.style.cursor = "default";

    
    window.Sounds && window.Sounds.envelopeShake();
    envWrap.animate(
      [
        { transform: "rotate(-2deg)" },
        { transform: "rotate(2deg)" },
        { transform: "rotate(-1deg)" },
        { transform: "rotate(0deg)" },
      ],
      { duration: 300, easing: "ease-out" },
    );

    
    setTimeout(() => {
      window.Sounds && window.Sounds.sealBreak();
      envSeal.querySelector(".seal-circle").style.animation =
        "sealBreak 0.5s ease forwards";
      burstSeal();
    }, 300);

    
    setTimeout(() => {
      window.Sounds && window.Sounds.flapOpen();
      envFlapWrap.classList.add("open");
    }, 600);

    
    setTimeout(() => {
      window.Sounds && window.Sounds.letterRise();
      scene.classList.add("opened");
      setTimeout(() => {
        window.Sounds && window.Sounds.heartBurst();
        if (window.spawnFloatHearts) {
          const r = envWrap.getBoundingClientRect();
          spawnFloatHearts(r.left + r.width / 2, r.top + r.height / 4, [
            "💚",
            "✨",
            "💌",
            "🌊",
            "⭐",
            "💚",
            "✦",
            "🎮",
            "🍜",
            "💚",
            "🎵",
            "🌸",
            "💍",
            "🎸",
          ]);
        }
      }, 200);
    }, 900);

    
    setTimeout(() => {
      openBtn.classList.add("visible");
    }, 1700);
  }

  // ── Modal abierta ────────────────────────────────────────────────────
  function openModal() {
    window.Sounds && window.Sounds.letterOpen();
    startLetterMusic();
    modalBg.classList.add("show");
    document.body.style.overflow = "hidden";
    document.querySelectorAll(".typed-line").forEach((line, i) => {
      setTimeout(() => line.classList.add("in"), 200 + i * 180);
    });
  }

  // ── cerrar sobre ──────────────────────────────────────────────
  function closeModal() {
    window.Sounds && window.Sounds.modalClose();
    stopLetterMusic();
    modalBg.classList.remove("show");
    document.body.style.overflow = "";
    document
      .querySelectorAll(".typed-line")
      .forEach((l) => l.classList.remove("in"));

    scene.classList.add("closing");
    setTimeout(() => {
      scene.classList.remove("opened", "closing");
      opened = false;
      envWrap.classList.add("idle");
      envWrap.style.cursor = "pointer";
      openBtn.classList.remove("visible");
      const sc = envSeal.querySelector(".seal-circle");
      sc.style.animation = "";
      envSeal.style.opacity = "1";
      envSeal.style.transform = "translateX(-50%) scale(1)";
      envFlapWrap.classList.remove("open");
    }, 900);
  }

  // ── Event listeners ───────────────────────────────────
  envWrap.addEventListener("click", openEnvelope);
  envLetter.addEventListener("click", () => {
    if (opened) openModal();
  });
  openBtn.addEventListener("click", openModal);
  modalClose.addEventListener("click", closeModal);
  modalBg.addEventListener("click", (e) => {
    if (e.target === modalBg) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
})();
