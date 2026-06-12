/* ══════════════════════════════════════════
   razones.js — 29 razones
   ══════════════════════════════════════════ */

(function() {
  const reasons = [
    "Te amo porque sin proponértelo te convertiste en una de las historias más bonitas que me ha tocado vivir.",
    "Te amo porque desde que llegaste, mis días tienen algo que esperar.",
    "Te amo porque cuando me cantas, no solo escucho una canción; escucho una parte de tu corazón hablándome.",
    "Te amo porque tu forma de amar tiene detalles que hablan incluso cuando las palabras no alcanzan.",
    "Te amo porque me confiaste tu corazón cuando no tenías ninguna obligación de hacerlo.",
    "Te amo porque admiro la pasión con la que compartes lo que sabes.",
    "Te amo porque incluso cuando corriges mis errores, lo haces desde el cariño.",
    "Te amo porque enseñar no es solo tu trabajo, es una parte hermosa de quien eres.",
    "Te amo porque eres tan independiente que podrías con todo sola, pero aun así eliges compartir tu vida conmigo.",
    "Por tu amor al ramen que podría rivalizar con el mío por ti",
    "Te amo porque nunca imaginé que ver anime podría convertirse en uno de mis momentos favoritos del mundo, hasta que empecé a verlo contigo.",
    "Te amo porque tu casa se convirtió en uno de mis lugares favoritos del mundo.",
    "Te amo porque cada vez que llega el momento de despedirme de ti, una parte de mí quisiera quedarse un poco más.",
    "Te amo porque nunca has permitido que otras personas definan quién eres.",
    "Por ser la Jolyne de mi vida, literalmente",
    "Por tus cosplays que son una obra de arte en sí mismos",
    "Por cada madrugada que nos quedamos en llamada",
    "Te amo porque cuando imagino mi futuro, inevitablemente apareces en él.",
    "Te amo porque siempre encuentras nuevas maneras de recordarme cuánto me quieres.",
    "Te amo porque me encanta la forma en que miras el mundo.",
    "Por ser Roar, Firework y Teenage Dream en una sola persona",
    "Por la forma en que dices mi nombre",
    "Te amo porque contigo cualquier camino se convierte en aventura.",
    "Te amo porque me haces creer que las cosas buenas sí llegan cuando menos las esperas.",
    "Te amo porque has visto mis cicatrices, mis inseguridades y mis equivocaciones, y aun así decidiste tomar mi mano y caminar a mi lado.",
    "Te amo porque si algún día el tiempo borrara cada rasgo físico que hoy conoces de ti misma, seguiría encontrando mil razones para volver a enamorarme de ti.",
    "Te amo porque contigo nunca siento que tengo que esconder quién soy; contigo puedo existir libremente, sentirme segura y ser amada exactamente como soy.",
    "Te amo porque en un mundo tan inmenso y lleno de lugares por conocer, encontré mi hogar en ti.",
    "La verdad es que podría pasar el resto de mi vida escribiéndolas y aun así me faltarían razones para explicar cuánto te amo.",
  ];

  let flipped = 0;
  const grid    = document.getElementById('razones-grid');
  const countEl = document.getElementById('rcount');

  reasons.forEach((r, i) => {
    const card = document.createElement('div');
    card.className = 'r-card';
    card.innerHTML = `<div class="r-front">${i + 1}</div><div class="r-back">${r}</div>`;
    card.addEventListener('click', () => {
      if (card.classList.contains('done')) return;
      window.Sounds && window.Sounds.cardFlip();
      card.classList.add('done');
      countEl.textContent = ++flipped;
      const rect = card.getBoundingClientRect();
      window.spawnFloatHearts && window.spawnFloatHearts(
        rect.left + rect.width / 2,
        rect.top  + rect.height / 2,
        ['💚','✨','💌']
      );
    });
    grid.appendChild(card);
  });
})();
