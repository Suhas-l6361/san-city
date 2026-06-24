/* San City — Awards spotlight index & lightbox */
(function () {
  const AWARDS = [
    {
      title: 'Business Excellence in Real Estate',
      presenter: 'Sonu Sood (Indian Actor)',
      org: 'The Economic Times',
      year: '2019',
      era: '2016-2019',
    },
    {
      title: 'Achievers of Bengaluru',
      presenter: 'Golden Star Ganesh (Sandalwood Actor)',
      org: 'Vijay Karnataka',
      year: '2023',
      era: '2020-2023',
    },
    {
      title: 'Bengaluru Pride Award',
      presenter: 'Kushi (Sandalwood Actress)',
      org: 'Radio City',
      year: '2022-23',
      era: '2020-2023',
    },
    {
      title: 'Economic Times Achievers',
      presenter: 'Raveena Tandon (Indian Actress)',
      org: 'The Economic Times',
      year: '2023',
      era: '2020-2023',
    },
    {
      title: 'Bengaluru City Icon Award',
      presenter: 'Ragini Dwivedi (Indian Actress)',
      org: 'Radio City',
      year: '2018-19',
      era: '2016-2019',
    },
    {
      title: 'Mother Teresa National Award',
      presenter: 'The National Press Council of India',
      org: 'National Recognition',
      year: '2020',
      era: '2020-2023',
    },
    {
      title: 'Business Excellence in Real Estate',
      presenter: 'Maneka Sanjay Gandhi (Politician)',
      org: 'The Economic Times',
      year: '2023',
      era: '2020-2023',
    },
    {
      title: 'Times Icon For Human Excellence',
      presenter: 'The Times Group',
      org: 'Times Icons',
      year: '2021',
      era: '2020-2023',
    },
    {
      title: 'Most Promising Infrastructure Company',
      presenter: 'International Achievers Conference',
      org: 'Bangkok Summit',
      year: '2018',
      era: '2016-2019',
    },
    {
      title: 'Emerging Plot Developer of the Year',
      presenter: 'ET Achievers Karnataka',
      org: 'The Economic Times',
      year: '2023',
      era: '2020-2023',
    },
    {
      title: "Bengaluru's Best Plotted Projects",
      presenter: 'The Big Bengaluru Pride Award',
      org: '92.7 BIG FM',
      year: '2022-23',
      era: '2020-2023',
    },
    {
      title: 'Dr. A.P.J. Abdul Kalam Excellence Award',
      presenter: 'Presented to B. S. Vishwa Cariappa',
      org: 'National Honour',
      year: '2016',
      era: '2016-2019',
    },
  ];

  const stageEl = document.getElementById('awardsStage');
  const indexEl = document.getElementById('awardsIndex');
  const featureEl = document.getElementById('awardsFeature');
  const stripEl = document.getElementById('awardsStrip');
  const stripWrapEl = document.getElementById('awardsStripWrap');
  const filtersEl = document.getElementById('awardsFilters');
  const emptyEl = document.getElementById('awardsEmpty');
  const lightbox = document.getElementById('awardLightbox');
  if (!stageEl || !indexEl || !featureEl || !lightbox) return;

  const backdrop = document.getElementById('awardLightboxBackdrop');
  const closeBtn = document.getElementById('awardLightboxClose');
  const prevBtn = document.getElementById('awardLightboxPrev');
  const nextBtn = document.getElementById('awardLightboxNext');
  const imgEl = document.getElementById('awardLightboxImg');
  const titleEl = document.getElementById('awardLightboxTitle');
  const descEl = document.getElementById('awardLightboxDesc');
  const counterEl = document.getElementById('awardLightboxCounter');

  let selectedIndex = 0;
  let activeEra = 'all';
  let autoplayTimer = null;
  let autoplayPaused = false;
  let featureRefs = null;

  const AUTOPLAY_MS = 2000;

  function padNum(n) {
    return String(n).padStart(2, '0');
  }

  function syncIndexHeight() {
    if (!indexEl || !featureEl) return;
    if (window.matchMedia('(max-width: 900px)').matches) {
      indexEl.style.height = '';
      indexEl.style.maxHeight = '';
      return;
    }
    const card = featureEl.querySelector('.awards-feature__card');
    if (!card) return;
    const h = Math.round(card.getBoundingClientRect().height);
    if (h > 0) {
      indexEl.style.height = `${h}px`;
      indexEl.style.maxHeight = `${h}px`;
    }
  }

  function scheduleSyncIndexHeight() {
    requestAnimationFrame(() => {
      syncIndexHeight();
      requestAnimationFrame(syncIndexHeight);
    });
  }

  let indexHeightObserver = null;

  function watchFeatureHeight() {
    const card = featureEl.querySelector('.awards-feature__card');
    if (!card || indexHeightObserver) return;
    indexHeightObserver = new ResizeObserver(scheduleSyncIndexHeight);
    indexHeightObserver.observe(card);
  }

  function awardImage(i) {
    return `../images/award${i + 1}.jpg`;
  }

  function getVisibleIndices() {
    if (activeEra === 'all') return AWARDS.map((_, i) => i);
    return AWARDS.map((a, i) => (a.era === activeEra ? i : -1)).filter((i) => i >= 0);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  function startAutoplay() {
    stopAutoplay();
    if (autoplayPaused || lightbox.classList.contains('open')) return;
    const visible = getVisibleIndices();
    if (visible.length <= 1) return;
    autoplayTimer = setInterval(advanceAutoplay, AUTOPLAY_MS);
  }

  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  function advanceAutoplay() {
    if (lightbox.classList.contains('open')) return;
    const visible = getVisibleIndices();
    if (visible.length <= 1) return;
    const pos = visible.indexOf(selectedIndex);
    const next = pos < visible.length - 1 ? visible[pos + 1] : visible[0];
    selectAward(next, { fromAutoplay: true, scrollList: false });
  }

  function renderFilters() {
    filtersEl?.closest('.awards-toolbar')?.setAttribute('hidden', '');
  }

  function buildFeatureShell() {
    if (featureRefs) return;

    featureEl.innerHTML = `
      <article class="awards-feature__card">
        <div class="awards-feature__visual" id="awardsFeatureVisual" role="button" tabindex="0">
          <span class="awards-feature__badge" id="awardsFeatureBadge"></span>
          <button type="button" class="awards-feature__expand" id="awardsFeatureExpand" aria-label="Expand award image">
            <i class="fa-solid fa-expand" aria-hidden="true"></i>
          </button>
          <img id="awardsFeatureImg" src="" alt="" width="800" height="500" />
          <div class="awards-feature__overlay">
            <h2 id="awardsFeatureTitle"></h2>
            <p id="awardsFeaturePresenter"></p>
          </div>
        </div>
        <footer class="awards-feature__foot">
          <span class="awards-feature__org" id="awardsFeatureOrg"></span>
          <div class="awards-feature__nav">
            <button type="button" id="awardsFeaturePrev" aria-label="Previous award">
              <i class="fa-solid fa-arrow-left" aria-hidden="true"></i>
              <span>Prev</span>
            </button>
            <span class="awards-feature__counter" id="awardsFeatureCounter"></span>
            <button type="button" id="awardsFeatureNext" aria-label="Next award">
              <span>Next</span>
              <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
            </button>
          </div>
        </footer>
      </article>
    `;

    featureRefs = {
      visual: document.getElementById('awardsFeatureVisual'),
      badge: document.getElementById('awardsFeatureBadge'),
      img: document.getElementById('awardsFeatureImg'),
      title: document.getElementById('awardsFeatureTitle'),
      presenter: document.getElementById('awardsFeaturePresenter'),
      org: document.getElementById('awardsFeatureOrg'),
      counter: document.getElementById('awardsFeatureCounter'),
      prev: document.getElementById('awardsFeaturePrev'),
      next: document.getElementById('awardsFeatureNext'),
      expand: document.getElementById('awardsFeatureExpand'),
    };

    featureRefs.visual.addEventListener('click', () => openLightbox(selectedIndex));
    featureRefs.visual.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(selectedIndex);
      }
    });
    featureRefs.expand.addEventListener('click', (e) => {
      e.stopPropagation();
      openLightbox(selectedIndex);
    });
    featureRefs.prev.addEventListener('click', (e) => {
      e.stopPropagation();
      const visible = getVisibleIndices();
      const pos = visible.indexOf(selectedIndex);
      if (pos > 0) selectAward(visible[pos - 1], { scrollList: true });
    });
    featureRefs.next.addEventListener('click', (e) => {
      e.stopPropagation();
      const visible = getVisibleIndices();
      const pos = visible.indexOf(selectedIndex);
      if (pos < visible.length - 1) selectAward(visible[pos + 1], { scrollList: true });
    });
  }

  function updateFeature(index, visible) {
    const award = AWARDS[index];
    if (!award || !featureRefs) return;

    const pos = visible.indexOf(index);
    const { badge, img, title, presenter, org, counter, prev, next, visual } = featureRefs;

    badge.textContent = award.year;
    visual.setAttribute('aria-label', `View full size: ${award.title}`);
    title.textContent = award.title;
    presenter.textContent = award.presenter;
    org.innerHTML = `<i class="fa-solid fa-award" aria-hidden="true"></i> ${award.org}`;
    counter.textContent = `${padNum(pos + 1)} / ${padNum(visible.length)}`;
    prev.disabled = pos <= 0;
    next.disabled = pos >= visible.length - 1;

    const nextSrc = awardImage(index);
    if (img.getAttribute('src') !== nextSrc) {
      img.classList.add('is-swapping');
      img.onload = () => {
        img.classList.remove('is-swapping');
        scheduleSyncIndexHeight();
      };
      img.onerror = () => {
        img.classList.remove('is-swapping');
        scheduleSyncIndexHeight();
      };
      img.src = nextSrc;
    }
    img.alt = `${award.title} — ${award.year}`;
    scheduleSyncIndexHeight();
  }

  function renderIndexList(visible) {
    indexEl.innerHTML = visible
      .map((i) => {
        const award = AWARDS[i];
        const active = i === selectedIndex ? ' is-active' : '';
        return `
          <button type="button" class="awards-index__item${active}" data-index="${i}">
            <span class="awards-index__num">${padNum(i + 1)}</span>
            <span class="awards-index__meta">
              <span class="awards-index__year">${award.year}</span>
              <span class="awards-index__title">${award.title}</span>
            </span>
          </button>
        `;
      })
      .join('');

    indexEl.onclick = (e) => {
      const btn = e.target.closest('.awards-index__item');
      if (btn) selectAward(Number(btn.dataset.index), { scrollList: true });
    };
  }

  function renderStripList(visible) {
    if (!stripEl) return;
    stripEl.innerHTML = visible
      .map((i) => {
        const award = AWARDS[i];
        const active = i === selectedIndex ? ' is-active' : '';
        return `
          <button type="button" class="awards-strip__thumb${active}" data-index="${i}" role="listitem" aria-label="${award.title}">
            <img src="${awardImage(i)}" alt="" loading="lazy" width="88" height="88" />
            <span>${award.year}</span>
          </button>
        `;
      })
      .join('');

    stripEl.onclick = (e) => {
      const btn = e.target.closest('.awards-strip__thumb');
      if (btn) selectAward(Number(btn.dataset.index), { scrollList: false });
    };
  }

  function updateIndexActive(index, scrollList) {
    indexEl.querySelectorAll('.awards-index__item').forEach((btn) => {
      btn.classList.toggle('is-active', Number(btn.dataset.index) === index);
    });
    if (scrollList) {
      const item = indexEl.querySelector(`[data-index="${index}"]`);
      if (item) item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  function updateStripActive(index) {
    if (!stripEl) return;
    stripEl.querySelectorAll('.awards-strip__thumb').forEach((btn) => {
      btn.classList.toggle('is-active', Number(btn.dataset.index) === index);
    });
  }

  function selectAward(index, opts) {
    const fromAutoplay = opts && opts.fromAutoplay;
    const scrollList = opts && opts.scrollList !== undefined ? opts.scrollList : !fromAutoplay;

    selectedIndex = index;
    const visible = getVisibleIndices();
    updateFeature(index, visible);
    updateIndexActive(index, scrollList);
    updateStripActive(index);

    if (!fromAutoplay) resetAutoplay();
  }

  function rebuildLists() {
    const visible = getVisibleIndices();
    const hasResults = visible.length > 0;

    if (emptyEl) emptyEl.hidden = hasResults;
    stageEl.hidden = !hasResults;
    if (stripWrapEl) stripWrapEl.hidden = !hasResults;

    if (!hasResults) {
      stopAutoplay();
      return;
    }

    if (!visible.includes(selectedIndex)) {
      selectedIndex = visible[0];
    }

    buildFeatureShell();
    watchFeatureHeight();
    renderIndexList(visible);
    renderStripList(visible);
    selectAward(selectedIndex, { scrollList: false });
    scheduleSyncIndexHeight();
  }

  function renderLightbox(index) {
    const award = AWARDS[index];
    if (!award) return;

    imgEl.src = awardImage(index);
    imgEl.alt = `${award.title} — ${award.year}`;
    titleEl.textContent = award.title;
    descEl.textContent = `Receiving award from ${award.presenter}. ${award.org} — ${award.year}.`;

    const visible = getVisibleIndices();
    const pos = visible.indexOf(index);
    prevBtn.disabled = pos <= 0;
    nextBtn.disabled = pos >= visible.length - 1;
    counterEl.textContent = `${padNum(pos + 1)} / ${padNum(visible.length)}`;

    const wrap = lightbox.querySelector('.award-lightbox__img-wrap');
    if (wrap) wrap.scrollTop = 0;
  }

  function openLightbox(index) {
    stopAutoplay();
    renderLightbox(index);
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    selectAward(selectedIndex, { scrollList: false });
    startAutoplay();
  }

  function goPrev() {
    const visible = getVisibleIndices();
    const pos = visible.indexOf(selectedIndex);
    if (pos > 0) {
      const prev = visible[pos - 1];
      selectAward(prev, { scrollList: true });
      renderLightbox(prev);
    }
  }

  function goNext() {
    const visible = getVisibleIndices();
    const pos = visible.indexOf(selectedIndex);
    if (pos < visible.length - 1) {
      const next = visible[pos + 1];
      selectAward(next, { scrollList: true });
      renderLightbox(next);
    }
  }

  closeBtn.addEventListener('click', closeLightbox);
  backdrop.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', goPrev);
  nextBtn.addEventListener('click', goNext);

  document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('open')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
      return;
    }
    const visible = getVisibleIndices();
    const pos = visible.indexOf(selectedIndex);
    if (e.key === 'ArrowLeft' && pos > 0) selectAward(visible[pos - 1], { scrollList: true });
    if (e.key === 'ArrowRight' && pos < visible.length - 1) {
      selectAward(visible[pos + 1], { scrollList: true });
    }
  });

  function pauseAutoplay() {
    autoplayPaused = true;
    stopAutoplay();
  }

  function resumeAutoplay() {
    autoplayPaused = false;
    startAutoplay();
  }

  stageEl.addEventListener('mouseenter', pauseAutoplay);
  stageEl.addEventListener('mouseleave', resumeAutoplay);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopAutoplay();
    else startAutoplay();
  });

  renderFilters();
  rebuildLists();
  startAutoplay();
  window.addEventListener('resize', scheduleSyncIndexHeight);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(scheduleSyncIndexHeight);
  }
})();
