/* Our Team — hero collage crossfade rotation */
(function () {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mediaBlocks = [
    document.querySelector('.team-hero__polaroid--a .team-hero__polaroid-media'),
    document.querySelector('.team-hero__polaroid--b .team-hero__polaroid-media'),
    document.querySelector('.team-hero__polaroid--c .team-hero__polaroid-media'),
  ].filter(Boolean);

  if (!mediaBlocks.length || reduced) return;

  const base = mediaBlocks[0].querySelector('img').src.replace(/t\d+\.jpg.*$/, '');
  const images = Array.from({ length: 8 }, (_, i) => `${base}t${i + 1}.jpg`);
  const indices = [0, 3, 6];
  const INTERVAL_MS = 3200;

  images.forEach((src) => {
    const img = new Image();
    img.src = src;
  });

  function crossfade(media, nextSrc) {
    const layers = media.querySelectorAll('img');
    if (layers.length < 2) return;

    const visible = media.querySelector('img.is-visible') || layers[0];
    const hidden = visible === layers[0] ? layers[1] : layers[0];

    if (visible.src.endsWith(nextSrc.split('/').pop())) return;

    const loader = new Image();
    loader.onload = () => {
      hidden.src = nextSrc;

      const beginFade = () => {
        hidden.classList.add('is-visible');
        hidden.removeAttribute('aria-hidden');
        visible.classList.remove('is-visible');
        visible.setAttribute('aria-hidden', 'true');
      };

      if (hidden.decode) {
        hidden.decode().then(beginFade).catch(beginFade);
      } else {
        requestAnimationFrame(() => requestAnimationFrame(beginFade));
      }
    };
    loader.src = nextSrc;
  }

  function tick() {
    mediaBlocks.forEach((media, i) => {
      indices[i] = (indices[i] + 1) % images.length;
      crossfade(media, images[indices[i]]);
    });
  }

  window.setInterval(tick, INTERVAL_MS);
})();
