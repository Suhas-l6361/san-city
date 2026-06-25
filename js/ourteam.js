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

/* Our Team — gallery lightbox */
(function () {
  const gallery = document.querySelector('.team-gallery__bento');
  const lightbox = document.getElementById('teamLightbox');
  if (!gallery || !lightbox) return;

  const backdrop = document.getElementById('teamLightboxBackdrop');
  const closeBtn = document.getElementById('teamLightboxClose');
  const prevBtn = document.getElementById('teamLightboxPrev');
  const nextBtn = document.getElementById('teamLightboxNext');
  const imgEl = document.getElementById('teamLightboxImg');
  const tagEl = document.getElementById('teamLightboxTag');
  const titleEl = document.getElementById('teamLightboxTitle');
  const counterEl = document.getElementById('teamLightboxCounter');
  const imgWrap = lightbox.querySelector('.team-lightbox__img-wrap');

  const triggers = [...gallery.querySelectorAll('.team-gallery__trigger')];
  if (!triggers.length) return;

  const slides = triggers.map((trigger) => {
    const img = trigger.querySelector('img');
    const card = trigger.closest('.team-group, .team-shot');
    const meta = card?.querySelector('.team-group__meta, .team-shot__meta');
    const num = trigger.querySelector('.team-shot__num')?.textContent?.trim()
      || card?.querySelector('.team-shot__num')?.textContent?.trim()
      || '';

    return {
      src: img?.currentSrc || img?.src || '',
      alt: img?.alt || '',
      tag: meta?.querySelector('.team-shot__tag')?.textContent?.trim() || '',
      title: meta?.querySelector('h3')?.textContent?.trim() || img?.alt || '',
      num,
    };
  });

  let activeIndex = 0;
  let lastFocus = null;

  function padNum(n) {
    return String(n).padStart(2, '0');
  }

  function renderSlide(index) {
    const slide = slides[index];
    if (!slide) return;

    imgEl.src = slide.src;
    imgEl.alt = slide.alt;
    tagEl.textContent = slide.tag;
    titleEl.textContent = slide.title;
    counterEl.textContent = `${padNum(index + 1)} / ${padNum(slides.length)}`;
    prevBtn.disabled = index <= 0;
    nextBtn.disabled = index >= slides.length - 1;

    if (imgWrap) imgWrap.scrollTop = 0;
  }

  function openLightbox(index) {
    activeIndex = index;
    lastFocus = document.activeElement;
    renderSlide(activeIndex);
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocus && typeof lastFocus.focus === 'function') {
      lastFocus.focus();
    }
  }

  function goPrev() {
    if (activeIndex > 0) {
      activeIndex -= 1;
      renderSlide(activeIndex);
    }
  }

  function goNext() {
    if (activeIndex < slides.length - 1) {
      activeIndex += 1;
      renderSlide(activeIndex);
    }
  }

  triggers.forEach((trigger, index) => {
    trigger.addEventListener('click', () => openLightbox(index));
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(index);
      }
    });
  });

  closeBtn.addEventListener('click', closeLightbox);
  backdrop.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', goPrev);
  nextBtn.addEventListener('click', goNext);

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') goPrev();
    if (e.key === 'ArrowRight') goNext();
  });
})();
