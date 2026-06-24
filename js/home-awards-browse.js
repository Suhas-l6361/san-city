/* Home — Quick Browse awards carousel */
(function () {
  const AWARDS = [
    { title: 'Business Excellence in Real Estate', year: '2019' },
    { title: 'Achievers of Bengaluru', year: '2023' },
    { title: 'Bengaluru Pride Award', year: '2022-23' },
    { title: 'Economic Times Achievers', year: '2023' },
    { title: 'Bengaluru City Icon Award', year: '2018-19' },
    { title: 'Mother Teresa National Award', year: '2020' },
    { title: 'Business Excellence in Real Estate', year: '2023' },
    { title: 'Times Icon For Human Excellence', year: '2021' },
    { title: 'Most Promising Infrastructure Company', year: '2018' },
    { title: 'Emerging Plot Developer of the Year', year: '2023' },
    { title: "Bengaluru's Best Plotted Projects", year: '2022-23' },
    { title: 'Dr. A.P.J. Abdul Kalam Excellence Award', year: '2016' },
  ];

  const section = document.getElementById('homeAwardsBrowse');
  const stage = section ? section.querySelector('.home-awards-browse__stage') : null;
  const viewport = document.getElementById('homeAwardsViewport');
  const track = document.getElementById('homeAwardsTrack');

  if (!section || !stage || !viewport || !track) return;

  const MARQUEE_PX_PER_SEC = 42;
  const PREVIEW_GAP = 12;
  const PREVIEW_WIDTH = 220;
  let previewEl = null;
  let activeThumb = null;

  function awardImage(i) {
    return `images/award${i + 1}.jpg`;
  }

  function cardHtml(i, award) {
    return `
      <button type="button" class="home-awards-browse__thumb" data-index="${i}" aria-label="${award.title}">
        <img src="${awardImage(i)}" alt="" loading="lazy" width="88" height="88" />
        <span>${award.year}</span>
      </button>
    `;
  }

  function renderTrack() {
    track.innerHTML = AWARDS.map((award, i) => cardHtml(i, award)).join('') +
      AWARDS.map((award, i) => cardHtml(i, award)).join('');
  }

  function ensurePreview() {
    if (previewEl) return previewEl;

    previewEl = document.createElement('div');
    previewEl.className = 'home-awards-browse__preview';
    previewEl.id = 'homeAwardsPreview';
    previewEl.setAttribute('aria-hidden', 'true');
    previewEl.innerHTML = `
      <article class="home-awards-browse__preview-card">
        <div class="home-awards-browse__preview-media">
          <img src="" alt="" width="200" height="200" />
        </div>
        <div class="home-awards-browse__preview-meta">
          <strong></strong>
          <span></span>
        </div>
      </article>
    `;
    document.body.appendChild(previewEl);
    return previewEl;
  }

  function getPreviewPlacement(previewHeight) {
    const stageRect = stage.getBoundingClientRect();
    const vh = window.innerHeight;
    const nextSection = section.nextElementSibling;
    const nextTop = nextSection ? nextSection.getBoundingClientRect().top : stageRect.bottom + previewHeight;

    const spaceAbove = stageRect.top;
    const spaceBelow = nextTop - stageRect.bottom;
    const belowFits = spaceBelow >= previewHeight + PREVIEW_GAP;
    const aboveFits = spaceAbove >= previewHeight + PREVIEW_GAP;

    if (!belowFits && aboveFits) return 'above';
    if (!aboveFits && belowFits) return 'below';
    if (!belowFits && !aboveFits) return spaceAbove >= spaceBelow ? 'above' : 'below';

    const nearBottom = vh - stageRect.bottom < stageRect.top;
    return nearBottom ? 'above' : 'below';
  }

  function positionPreview(thumb) {
    if (!previewEl || !thumb) return;

    const thumbRect = thumb.getBoundingClientRect();
    const stageRect = stage.getBoundingClientRect();
    const previewHeight = previewEl.offsetHeight || 260;
    const placement = getPreviewPlacement(previewHeight);

    const maxLeft = window.innerWidth - PREVIEW_WIDTH - 12;
    let left = thumbRect.left + thumbRect.width / 2 - PREVIEW_WIDTH / 2;
    left = Math.max(12, Math.min(left, maxLeft));

    let top;
    if (placement === 'above') {
      top = stageRect.top - previewHeight - PREVIEW_GAP;
      top = Math.max(12, top);
    } else {
      top = stageRect.bottom + PREVIEW_GAP;
      const maxTop = window.innerHeight - previewHeight - 12;
      top = Math.min(top, maxTop);
    }

    previewEl.style.left = left + 'px';
    previewEl.style.top = top + 'px';
    previewEl.classList.remove('is-above', 'is-below');
    previewEl.classList.add(placement === 'above' ? 'is-above' : 'is-below');
  }

  function showPreview(thumb) {
    const index = Number(thumb.dataset.index);
    if (Number.isNaN(index) || !AWARDS[index]) return;

    const award = AWARDS[index];
    const preview = ensurePreview();
    const img = preview.querySelector('img');
    const title = preview.querySelector('strong');
    const year = preview.querySelector('span');

    if (activeThumb && activeThumb !== thumb) {
      activeThumb.classList.remove('is-active');
    }

    img.src = awardImage(index);
    img.alt = award.title;
    title.textContent = award.title;
    year.textContent = award.year;

    activeThumb = thumb;
    thumb.classList.add('is-active');

    preview.classList.add('is-visible');
    preview.setAttribute('aria-hidden', 'false');

    requestAnimationFrame(() => positionPreview(thumb));
  }

  function hidePreview() {
    if (!previewEl) return;
    previewEl.classList.remove('is-visible', 'is-above', 'is-below');
    previewEl.setAttribute('aria-hidden', 'true');
    if (activeThumb) {
      activeThumb.classList.remove('is-active');
      activeThumb = null;
    }
  }

  function updatePreviewPlacement() {
    if (activeThumb && previewEl && previewEl.classList.contains('is-visible')) {
      positionPreview(activeThumb);
    }
  }

  function setMarqueeSpeed() {
    const loopWidth = track.scrollWidth / 2;
    if (!loopWidth) return;
    track.style.setProperty('--marquee-duration', `${Math.max(28, loopWidth / MARQUEE_PX_PER_SEC)}s`);
  }

  function pauseMarquee() {
    track.classList.add('is-paused');
  }

  function resumeMarquee() {
    track.classList.remove('is-paused');
  }

  viewport.addEventListener('mouseenter', pauseMarquee);
  viewport.addEventListener('mouseleave', () => {
    resumeMarquee();
    hidePreview();
  });
  viewport.addEventListener('focusin', pauseMarquee);
  viewport.addEventListener('focusout', (e) => {
    if (!viewport.contains(e.relatedTarget)) resumeMarquee();
  });

  track.addEventListener('mouseover', (e) => {
    const thumb = e.target.closest('.home-awards-browse__thumb');
    if (!thumb || !track.contains(thumb)) return;
    showPreview(thumb);
  });

  window.addEventListener('scroll', updatePreviewPlacement, { passive: true });
  window.addEventListener('resize', () => {
    setMarqueeSpeed();
    updatePreviewPlacement();
  });

  renderTrack();
  setMarqueeSpeed();

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(setMarqueeSpeed);
  }

  window.addEventListener('load', setMarqueeSpeed);
})();
