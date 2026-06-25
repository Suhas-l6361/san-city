/* Happy Customers — featured player + grid */
(function () {
  const PLAYLIST_ID = 'PL4eyLuHm8EpF2CPV8xxAqOMq7pO6ZHhDA';

  const VIDEOS = [
    { id: 'kryZ5Gbql-g', title: 'Happy Customer — Story 1' },
    { id: 'Ci4G539jJnU', title: 'Happy Customer — Story 2' },
    { id: 'frDMN2oL4pA', title: 'Happy Customer — Story 3' },
    { id: 'eIMNHHeH1y0', title: 'Happy Customer — Story 4' },
    { id: 'DGCL26XnjTg', title: 'Happy Customer — Story 5' },
    { id: 'KoqqdopF6GI', title: 'Happy Customer — Story 6' },
    { id: 'aAwnKE9plo4', title: 'Happy Customer — Story 7' },
    { id: 'msJadAxnsss', title: 'Happy Customer — Story 8' },
    { id: '3LFNAvC5bIE', title: 'Happy Customer — Story 9' },
    { id: 'civg0PeEY8g', title: 'Happy Customer — Story 10' },
    { id: 'LJ7SWmDADfg', title: 'Happy Customer — Story 11' },
    { id: 'Jv61zcY3Eew', title: 'Happy Customer — Story 12' },
    { id: 'PubKrhGOOWE', title: 'Happy Customer — Story 13' },
    { id: '_2ydhSvZ-aY', title: 'Happy Customer — Story 14' },
    { id: '_j8Tdtopx8s', title: 'Happy Customer — Story 15' },
    { id: 'S6miSBA1KPs', title: 'Happy Customer — Story 16' },
    { id: 'KkeiGAWtKpQ', title: 'Happy Customer — Story 17' },
    { id: 'S9BW6Tzgp4Q', title: 'Happy Customer — Story 18' },
    { id: 'FLKO4VQOBiM', title: 'Happy Customer — Story 19' },
    { id: 'HXJ5YAoJ3N8', title: 'Happy Customer — Story 20' },
    { id: 'yfWk56P061A', title: 'Happy Customer — Story 21' },
    { id: 'CPJZ4X7wlF4', title: 'Happy Customer — Story 22' },
    { id: 'kjGvbeYxzGQ', title: 'Happy Customer — Story 23' },
    { id: 'YALUdU6RWxw', title: 'Happy Customer — Story 24' },
    { id: 'VmjPeabGcBg', title: 'Happy Customer — Story 25' },
    { id: '9GeI7-AycWg', title: 'Happy Customer — Story 26' },
  ];

  const gridEl = document.getElementById('hcGrid');
  const iframeEl = document.getElementById('hcIframe');
  const titleEl = document.getElementById('hcTitle');
  const indexEl = document.getElementById('hcIndex');
  const ytLinkEl = document.getElementById('hcYtLink');
  const prevBtn = document.getElementById('hcPrev');
  const nextBtn = document.getElementById('hcNext');
  const featureEl = document.getElementById('hcFeature');
  const showMoreEl = document.getElementById('hcShowMore');

  if (!gridEl || !iframeEl || !titleEl) return;

  let activeIndex = 0;

  function padNum(n) {
    return String(n).padStart(2, '0');
  }

  function thumbUrl(id) {
    return `https://i.ytimg.com/vi/${encodeURIComponent(id)}/hqdefault.jpg`;
  }

  function embedUrl(index, autoplay) {
    const id = VIDEOS[index].id;
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

  function watchUrl(index) {
    const video = VIDEOS[index];
    return `https://www.youtube.com/watch?v=${video.id}&list=${PLAYLIST_ID}&index=${index + 1}`;
  }

  function playlistUrl() {
    return `https://www.youtube.com/playlist?list=${PLAYLIST_ID}`;
  }

  function scrollToFeature() {
    if (!featureEl) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const offset = window.matchMedia('(max-width: 900px)').matches ? 78 : 28;
    const top = featureEl.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: Math.max(0, top), behavior: reduced ? 'auto' : 'smooth' });
    window.setTimeout(() => {
      featureEl.focus({ preventScroll: true });
    }, reduced ? 0 : 450);
  }

  function setActive(index, scrollToPlayer) {
    activeIndex = index;
    const video = VIDEOS[index];
    iframeEl.src = embedUrl(index, true);
    titleEl.textContent = video.title;
    if (indexEl) indexEl.textContent = padNum(index + 1);
    if (ytLinkEl) ytLinkEl.href = watchUrl(index);

    gridEl.querySelectorAll('.hc-card').forEach((btn) => {
      const i = Number(btn.dataset.index);
      btn.classList.toggle('is-active', i === index);
    });

    if (scrollToPlayer) {
      scrollToFeature();
      featureEl?.classList.add('is-playing');
      window.setTimeout(() => featureEl?.classList.remove('is-playing'), 900);
    }
  }

  function renderGrid() {
    gridEl.innerHTML = VIDEOS.map((video, i) => {
      const active = i === activeIndex ? ' is-active' : '';
      return `
        <button type="button" class="hc-card${active}" data-index="${i}" aria-label="Play ${video.title}">
          <div class="hc-card__thumb">
            <span class="hc-card__num">${padNum(i + 1)}</span>
            <span class="hc-card__video-tag"><i class="fa-solid fa-video" aria-hidden="true"></i> Video</span>
            <img src="${thumbUrl(video.id)}" alt="" loading="lazy" />
            <span class="hc-card__play" aria-hidden="true">
              <span class="hc-card__play-btn"><i class="fa-solid fa-play"></i></span>
            </span>
          </div>
          <div class="hc-card__body">
            <strong>${video.title}</strong>
          </div>
        </button>
      `;
    }).join('');

    gridEl.onclick = (e) => {
      const card = e.target.closest('.hc-card');
      if (!card) return;
      setActive(Number(card.dataset.index), true);
    };
  }

  prevBtn?.addEventListener('click', () => {
    if (activeIndex > 0) setActive(activeIndex - 1, false);
  });

  nextBtn?.addEventListener('click', () => {
    if (activeIndex < VIDEOS.length - 1) setActive(activeIndex + 1, false);
  });

  renderGrid();
  setActive(0, false);
  if (showMoreEl) showMoreEl.href = playlistUrl();
})();
