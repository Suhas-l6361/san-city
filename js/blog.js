/* San City — Blog / video studio */
(function () {
  const FALLBACK_VIDEOS = [
    {
      file: 'A.mp4',
      title: 'San City — Brand Film',
      category: 'brand',
      desc: "Discover San City's vision, townships, and legacy across Karnataka.",
    },
    {
      file: 'MR.mp4',
      title: 'Media & Recognition',
      category: 'media',
      desc: 'Highlights from awards, press coverage, and industry honors.',
    },
    {
      file: 't1.mp4',
      title: 'San City Stories — Part 1',
      category: 'events',
      desc: 'Moments from site visits, events, and life at San City townships.',
      orientation: 'landscape',
    },
    {
      file: 't2.mp4',
      title: 'San City Stories — Part 2',
      category: 'events',
      desc: 'More glimpses of our communities, customers, and celebrations.',
      orientation: 'landscape',
    },
    {
      file: 't3.mp4',
      title: 'San City Stories — Part 3',
      category: 'testimonials',
      desc: 'Experiences and voices from the San City family.',
      orientation: 'landscape',
    },
    {
      file: 't4.mp4',
      title: 'San City Stories — Part 4',
      category: 'testimonials',
      desc: 'Closing highlights from our townships and customer journeys.',
      orientation: 'landscape',
    },
  ];

  const CATEGORIES = [
    { id: 'all', label: 'All Stories' },
    { id: 'brand', label: 'Brand' },
    { id: 'projects', label: 'Projects' },
    { id: 'events', label: 'Events' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'media', label: 'Media' },
  ];

  const FORMATS = [
    { id: 'all', label: 'All Formats' },
    { id: 'landscape', label: 'Landscape' },
    { id: 'portrait', label: 'Portrait' },
  ];

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

  const theaterEl = document.getElementById('blogTheater');
  const playerEl = document.getElementById('blogPlayer');
  const playerSourceEl = document.getElementById('blogPlayerSource');
  const playerErrorEl = document.getElementById('blogPlayerError');
  const playerErrorPathEl = document.getElementById('blogPlayerErrorPath');
  const screenEl = document.getElementById('blogScreen');
  const titleEl = document.getElementById('blogPlayerTitle');
  const descEl = document.getElementById('blogPlayerDesc');
  const catEl = document.getElementById('blogPlayerCat');
  const playlistEl = document.getElementById('blogPlaylist');
  const reelsEl = document.getElementById('blogReels');
  const formatFiltersEl = document.getElementById('blogFormatFilters');
  const catFiltersEl = document.getElementById('blogCatFilters');
  const cinema = document.getElementById('blogCinema');
  const cinemaVideo = document.getElementById('blogCinemaVideo');
  const cinemaClose = document.getElementById('blogCinemaClose');
  const cinemaBackdrop = document.getElementById('blogCinemaBackdrop');
  const cinemaTitle = document.getElementById('blogCinemaTitle');
  const playerHitEl = document.getElementById('blogPlayerHit');
  const playerBarEl = document.getElementById('blogPlayerBar');
  const playerPlayBtn = document.getElementById('blogPlayerPlayBtn');
  const playerMuteBtn = document.getElementById('blogPlayerMuteBtn');
  const playerSeekEl = document.getElementById('blogPlayerSeek');
  const playerTimeEl = document.getElementById('blogPlayerTime');

  if (!theaterEl || !playerEl || !playlistEl) return;

  let activeFormat = 'all';
  let activeCategory = 'all';
  let currentIndex = 0;
  let meta = [];

  function padNum(n) {
    return String(n).padStart(2, '0');
  }

  function videoSrc(i) {
    return meta[i]?.src || '';
  }

  function filePath(i) {
    return meta[i] ? `Frontend/videos/${meta[i].file}` : '';
  }

  function getOrientation(i) {
    return meta[i]?.orientation || 'landscape';
  }

  function matchesFilter(i) {
    const v = meta[i];
    const fmt = getOrientation(i);
    if (activeFormat !== 'all' && fmt !== activeFormat) return false;
    if (activeCategory !== 'all' && v.category !== activeCategory) return false;
    return true;
  }

  function getFilteredIndices() {
    return meta.map((_, i) => i).filter(matchesFilter);
  }

  function getTheaterIndices(filtered = getFilteredIndices()) {
    return filtered.filter((i) => getOrientation(i) === 'landscape');
  }

  function shouldShowReels() {
    if (activeFormat === 'landscape') return false;
    if (activeCategory !== 'all' && activeCategory !== 'testimonials') return false;
    return true;
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

  function ensureTheaterIndex(filtered = getFilteredIndices()) {
    const theaterIndices = getTheaterIndices(filtered);
    if (theaterIndices.includes(currentIndex)) return currentIndex;
    return theaterIndices[0] ?? currentIndex;
  }

  function syncTheaterVisibility(filtered = getFilteredIndices()) {
    if (!theaterEl) return;
    theaterEl.hidden = getTheaterIndices(filtered).length === 0;
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

  function formatTime(sec) {
    if (!Number.isFinite(sec) || sec < 0) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${String(s).padStart(2, '0')}`;
  }

  function syncTheaterControls() {
    if (!playerPlayBtn || !playerMuteBtn) return;
    const playIcon = playerPlayBtn.querySelector('i');
    if (playIcon) {
      playIcon.className = playerEl.paused ? 'fa-solid fa-play' : 'fa-solid fa-pause';
    }
    const muteIcon = playerMuteBtn.querySelector('i');
    if (muteIcon) {
      muteIcon.className = playerEl.muted || playerEl.volume === 0
        ? 'fa-solid fa-volume-xmark'
        : 'fa-solid fa-volume-high';
    }
    playerMuteBtn.setAttribute('aria-label', playerEl.muted || playerEl.volume === 0 ? 'Unmute' : 'Mute');
    playerPlayBtn.setAttribute('aria-label', playerEl.paused ? 'Play' : 'Pause');
  }

  function syncTheaterProgress() {
    if (!playerSeekEl || !playerTimeEl) return;
    const duration = playerEl.duration;
    const current = playerEl.currentTime;
    if (Number.isFinite(duration) && duration > 0) {
      playerSeekEl.value = String((current / duration) * 100);
      playerTimeEl.textContent = `${formatTime(current)} / ${formatTime(duration)}`;
    } else {
      playerSeekEl.value = '0';
      playerTimeEl.textContent = `${formatTime(current)} / 0:00`;
    }
  }

  function toggleTheaterPlay() {
    if (playerEl.paused) {
      playerEl.play().catch(() => {
        playerEl.muted = true;
        playerEl.play().catch(() => {});
      });
    } else {
      playerEl.pause();
    }
    syncTheaterControls();
  }

  function wireTheaterControls() {
    playerHitEl?.addEventListener('click', (e) => {
      if (e.target.closest('.blog-screen__bar')) return;
      toggleTheaterPlay();
    });

    playerPlayBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleTheaterPlay();
    });

    playerMuteBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      playerEl.muted = !playerEl.muted;
      if (!playerEl.muted && playerEl.volume === 0) playerEl.volume = 1;
      syncTheaterControls();
    });

    playerSeekEl?.addEventListener('input', () => {
      const duration = playerEl.duration;
      if (!Number.isFinite(duration) || duration <= 0) return;
      playerEl.currentTime = (Number(playerSeekEl.value) / 100) * duration;
      syncTheaterProgress();
    });

    ['play', 'pause', 'volumechange', 'loadedmetadata'].forEach((evt) => {
      playerEl.addEventListener(evt, syncTheaterControls);
    });
    ['timeupdate', 'loadedmetadata', 'durationchange'].forEach((evt) => {
      playerEl.addEventListener(evt, syncTheaterProgress);
    });

    screenEl?.addEventListener('mouseenter', () => {
      screenEl.classList.add('is-controls-visible');
    });
    screenEl?.addEventListener('mouseleave', () => {
      if (!playerEl.paused) screenEl.classList.remove('is-controls-visible');
    });
    screenEl?.addEventListener('touchstart', () => {
      screenEl.classList.add('is-controls-visible');
    }, { passive: true });
    playerEl.addEventListener('play', () => screenEl?.classList.add('is-controls-visible'));
    playerEl.addEventListener('pause', () => screenEl?.classList.add('is-controls-visible'));
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
    playerEl.pause();

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

  function showPlayerError(index) {
    playerEl.classList.add('is-error');
    if (playerErrorEl) playerErrorEl.hidden = false;
    if (playerErrorPathEl) playerErrorPathEl.textContent = filePath(index);
  }

  function hidePlayerError() {
    playerEl.classList.remove('is-error');
    if (playerErrorEl) playerErrorEl.hidden = true;
  }

  async function loadManifest() {
    try {
      const res = await fetch('../videos/manifest.json', { cache: 'no-store' });
      if (!res.ok) throw new Error('manifest missing');
      const data = await res.json();
      if (!Array.isArray(data) || !data.length) throw new Error('manifest empty');
      return data;
    } catch {
      return FALLBACK_VIDEOS;
    }
  }

  function buildMeta(list) {
    meta = list.map((v) => ({
      ...v,
      src: `../videos/${v.file.replace(/\\/g, '/').split('/').map(encodeURIComponent).join('/')}`,
      orientation: v.orientation || null,
    }));
  }

  function isTheaterLocalFile(file) {
    return /^t[1-4]\.mp4$/i.test(file || '');
  }

  function guessOrientation(file) {
    if (isTheaterLocalFile(file)) return 'landscape';
    if (/vertical|portrait|reel|short/i.test(file)) return 'portrait';
    if (/horizontal|landscape|wide/i.test(file)) return 'landscape';
    return 'landscape';
  }

  function probeOrientations() {
    return Promise.all(
      meta.map(
        (v, i) =>
          new Promise((resolve) => {
            if (v.orientation) {
              resolve();
              return;
            }
            const probe = document.createElement('video');
            probe.preload = 'metadata';
            probe.muted = true;
            probe.playsInline = true;
            const done = (orientation) => {
              meta[i].orientation = orientation;
              resolve();
            };
            probe.onloadedmetadata = () => {
              if (isTheaterLocalFile(v.file)) {
                done('landscape');
                return;
              }
              done(probe.videoWidth >= probe.videoHeight ? 'landscape' : 'portrait');
            };
            probe.onerror = () => done(guessOrientation(v.file));
            probe.src = v.src;
          })
      )
    );
  }

  function renderFilters() {
    formatFiltersEl?.closest('.blog-toolbar')?.setAttribute('hidden', '');
  }

  function setScreenOrientation(i) {
    const fmt = getOrientation(i);
    screenEl.classList.toggle('blog-screen--portrait', fmt === 'portrait');
    screenEl.classList.toggle('blog-screen--landscape', fmt === 'landscape');
  }

  function setPlayerSource(index) {
    const src = videoSrc(index);
    hidePlayerError();
    playerEl.pause();
    playerEl.src = src;
    if (playerSourceEl) playerSourceEl.src = src;
    playerEl.load();
  }

  function playInTheater(i, scrollTo) {
    if (getOrientation(i) === 'portrait') return;

    stopAllInlineReels();
    const v = meta[i];
    setScreenOrientation(i);
    setPlayerSource(i);

    titleEl.textContent = v.title;
    descEl.textContent = v.desc;
    const catLabel = CATEGORIES.find((c) => c.id === v.category);
    catEl.textContent = catLabel ? catLabel.label : v.category;
    catEl.dataset.format = getOrientation(i);

    currentIndex = i;
    playlistEl.querySelectorAll('.blog-playlist__item').forEach((btn) => {
      btn.classList.toggle('is-active', Number(btn.dataset.index) === i);
    });

    playerEl.onloadeddata = () => {
      playerEl.onloadeddata = null;
      hidePlayerError();
    };

    playerEl.onerror = () => {
      showPlayerError(i);
    };

    if (scrollTo && window.matchMedia('(max-width: 900px)').matches) {
      theaterEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function thumbSrc(i) {
    return videoSrc(i);
  }

  function renderPlaylist(filtered) {
    const theaterIndices = getTheaterIndices(filtered);
    playlistEl.innerHTML = theaterIndices
      .map((i, pos) => {
        const v = meta[i];
        const active = i === currentIndex ? ' is-active' : '';
        return `
          <button type="button" class="blog-playlist__item${active}" data-index="${i}">
            <span class="blog-playlist__thumb blog-playlist__thumb--landscape">
              <video muted playsinline preload="metadata" src="${thumbSrc(i)}" aria-hidden="true"></video>
              <span class="blog-playlist__play"><i class="fa-solid fa-play" aria-hidden="true"></i></span>
            </span>
            <span class="blog-playlist__meta">
              <span class="blog-playlist__num">${padNum(pos + 1)}</span>
              <strong>${v.title}</strong>
              <em>Landscape</em>
            </span>
          </button>
        `;
      })
      .join('');

    playlistEl.onclick = (e) => {
      const btn = e.target.closest('.blog-playlist__item');
      if (btn) playInTheater(Number(btn.dataset.index), true);
    };
  }

  function renderReels() {
    if (!reelsEl) return;
    const section = document.getElementById('blogReelsSection');
    const show = shouldShowReels();
    if (section) section.hidden = !show;
    if (!show) {
      stopAllInlineReels();
      reelsEl.innerHTML = '';
      return;
    }

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

  function openCinema(i) {
    stopAllInlineReels();
    const v = meta[i];
    const fmt = getOrientation(i);
    cinema.classList.add('open');
    cinema.classList.toggle('blog-cinema--portrait', fmt === 'portrait');
    cinema.classList.toggle('blog-cinema--landscape', fmt === 'landscape');
    cinema.setAttribute('aria-hidden', 'false');
    cinemaVideo.src = videoSrc(i);
    cinemaTitle.textContent = v.title;
    cinemaVideo.load();
    cinemaVideo.play().catch(() => {});
    document.body.style.overflow = 'hidden';
    playerEl.pause();
  }

  function closeCinema() {
    cinema.classList.remove('open', 'blog-cinema--portrait', 'blog-cinema--landscape');
    cinema.setAttribute('aria-hidden', 'true');
    cinemaVideo.pause();
    cinemaVideo.removeAttribute('src');
    cinemaVideo.load();
    document.body.style.overflow = '';
  }

  function rebuild() {
    const filtered = getFilteredIndices();
    currentIndex = ensureTheaterIndex(filtered);
    syncTheaterVisibility(filtered);
    renderPlaylist(filtered);
    renderReels();
    const theaterIndices = getTheaterIndices(filtered);
    if (theaterIndices.length) playInTheater(currentIndex, false);
    else playerEl.pause();
    observeReveal(document.querySelector('.blog-page'));
  }

  playerEl.addEventListener('error', () => {
    showPlayerError(currentIndex);
  });

  document.getElementById('blogExpandBtn')?.addEventListener('click', (e) => {
    e.stopPropagation();
    openCinema(currentIndex);
  });

  wireTheaterControls();
  syncTheaterControls();
  syncTheaterProgress();

  document.getElementById('blogPlayerPrev')?.addEventListener('click', () => {
    const theaterIndices = getTheaterIndices();
    const pos = theaterIndices.indexOf(currentIndex);
    if (pos > 0) playInTheater(theaterIndices[pos - 1], false);
  });

  document.getElementById('blogPlayerNext')?.addEventListener('click', () => {
    const theaterIndices = getTheaterIndices();
    const pos = theaterIndices.indexOf(currentIndex);
    if (pos < theaterIndices.length - 1) playInTheater(theaterIndices[pos + 1], false);
  });

  cinemaClose?.addEventListener('click', closeCinema);
  cinemaBackdrop?.addEventListener('click', closeCinema);

  document.addEventListener('keydown', (e) => {
    if (!cinema.classList.contains('open')) return;
    if (e.key === 'Escape') closeCinema();
  });

  renderFilters();

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

  loadManifest()
    .then((list) => {
      buildMeta(list);
      return probeOrientations();
    })
    .then(() => rebuild());
})();
