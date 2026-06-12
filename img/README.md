# 📸 Carpeta de imágenes

Agrega aquí tus fotos y videos, luego edita el array `ITEMS` en `js/gallery3d.js`.

## Fotos
- Nombra tus archivos descriptivamente: `nosotras.jpg`, `monterrey.jpg`, etc.
- Formatos soportados: `.jpg`, `.jpeg`, `.png`, `.webp`
- Tamaño recomendado: 800×600 px mínimo

Ejemplo en gallery3d.js:
```js
{ type:'photo', src:'img/nosotras.jpg', emoji:'💚', label:'Nosotras dos', caption:'Mi favorita' },
```

## Videos
- Formatos soportados: `.mp4` (H.264 recomendado)
- Máximo ~30 segundos (el reproductor corta automáticamente)

Ejemplo en gallery3d.js:
```js
{ type:'video', src:'img/video1.mp4', emoji:'🎬', label:'Nuestro video', caption:'Un momento especial' },
```
