/* Lazy-load page Lotties when visible — reliable activation */
(function () {
  function onReady(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  onReady(() => {
    const lazyEls = [...document.querySelectorAll('dotlottie-wc[data-lazy-src]')];
    if (!lazyEls.length || !window.SanCityDotLottie) return;

    function activate(el) {
      const url = el.dataset.lazySrc;
      if (!url) return;

      if (!el.getAttribute('src')) {
        el.setAttribute('src', url);
        el.setAttribute('autoplay', '');
        el.setAttribute('loop', '');
        el.dataset.lazyLoaded = '1';
      }

      try {
        el.play?.();
      } catch {
        /* dotlottie API may vary */
      }
    }

    function isNearViewport(el) {
      const rect = el.getBoundingClientRect();
      const margin = 160;
      return rect.bottom > -margin && rect.top < window.innerHeight + margin;
    }

    function activateVisible() {
      lazyEls.forEach((el) => {
        if (isNearViewport(el)) activate(el);
      });
    }

    function start() {
      activateVisible();

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              activate(entry.target);
            }
          });
        },
        { rootMargin: '120px 0px', threshold: 0.01 }
      );

      lazyEls.forEach((el) => observer.observe(el));

      /* Catch any that missed the first pass (layout / slow fonts) */
      setTimeout(activateVisible, 400);
      setTimeout(() => lazyEls.forEach(activate), 1500);

      document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
          lazyEls.forEach((el) => {
            if (el.dataset.lazyLoaded === '1') activate(el);
          });
        }
      });
    }

    window.SanCityDotLottie.load().then(start).catch(() => {});
  });
})();
