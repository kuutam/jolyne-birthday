/* ══════════════════════════════════════════
   music-player.js — Reproductor
   ══════════════════════════════════════════ */

(function() {
  const audio    = document.getElementById('audio-el');
  const panel    = document.getElementById('player-panel');
  const artEl    = document.getElementById('player-art');
  const nameEl   = document.getElementById('player-track-name');
  const artistEl = document.getElementById('player-artist');
  const btn      = document.getElementById('player-btn');
  const bar      = document.getElementById('player-bar');
  const barWrap  = document.getElementById('bar-wrap');
  const timeEl   = document.getElementById('player-time');
  const iconPlay  = document.getElementById('icon-play');
  const iconPause = document.getElementById('icon-pause');
  const iconLoad  = document.getElementById('icon-load');
  const errEl    = document.getElementById('player-error');
  const cache    = {};

  function showIcon(w) {
    iconPlay.style.display  = w === 'play'  ? '' : 'none';
    iconPause.style.display = w === 'pause' ? '' : 'none';
    iconLoad.style.display  = w === 'load'  ? '' : 'none';
  }
  function fmt(s) {
    const m = Math.floor(s / 60), sec = Math.floor(s % 60);
    return `${m}:${sec < 10 ? '0' : ''}${sec}`;
  }

  audio.addEventListener('timeupdate', () => {
    if (!audio.duration) return;
    bar.style.width = (audio.currentTime / audio.duration * 100) + '%';
    timeEl.textContent = fmt(audio.currentTime);
  });
  audio.addEventListener('ended', () => { showIcon('play'); bar.style.width = '0%'; timeEl.textContent = '0:00'; });
  audio.addEventListener('playing', () => showIcon('pause'));
  audio.addEventListener('pause',   () => showIcon('play'));

  btn.addEventListener('click', () => { audio.paused ? audio.play() : audio.pause(); });

  barWrap.addEventListener('click', e => {
    if (!audio.duration) return;
    const r = barWrap.getBoundingClientRect();
    audio.currentTime = ((e.clientX - r.left) / r.width) * audio.duration;
  });

  async function fetchPreview(query) {
    if (cache[query]) return cache[query];
    const res  = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=music&limit=1`);
    const data = await res.json();
    if (!data.results || !data.results.length) return null;
    const r = data.results[0];
    return cache[query] = { preview: r.previewUrl || null, art: r.artworkUrl100 || null, name: r.trackName, artist: r.artistName };
  }

  document.querySelectorAll('.track').forEach(track => {
    track.addEventListener('click', async () => {
      const query = track.dataset.query || '';
      if (!query || query.startsWith('[')) return;

      window.Sounds && window.Sounds.musicNote();

      document.querySelectorAll('.track').forEach(t => t.classList.remove('active'));
      track.classList.add('active');

      panel.classList.add('open');
      errEl.style.display = 'none';
      showIcon('load');
      nameEl.textContent = 'Buscando…';
      artistEl.textContent = '';
      artEl.innerHTML = '🎵';
      audio.pause(); audio.src = '';
      bar.style.width = '0%'; timeEl.textContent = '0:00';

      const displayName   = track.querySelector('.track-name').textContent;
      const displayArtist = track.querySelector('.track-artist').textContent;

      try {
        const result = await fetchPreview(query);
        if (!result || !result.preview) {
          nameEl.textContent = displayName; artistEl.textContent = displayArtist;
          if (result && result.art) artEl.innerHTML = `<img src="${result.art}" alt="portada">`;
          showIcon('play'); errEl.style.display = 'block';
          return;
        }
        nameEl.textContent   = result.name   || displayName;
        artistEl.textContent = result.artist || displayArtist;
        if (result.art) artEl.innerHTML = `<img src="${result.art}" alt="portada">`;
        audio.src = result.preview;
        audio.load();
        audio.play().catch(() => showIcon('play'));
      } catch(e) {
        nameEl.textContent = displayName; artistEl.textContent = displayArtist;
        showIcon('play'); errEl.style.display = 'block';
      }
    });
  });
})();
