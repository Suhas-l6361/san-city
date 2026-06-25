/* Home — play amenity icon videos only when visible */
(function () {
  const videos = document.querySelectorAll('video.amenity-icon[data-src]');
  if (!videos.length) return;

  function loadVideo(video) {
    if (video.dataset.loaded === '1') return;
    video.src = video.dataset.src;
    video.dataset.loaded = '1';
  }

  function playVideo(video) {
    loadVideo(video);
    const p = video.play();
    if (p && typeof p.catch === 'function') p.catch(() => {});
  }

  function pauseVideo(video) {
    if (video.dataset.loaded !== '1') return;
    video.pause();
  }

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) playVideo(entry.target);
        else pauseVideo(entry.target);
      });
    },
    { rootMargin: '40px 0px', threshold: 0.2 }
  );

  videos.forEach((video) => {
    video.preload = 'none';
    obs.observe(video);
  });

  document.addEventListener('visibilitychange', () => {
    videos.forEach((video) => {
      if (document.hidden) pauseVideo(video);
      else if (video.dataset.loaded === '1') playVideo(video);
    });
  });
})();
