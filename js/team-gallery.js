/* Team Gallery — full page grid + lightbox with prev/next navigation */
(function () {
  const grid = document.getElementById('teamGalleryGrid');
  const lightbox = document.getElementById('teamLightbox');
  const images = window.TEAM_GALLERY_ALL || [];

  if (!grid || !lightbox || !images.length) return;

  const backdrop = document.getElementById('teamLightboxBackdrop');
  const closeBtn = document.getElementById('teamLightboxClose');
  const prevBtn = document.getElementById('teamLightboxPrev');
  const nextBtn = document.getElementById('teamLightboxNext');
  const imgEl = document.getElementById('teamLightboxImg');
  const tagEl = document.getElementById('teamLightboxTag');
  const titleEl = document.getElementById('teamLightboxTitle');
  const counterEl = document.getElementById('teamLightboxCounter');
  const imgWrap = lightbox.querySelector('.team-lightbox__img-wrap');

  let activeIndex = 0;
  let lastFocus = null;

  function padNum(n) {
    return String(n).padStart(2, '0');
  }

  function renderGrid() {
    grid.innerHTML = images.map((item, index) => `
      <article class="team-full-gallery__item">
        <button
          type="button"
          class="team-full-gallery__trigger"
          data-index="${index}"
          aria-label="View ${item.title}"
        >
          <span class="team-full-gallery__frame">
            <img src="${item.src}" alt="${item.alt}" loading="lazy" />
          </span>
          <span class="team-full-gallery__meta">
            <span class="team-full-gallery__tag">${item.tag}</span>
            <strong>${item.title}</strong>
          </span>
        </button>
      </article>
    `).join('');
  }

  function renderSlide(index) {
    const slide = images[index];
    if (!slide) return;

    imgEl.src = slide.src;
    imgEl.alt = slide.alt;
    tagEl.textContent = slide.tag;
    titleEl.textContent = slide.title;
    counterEl.textContent = `${padNum(index + 1)} / ${padNum(images.length)}`;
    prevBtn.disabled = false;
    nextBtn.disabled = false;

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
    activeIndex = (activeIndex - 1 + images.length) % images.length;
    renderSlide(activeIndex);
  }

  function goNext() {
    activeIndex = (activeIndex + 1) % images.length;
    renderSlide(activeIndex);
  }

  renderGrid();

  grid.addEventListener('click', (e) => {
    const trigger = e.target.closest('.team-full-gallery__trigger');
    if (!trigger) return;
    openLightbox(Number(trigger.dataset.index));
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
