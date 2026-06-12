/* ══════════════════════════════════════════
   gallery3d.js — Galería corazón
   ══════════════════════════════════════════ */

(function() {

// ── ITEMS: fotos + videos ─────────────

const ITEMS = [
  { type:'photo', src:'img/fav.png', emoji:'💚', label:'Mi foto favorita de Jolyne',  caption:'Podría pasar horas mirándote y aun así sentir que no fue suficiente. 🥰' },
  { type:'photo', src:'img/nosotras.png', emoji:'👩‍❤️‍👩', label:'Nosotras dos',                caption:'De todos los encuentros improbables del mundo, tú eres mi favorito.🤗' },
  { type:'video', src:'img/aventureras1.mp4', emoji:'🎬', label:'Nuestro video 1',             caption:'A tu lado descubrí que la felicidad muchas veces se parece a esto.' },
  { type:'photo', src:'img/primeravez.png', emoji:'✈️', label:'Primer viaje · Monterrey',    caption:'Por fin pude abrazar a la persona que ya sentía como hogar' },
  { type:'video', src:'img/cosplay1.mp4', emoji:'🎭', label:'Cosplay de Jolyne',           caption:'Me encanta verte brillar cuando haces lo que amas. ✨' },
  { type:'photo', src:'img/moteras.png', emoji:'🏍', label:'Las Aventadas',            caption:'Contigo aprendí que las mejores aventuras no tienen destino, solo compañía.' },
  { type:'video', src:'img/compromiso.mp4', emoji:'💍', label:'El compromiso',               caption:'1 de Abril — sí, mil veces sí 💍' },
  { type:'video', src:'img/cita.mp4', emoji:'🎬', label:'Nuestro video 2',   caption:'Ojalá pudiera guardar para siempre la forma en que me sentía ese día.' },
  { type:'photo', src:'img/jugando.png', emoji:'🎮', label:'Jugando Street Fighter',        caption:'Incluso cuando me ganas, sigo sintiéndome la más afortunada. 💚' },
  { type:'photo', src:'img/cena.jpg', emoji:'🍝', label:'Cenas romantica',         caption:'Una de muchas cenas romanticas que te quiero hacer' },
  { type:'photo', src:'img/ramenjuntas.png', emoji:'🍜', label:'Con ramen',  caption:'Algunas personas tienen recuerdos felices; yo tengo ramen, anime y a ti.🍜' },
  { type:'photo', src:'img/simplemente_ella.png', emoji:'💌', label:'Jolyne sonriendo',            caption:'Mi vista favorita del mundo' },
  { type:'photo', src:'img/llamada.png', emoji:'🌙', label:'Nosotras en llamada',         caption:'Madrugadas que no cambio' },
  { type:'video', src:'img/despedida2.mp4', emoji:'🎬', label:'Nuestro video 3',             caption:'En mis días más difíciles, tu amor siempre encontró la manera de alcanzarme.' },
  { type:'photo', src:'img/cosplay2.png', emoji:'🌸', label:'Su cosplay favorito',         caption:'No importa el personaje que interpretes, siempre termino enamorándome de ti. 🌸' },
  { type:'photo', src:'img/misbebes.png', emoji:'🎸', label:'Mis bebes',          caption:'Una de mis fotos favoritas porque están mis dos amores en el mismo lugar.🐱☺️' },
  { type:'photo', src:'img/despedida1.png', emoji:'📸', label:'Primera despedida',             caption:'Ese día entendí que despedirse duele cuando alguien ya se volvió parte de tu hogar.🥹' },
  { type:'photo', src:'img/bienvenida.jpg', emoji:'📸', label:'Bienvenida',             caption:'Nunca me habían hecho sentir tan esperada y tan querida. 🥰' },
  { type:'photo', src:'img/florcitas.png', emoji:'📸', label:'Sesion fav',             caption:'Si la primavera tuviera forma humana, creo que se parecería un poco a ti. 🌸' },
  { type:'photo', src:'img/encuentro2.png', emoji:'📸', label:'Segundo viaje',             caption:'La primera vez me enamoré de conocerte. La segunda, de volver a encontrarte.🌟' },
];

// ── Paletas placeholder ─────────────────────
const PALETTES = [
  ['#0d3a4a','#006b5f'],['#0a2a3e','#004d5c'],['#1a2040','#0d3a6e'],
  ['#200d3a','#4a006e'],['#0d3a2a','#006b3a'],['#3a1a0d','#6b3a00'],
  ['#0d2a3a','#005060'],['#2a0d3a','#60005a'],['#1a0d2a','#3a004a'],
  ['#003a2a','#006040'],['#0d1a3a','#003060'],['#2a1a0d','#503010'],
  ['#0a1a2e','#003050'],['#1a3a0d','#3a6b00'],['#3a0d1a','#6b0040'],
  ['#0d3a3a','#006b6b'],['#2a2a0d','#5a5a00'],['#0d0d3a','#00006b'],
  ['#3a2a0d','#6b5000'],['#1a3a2a','#00503a'],
];

function heartXY(t) {
  const x = 16 * Math.pow(Math.sin(t), 3);
  const y = 13*Math.cos(t) - 5*Math.cos(2*t) - 2*Math.cos(3*t) - Math.cos(4*t);
  return [x * 0.26, y * 0.26 - 0.4];
}
const POSITIONS = ITEMS.map((_, i) => {
  const t = (i / ITEMS.length) * Math.PI * 2;
  const [x, y] = heartXY(t);
  return [x, y, Math.sin(i * 1.7) * 0.5 + Math.cos(i * 2.3) * 0.5];
});

const animatedTex = [];
const vidElements = [];
let overlayTimer  = null;

const scr = document.createElement('script');
scr.src   = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
scr.onload = initScene;
document.head.appendChild(scr);

function initScene() {
  const wrap   = document.getElementById('gallery3d-wrap');
  const canvas = document.getElementById('gallery3d-canvas');
  const dpr    = Math.min(window.devicePixelRatio, 2);

  canvas.width  = wrap.clientWidth  * dpr;
  canvas.height = wrap.clientHeight * dpr;
  canvas.style.width  = wrap.clientWidth  + 'px';
  canvas.style.height = wrap.clientHeight + 'px';

  const renderer = new THREE.WebGLRenderer({ canvas, antialias:true, alpha:true });
  renderer.setPixelRatio(dpr);
  renderer.setSize(wrap.clientWidth, wrap.clientHeight);
  renderer.setClearColor(0x000000, 0);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, wrap.clientWidth / wrap.clientHeight, 0.1, 200);
  camera.position.set(0, 0, 14);

  scene.add(new THREE.AmbientLight(0xffffff, 0.9));
  const ptTop = new THREE.PointLight(0x00c9b1, 2.2, 70);
  const ptBot = new THREE.PointLight(0x7ff5e8, 0.9, 50);
  ptTop.position.set(0, 6, 10);
  ptBot.position.set(0, -6, 8);
  scene.add(ptTop); scene.add(ptBot);

  const CARD_W = 2.2, CARD_H = 1.65;
  const TEAL   = new THREE.Color(0x00c9b1);
  const group  = new THREE.Group();
  const meshes = [];
  const clock  = new THREE.Clock();

  ITEMS.forEach((item, i) => {
    const [px, py, pz] = POSITIONS[i];
    const tex = item.type === 'video' ? buildVideoTex(item, i) : buildPhotoTex(item, i);
    const geo = new THREE.PlaneGeometry(CARD_W, CARD_H);
    const mat = new THREE.MeshBasicMaterial({ map:tex, side:THREE.DoubleSide });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(px, py, pz);
    mesh.rotation.z = (Math.random()-0.5)*0.16;
    mesh.rotation.x = (Math.random()-0.5)*0.07;
    mesh.rotation.y = (Math.random()-0.5)*0.07;
    const edge = new THREE.LineSegments(
      new THREE.EdgesGeometry(geo),
      new THREE.LineBasicMaterial({ color:TEAL, transparent:true, opacity:0.5 })
    );
    mesh.add(edge);
    mesh.userData = { i, type:item.type, label:item.label, caption:item.caption, src:item.src, emoji:item.emoji, origPz:pz };
    group.add(mesh);
    meshes.push(mesh);
  });
  scene.add(group);

  
  let drag=false, px0=0, py0=0, velX=0, velY=0, autoRotate=true, autoTmr=null;
  const hint = document.getElementById('g3d-hint');
  const go   = (x,y) => { drag=true; autoRotate=false; px0=x; py0=y; velX=velY=0; wrap.style.cursor='grabbing'; clearTimeout(autoTmr); hint.style.opacity='0'; };
  const mv   = (x,y) => { if(!drag) return; const dx=x-px0,dy=y-py0; group.rotation.y+=dx*0.007; group.rotation.x=Math.max(-1.1,Math.min(1.1,group.rotation.x+dy*0.007)); velX=dx;velY=dy;px0=x;py0=y; };
  const stop = ()    => { drag=false; wrap.style.cursor='grab'; autoTmr=setTimeout(()=>{ autoRotate=true; },2800); };

  wrap.addEventListener('mousedown', e => go(e.clientX, e.clientY));
  window.addEventListener('mousemove', e => mv(e.clientX, e.clientY));
  window.addEventListener('mouseup', stop);
  wrap.addEventListener('touchstart', e => { go(e.touches[0].clientX, e.touches[0].clientY); e.preventDefault(); }, {passive:false});
  wrap.addEventListener('touchmove',  e => { mv(e.touches[0].clientX, e.touches[0].clientY); e.preventDefault(); }, {passive:false});
  wrap.addEventListener('touchend', stop);

  
  const ray = new THREE.Raycaster(), mNDC = new THREE.Vector2();
  let ckStart = {x:0,y:0};
  const pick = (cx,cy) => {
    const r = canvas.getBoundingClientRect();
    mNDC.x = ((cx-r.left)/r.width)*2-1;
    mNDC.y = -((cy-r.top)/r.height)*2+1;
    ray.setFromCamera(mNDC, camera);
    const hits = ray.intersectObjects(meshes);
    if (hits.length) openItem(hits[0].object.userData);
  };
  wrap.addEventListener('mousedown', e => { ckStart={x:e.clientX,y:e.clientY}; });
  wrap.addEventListener('click',    e => { if(Math.hypot(e.clientX-ckStart.x,e.clientY-ckStart.y)<6) pick(e.clientX,e.clientY); });
  wrap.addEventListener('touchend', e => { const t=e.changedTouches[0]; if(Math.hypot(t.clientX-ckStart.x,t.clientY-ckStart.y)<14) pick(t.clientX,t.clientY); });


  let hov = null;
  wrap.addEventListener('mousemove', e => {
    if (drag) return;
    const r = canvas.getBoundingClientRect();
    mNDC.x = ((e.clientX-r.left)/r.width)*2-1;
    mNDC.y = -((e.clientY-r.top)/r.height)*2+1;
    ray.setFromCamera(mNDC, camera);
    const hits = ray.intersectObjects(meshes);
    if (hits.length) {
      const m = hits[0].object;
      if (hov !== m) {
        if (hov) { hov.children[0].material.opacity=0.5; hov.children[0].material.color.set(TEAL); }
        hov = m; m.children[0].material.opacity=1; m.children[0].material.color.set(0x7ff5e8);
      }
      wrap.style.cursor = 'pointer';
    } else {
      if (hov) { hov.children[0].material.opacity=0.5; hov.children[0].material.color.set(TEAL); hov=null; }
      wrap.style.cursor = drag ? 'grabbing' : 'grab';
    }
  });


  window.addEventListener('resize', () => {
    const w=wrap.clientWidth, h=wrap.clientHeight, d=Math.min(window.devicePixelRatio,2);
    canvas.width=w*d; canvas.height=h*d; canvas.style.width=w+'px'; canvas.style.height=h+'px';
    camera.aspect=w/h; camera.updateProjectionMatrix(); renderer.setSize(w,h);
  });

  function animate() {
    requestAnimationFrame(animate);
    const el = clock.getElapsedTime();
    if (autoRotate) {
      group.rotation.y += 0.0028;
      group.rotation.x  = Math.sin(el * 0.22) * 0.13;
    } else if (!drag) {
      group.rotation.y += velX * 0.0025; group.rotation.x += velY * 0.0025;
      group.rotation.x = Math.max(-1.1, Math.min(1.1, group.rotation.x));
      velX *= 0.87; velY *= 0.87;
    }
    meshes.forEach((m, idx) => {
      m.position.z = m.userData.origPz + Math.sin(el * 0.45 + idx * 0.65) * 0.11;
    });
    ptTop.position.x = Math.sin(el * 0.38) * 7;
    ptTop.position.y = 6 + Math.cos(el * 0.28) * 3;
    ptBot.position.x = -Math.sin(el * 0.38) * 5;
    animatedTex.forEach(at => { at.fn(el); at.tex.needsUpdate = true; });
    renderer.render(scene, camera);
  }
  animate();
}

function drawBg(ctx, item, i) {
  const pal = PALETTES[i % PALETTES.length];
  const g = ctx.createLinearGradient(0,0,480,360);
  g.addColorStop(0,pal[0]); g.addColorStop(1,pal[1]);
  ctx.fillStyle=g; ctx.fillRect(0,0,480,360);
  ctx.strokeStyle='rgba(0,201,177,0.06)'; ctx.lineWidth=1;
  for(let x=0;x<480;x+=48){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,360);ctx.stroke();}
  for(let y=0;y<360;y+=48){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(480,y);ctx.stroke();}
  ctx.font='68px serif'; ctx.textAlign='center'; ctx.fillStyle='rgba(255,255,255,0.28)';
  ctx.fillText(item.emoji, 240, 205);
}

function drawTop(ctx, item) {
  const grad = ctx.createLinearGradient(0,255,0,360);
  grad.addColorStop(0,'transparent'); grad.addColorStop(1,'rgba(0,0,0,0.82)');
  ctx.fillStyle=grad; ctx.fillRect(0,255,480,105);
  ctx.fillStyle='rgba(255,255,255,0.95)';
  ctx.font='bold 16px sans-serif'; ctx.textAlign='center';
  ctx.fillText(item.label.substring(0,32), 240, 338);
  if (item.type==='video') {
    ctx.fillStyle='rgba(255,80,80,0.75)'; ctx.fillRect(0,0,480,5);
    ctx.fillStyle='rgba(255,100,100,0.85)'; ctx.font='bold 11px monospace'; ctx.textAlign='left';
    ctx.fillText('▶ VIDEO', 12, 22);
  } else {
    ctx.fillStyle='rgba(0,201,177,0.65)'; ctx.fillRect(0,0,480,5);
  }
}

function buildPhotoTex(item, i) {
  const tc = document.createElement('canvas'); tc.width=480; tc.height=360;
  const ctx = tc.getContext('2d');
  drawBg(ctx, item, i); drawTop(ctx, item);
  const tex = new THREE.CanvasTexture(tc);
  tex.minFilter = THREE.LinearFilter;
  if (item.src) {
    const img = new Image(); img.crossOrigin='anonymous';
    img.onload = () => { ctx.clearRect(0,0,480,360); ctx.drawImage(img,0,0,480,360); drawTop(ctx,item); tex.needsUpdate=true; };
    img.src = item.src;
  }
  return tex;
}

function buildVideoTex(item, i) {
  if (item.src) {
    const v = document.createElement('video');
    v.src=item.src; v.muted=true; v.loop=true; v.playsInline=true; v.autoplay=true; v.crossOrigin='anonymous';
    v.style.cssText='position:fixed;top:-9999px;width:1px;height:1px;pointer-events:none;';
    document.body.appendChild(v); v.play().catch(()=>{});
    vidElements.push(v);
    const tex = new THREE.VideoTexture(v); tex.minFilter=THREE.LinearFilter;
    return tex;
  }
  vidElements.push(null);
  const tc = document.createElement('canvas'); tc.width=480; tc.height=360;
  const ctx = tc.getContext('2d');
  const pal = PALETTES[i % PALETTES.length];
  const fn = t => {
    const g=ctx.createLinearGradient(0,0,480,360); g.addColorStop(0,pal[0]); g.addColorStop(1,pal[1]);
    ctx.fillStyle=g; ctx.fillRect(0,0,480,360);
    ctx.fillStyle='rgba(0,0,0,0.055)';
    for(let l=0;l<360;l+=3) ctx.fillRect(0,l,480,1.5);
    for(let b=0;b<8;b++){
      const bh=18+Math.abs(Math.sin(t*2.2+b*0.8))*28;
      ctx.fillStyle=`rgba(0,201,177,${0.18+Math.abs(Math.sin(t+b))*0.12})`;
      ctx.fillRect(28+b*54,330-bh,42,bh);
    }
    ctx.strokeStyle='rgba(255,255,255,0.55)'; ctx.lineWidth=3;
    ctx.beginPath(); ctx.arc(240,175,46,0,Math.PI*2); ctx.stroke();
    ctx.fillStyle='rgba(255,255,255,0.82)';
    ctx.beginPath(); ctx.moveTo(222,152); ctx.lineTo(222,198); ctx.lineTo(268,175); ctx.closePath(); ctx.fill();
    if(Math.sin(t*2.8)>0){ctx.fillStyle='rgba(255,60,60,0.9)';ctx.beginPath();ctx.arc(440,24,7,0,Math.PI*2);ctx.fill();}
    drawTop(ctx,item);
  };
  const tex = new THREE.CanvasTexture(tc); tex.minFilter=THREE.LinearFilter;
  animatedTex.push({tex, fn}); fn(0);
  return tex;
}

// ── Overlay ─────────────────────────────────
function openItem(ud) { ud.type==='video' ? openVideo(ud) : openPhoto(ud); }

function openPhoto(ud) {
  window.Sounds && window.Sounds.cameraClick();
  const exp=document.getElementById('photo-expanded');
  const vid=document.getElementById('overlay-video');
  vid.style.display='none'; vid.pause&&vid.pause(); vid.src='';
  document.getElementById('video-timer-wrap').style.display='none';
  document.getElementById('video-timer-label').style.display='none';
  exp.style.display='block';
  exp.innerHTML = ud.src
    ? `<img src="${ud.src}" style="width:100%;height:auto;max-height:65vh;display:block;object-fit:cover;">`
    : `<div style="width:min(500px,88vw);height:300px;background:linear-gradient(135deg,${PALETTES[ud.i%PALETTES.length].join(',')});display:flex;align-items:center;justify-content:center;flex-direction:column;gap:1rem;"><span style="font-size:5rem">${ud.emoji}</span><p style="color:rgba(0,201,177,0.7);font-size:0.82rem;letter-spacing:0.12em;text-transform:uppercase;font-family:monospace">✏️ Agrega src en ITEMS</p></div>`;
  document.getElementById('photo-caption-big').textContent = ud.caption;
  revealOverlay();
}

function openVideo(ud) {
  window.Sounds && window.Sounds.videoPlay();
  clearInterval(overlayTimer);
  const exp   = document.getElementById('photo-expanded');
  const vid   = document.getElementById('overlay-video');
  const twrap = document.getElementById('video-timer-wrap');
  const tbar  = document.getElementById('video-timer-bar');
  const tlabel= document.getElementById('video-timer-label');
  if (ud.src) {
    exp.style.display='none'; vid.style.display='block';
    vid.src=ud.src; vid.muted=false; vid.currentTime=0; vid.play().catch(()=>{});
  } else {
    vid.style.display='none'; exp.style.display='block';
    exp.innerHTML=`<div style="width:min(500px,88vw);height:300px;background:linear-gradient(135deg,#0d1f30,#002840);display:flex;align-items:center;justify-content:center;flex-direction:column;gap:1.2rem;"><span style="font-size:5rem">🎬</span><p style="color:rgba(0,201,177,0.7);font-size:0.82rem;letter-spacing:0.12em;text-transform:uppercase;font-family:monospace">✏️ Agrega src en ITEMS</p></div>`;
  }
  document.getElementById('photo-caption-big').textContent = ud.caption;
  twrap.style.display='block'; tlabel.style.display='block';
  tbar.style.transition='none'; tbar.style.width='0%';
  tbar.offsetHeight;
  tbar.style.transition='width 1s linear';
  let secs=0;
  overlayTimer = setInterval(() => {
    const rem = 30 - ++secs;
    tbar.style.width = (secs/30*100) + '%';
    tlabel.textContent = `0:${rem<10?'0':''}${rem} restantes`;
    if (secs>=30) { clearInterval(overlayTimer); vid.pause&&vid.pause(); closeOverlay(); }
  }, 1000);
  revealOverlay();
}

function revealOverlay() {
  const ov  = document.getElementById('photo-overlay');
  const exp = document.getElementById('photo-expanded');
  const vid = document.getElementById('overlay-video');
  const cap = document.getElementById('photo-caption-big');
  ov.style.opacity='1'; ov.style.pointerEvents='all';
  document.body.style.overflow='hidden';
  setTimeout(() => { exp.style.transform='scale(1)'; vid.style.transform='scale(1)'; cap.style.opacity='1'; }, 20);
}

function closeOverlay() {
  clearInterval(overlayTimer);
  const ov  = document.getElementById('photo-overlay');
  const exp = document.getElementById('photo-expanded');
  const vid = document.getElementById('overlay-video');
  const cap = document.getElementById('photo-caption-big');
  vid.pause&&vid.pause(); vid.src='';
  exp.style.transform='scale(0.88)'; vid.style.transform='scale(0.88)';
  cap.style.opacity='0'; ov.style.opacity='0'; ov.style.pointerEvents='none';
  document.body.style.overflow='';
  document.getElementById('video-timer-wrap').style.display='none';
  document.getElementById('video-timer-label').style.display='none';
}

document.getElementById('photo-close').addEventListener('click', closeOverlay);
document.getElementById('photo-overlay').addEventListener('click', e => { if(e.target===document.getElementById('photo-overlay')) closeOverlay(); });
document.addEventListener('keydown', e => { if(e.key==='Escape') closeOverlay(); });

})();
