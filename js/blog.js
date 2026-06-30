/* San City — Blog: project films + reels */
(function () {
  const YOUTUBE_SHORTS = [
    {
      id: 'Q8kikdj9cNo',
      title: 'Happy Customers sharing their experience after getting their Dream Home registered from us.',
      shortTitle: 'Customer Story — Part 1',
      tag: 'testimonials',
    },
    {
      id: 'KU0whA2rw7g',
      title: 'Happy Customers sharing their experience after getting their Dream Home registered from us.',
      shortTitle: 'Customer Story — Part 2',
      tag: 'testimonials',
    },
    {
      id: '-UXzfi6igmM',
      title: 'Happy Customers sharing their experience after getting their Dream Home registered from us.',
      shortTitle: 'Customer Story — Part 3',
      tag: 'testimonials',
    },
    {
      id: 'tKk9JeNEoFk',
      title: 'Happy Customers sharing their experience after getting their Dream Home registered from us.',
      shortTitle: 'Customer Story — Part 4',
      tag: 'testimonials',
    },
    {
      id: 'LFXvvsRvArY',
      title: 'Happy Customers sharing their experience after getting their Dream Home registered from us.',
      shortTitle: 'Customer Story — Part 5',
      tag: 'testimonials',
    },
    {
      id: 'eMSKx7-_q94',
      title: 'Happy Customers sharing their experience after getting their Dream Home registered from us.',
      shortTitle: 'Customer Story — Part 6',
      tag: 'testimonials',
    },
    {
      id: 'wCDvmVPzFvo',
      title: 'Happy Customers sharing their experience after getting their Dream Home registered from us.',
      shortTitle: 'Customer Story — Part 7',
      tag: 'testimonials',
    },
  ];

  const YT_PLAYLIST_ID = 'PL4eyLuHm8EpFL66619NkkEVuq_I3yIqIA';

  const PROJECT_VIDEOS = [
    {
      id: 'xayVmwn_A_k',
      title: 'Sancity Wonder Woods is a #bmrda approved property located close to all the utilities in the area.',
      shortTitle: 'Wonder Woods — BMRDA Approved Property',
      project: 'wonder-woods',
      label: 'Wonder Woods',
    },
    {
      id: 'LvmW8YVZE2A',
      title: 'News 1st Media Coverage of Sancity Newtown.',
      shortTitle: 'News 1st — Sancity Newtown Coverage',
      project: 'media',
      label: 'Media',
    },
    {
      id: 'rI5SQ4_0zyM',
      title: 'Sancity Wonder Woods (BMRDA Approved), spot where "Yes, THIS IS IT" is whispered in your heart.',
      shortTitle: 'Wonder Woods — "Yes, THIS IS IT"',
      project: 'wonder-woods',
      label: 'Wonder Woods',
    },
    {
      id: 'S6fomeWXSNA',
      title: 'Make Sancity Newtown your New Permanent Address. Stacked with World-Class Amenities and Offers.',
      shortTitle: 'Newtown — Your Permanent Address',
      project: 'newtown',
      label: 'Newtown',
    },
    {
      id: 'xqb9DbFPI4k',
      title: 'Sancity Newtown is an integrated township in a calm setting located in Periyapattana, Mysore.',
      shortTitle: 'Newtown — Periyapattana, Mysore',
      project: 'newtown',
      label: 'Newtown',
    },
    {
      id: 'cknXYHlNcug',
      title: "India's Leading Developer Sancity brings you Sancity Wonderwoods, #BMRDA certified plots.",
      shortTitle: 'Wonder Woods — BMRDA Certified Plots',
      project: 'wonder-woods',
      label: 'Wonder Woods',
    },
    {
      id: 'EHGe16wYg54',
      title: 'Make Sancity Newtown your New Permanent Address. Stacked with World-Class Amenities and Offers.',
      shortTitle: 'Newtown — World-Class Amenities',
      project: 'newtown',
      label: 'Newtown',
    },
  ];

  const reelsEl = document.getElementById('blogReels');

  function padNum(n) {
    return String(n).padStart(2, '0');
  }

  function buildYoutubeEmbed(id, autoplay) {
    const params = new URLSearchParams({
      rel: '0',
      modestbranding: '1',
      playsinline: '1',
      iv_load_policy: '3',
    });
    if (autoplay) params.set('autoplay', '1');
    if (window.location?.origin && window.location.origin !== 'null') {
      params.set('origin', window.location.origin);
    }
    return `https://www.youtube.com/embed/${id}?${params.toString()}`;
  }

  function ytShortEmbed(id, autoplay) {
    return buildYoutubeEmbed(id, autoplay);
  }

  function ytShortThumb(id) {
    return `https://i.ytimg.com/vi/${encodeURIComponent(id)}/hqdefault.jpg`;
  }

  function ytShortWatch(id) {
    return `https://www.youtube.com/shorts/${encodeURIComponent(id)}`;
  }

  function observeReveal(root) {
    if (!root) return;
    root.querySelectorAll('.reveal').forEach((el) => {
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
          });
        },
        { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
      );
      obs.observe(el);
    });
  }

  let activeReelPhone = null;

  function stopYtShort(phone) {
    if (!phone) return;
    const thumb = phone.querySelector('.blog-reel__thumb');
    const embedWrap = phone.querySelector('.blog-reel__embed');
    if (embedWrap) {
      embedWrap.innerHTML = '';
      embedWrap.hidden = true;
    }
    if (thumb) thumb.hidden = false;
    phone.classList.remove('is-playing');
  }

  function stopAllInlineReels() {
    if (!reelsEl) return;
    reelsEl.querySelectorAll('.blog-reel__phone').forEach((phone) => stopYtShort(phone));
    activeReelPhone = null;
  }

  function playYtShort(index, phoneEl) {
    const short = YOUTUBE_SHORTS[index];
    if (!short || !phoneEl) return;

    if (activeReelPhone === phoneEl && phoneEl.classList.contains('is-playing')) {
      stopYtShort(phoneEl);
      activeReelPhone = null;
      return;
    }

    stopAllInlineReels();

    const thumb = phoneEl.querySelector('.blog-reel__thumb');
    const embedWrap = phoneEl.querySelector('.blog-reel__embed');
    if (!embedWrap) return;

    phoneEl.classList.add('is-playing');
    activeReelPhone = phoneEl;
    if (thumb) thumb.hidden = true;
    embedWrap.hidden = false;
    embedWrap.innerHTML = `
      <iframe
        title="${short.title.replace(/"/g, '&quot;')}"
        src="${ytShortEmbed(short.id, true)}"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
    `;
  }

  function renderReels() {
    if (!reelsEl) return;

    reelsEl.innerHTML = YOUTUBE_SHORTS.map((short, i) => `
      <article class="blog-reel reveal" data-short-index="${i}">
        <div class="blog-reel__phone blog-reel__phone--yt">
          <img class="blog-reel__thumb" src="${ytShortThumb(short.id)}" alt="" loading="lazy" />
          <div class="blog-reel__embed" hidden></div>
          <button type="button" class="blog-reel__play" aria-label="Play ${short.shortTitle}">
            <i class="fa-solid fa-play" aria-hidden="true"></i>
          </button>
          <a class="blog-reel__yt" href="${ytShortWatch(short.id)}" target="_blank" rel="noopener noreferrer" aria-label="Open ${short.shortTitle} on YouTube" onclick="event.stopPropagation()">
            <i class="fa-brands fa-youtube" aria-hidden="true"></i>
          </a>
        </div>
        <div class="blog-reel__info">
          <span class="blog-reel__tag">${short.tag}</span>
          <h3>${short.shortTitle}</h3>
        </div>
      </article>
    `).join('');

    reelsEl.onclick = (e) => {
      if (e.target.closest('.blog-reel__yt')) return;
      if (e.target.closest('.blog-reel__embed') && e.target.closest('.blog-reel__phone.is-playing')) {
        return;
      }
      const reel = e.target.closest('.blog-reel');
      if (!reel) return;
      const phone = reel.querySelector('.blog-reel__phone');
      playYtShort(Number(reel.dataset.shortIndex), phone);
    };
  }

  function initProjectsSection() {
    const stripEl = document.getElementById('blogProjectsStrip');
    const filtersEl = document.getElementById('blogProjectsFilters');
    const iframeEl = document.getElementById('blogProjectsIframe');
    const frameEl = document.getElementById('blogProjectsScreen');
    const titleElProjects = document.getElementById('blogProjectsTitle');
    const tagEl = document.getElementById('blogProjectsTag');
    const indexEl = document.getElementById('blogProjectsIndex');
    const countEl = document.getElementById('blogProjectsCount');
    const ytLinkEl = document.getElementById('blogProjectsYtLink');
    const prevBtn = document.getElementById('blogProjectsPrev');
    const nextBtn = document.getElementById('blogProjectsNext');

    if (!stripEl || !iframeEl || !titleElProjects || !tagEl || !ytLinkEl) return;

    const PROJECT_FILTERS = [
      { id: 'all', label: 'All' },
      { id: 'wonder-woods', label: 'Wonder Woods' },
      { id: 'newtown', label: 'Newtown' },
      { id: 'media', label: 'Media' },
    ];

    let activeProject = 0;
    let activeFilter = 'all';

    function embedUrl(index, autoplay) {
      return buildYoutubeEmbed(PROJECT_VIDEOS[index].id, autoplay === true);
    }

    function watchUrl(index) {
      const video = PROJECT_VIDEOS[index];
      return `https://www.youtube.com/watch?v=${video.id}&list=${YT_PLAYLIST_ID}&index=${index + 1}`;
    }

    function thumbUrl(id) {
      return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
    }

    function matchesProjectFilter(index) {
      if (activeFilter === 'all') return true;
      return PROJECT_VIDEOS[index].project === activeFilter;
    }

    function visibleIndices() {
      return PROJECT_VIDEOS.map((_, i) => i).filter(matchesProjectFilter);
    }

    function applyFilterVisibility() {
      stripEl.querySelectorAll('.proj-showcase__card').forEach((card) => {
        const i = Number(card.dataset.index);
        card.classList.toggle('is-hidden', !matchesProjectFilter(i));
      });
    }

    function scrollStripToCard(card) {
      if (!card || !stripEl) return;
      const targetLeft = card.offsetLeft - (stripEl.clientWidth - card.offsetWidth) / 2;
      stripEl.scrollTo({
        left: Math.max(0, targetLeft),
        behavior: 'smooth',
      });
    }

    function selectProject(index, shouldAutoplay) {
      if (index < 0 || index >= PROJECT_VIDEOS.length) return;
      if (!matchesProjectFilter(index)) return;

      activeProject = index;
      const video = PROJECT_VIDEOS[index];
      const autoplay = shouldAutoplay === true;

      frameEl?.classList.add('is-switching');
      iframeEl.src = embedUrl(index, autoplay);
      iframeEl.title = video.title;
      window.setTimeout(() => {
        frameEl?.classList.remove('is-switching');
      }, 180);

      titleElProjects.textContent = video.title;
      tagEl.textContent = video.label;
      tagEl.dataset.project = video.project;
      if (indexEl) indexEl.textContent = padNum(index + 1);
      if (countEl) countEl.textContent = `${padNum(index + 1)} / ${padNum(PROJECT_VIDEOS.length)}`;
      ytLinkEl.href = watchUrl(index);

      stripEl.querySelectorAll('.proj-showcase__card').forEach((card) => {
        card.classList.toggle('is-active', Number(card.dataset.index) === index);
      });

      const activeCard = stripEl.querySelector('.proj-showcase__card.is-active:not(.is-hidden)');
      if (activeCard) scrollStripToCard(activeCard);
    }

    function stepProject(delta) {
      const visible = visibleIndices();
      const pos = visible.indexOf(activeProject);
      if (pos === -1) {
        if (visible.length) selectProject(visible[0], false);
        return;
      }
      const next = visible[pos + delta];
      if (next !== undefined) selectProject(next, true);
    }

    function renderFilters() {
      if (!filtersEl) return;
      filtersEl.innerHTML = PROJECT_FILTERS.map((f) => {
        const active = f.id === activeFilter ? ' is-active' : '';
        return `<button type="button" class="proj-showcase__filter${active}" data-filter="${f.id}">${f.label}</button>`;
      }).join('');

      filtersEl.onclick = (e) => {
        const btn = e.target.closest('[data-filter]');
        if (!btn) return;
        activeFilter = btn.dataset.filter;
        filtersEl.querySelectorAll('.proj-showcase__filter').forEach((b) => {
          b.classList.toggle('is-active', b.dataset.filter === activeFilter);
        });
        applyFilterVisibility();
        const visible = visibleIndices();
        if (!visible.includes(activeProject) && visible.length) {
          selectProject(visible[0], false);
        }
      };
    }

    stripEl.innerHTML = PROJECT_VIDEOS.map((video, i) => `
      <button type="button" class="proj-showcase__card${i === 0 ? ' is-active' : ''}" data-index="${i}" role="listitem">
        <span class="proj-showcase__poster">
          <img src="${thumbUrl(video.id)}" alt="" loading="lazy" />
          <span class="proj-showcase__card-num">${padNum(i + 1)}</span>
          <span class="proj-showcase__play"><i class="fa-solid fa-play" aria-hidden="true"></i></span>
        </span>
        <span class="proj-showcase__card-body">
          <strong>${video.shortTitle}</strong>
          <em>${video.label}</em>
        </span>
      </button>
    `).join('');

    stripEl.addEventListener('click', (e) => {
      const btn = e.target.closest('.proj-showcase__card');
      if (!btn || btn.classList.contains('is-hidden')) return;
      selectProject(Number(btn.dataset.index), true);
    });

    prevBtn?.addEventListener('click', () => stepProject(-1));
    nextBtn?.addEventListener('click', () => stepProject(1));

    renderFilters();
    selectProject(0, false);
  }

  initProjectsSection();
  renderReels();
  observeReveal(document.querySelector('.blog-page'));
})();
