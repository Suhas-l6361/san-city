/* San City — decorative butterfly (index trial, performance-safe) */
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const FLY_MS = 5000;
  const REST_ON_LOGO_MS = 8000;
  const DIAGONAL_ROUTES = [
    { from: 'bottom-right', to: 'top-left' },
    { from: 'top-right', to: 'bottom-left' },
  ];
  const LOTTIE_SRC =
    'https://lottie.host/92897528-f300-4039-ad68-e98e0c72ff58/1b17q9GiCs.lottie';

  let routeIndex = 0;
  let flying = false;
  let cycleTimer = null;
  let rafId = null;
  let rootEl = null;
  let bodyEl = null;
  let lottieEl = null;
  let cachedLogo = null;
  let scrollRefreshTimer = null;

  function padTop() {
    return window.innerWidth <= 1024 ? 64 : 16;
  }

  function padLeft() {
    return window.innerWidth <= 1024 ? 0 : 280;
  }

  function getCorner(name) {
    const pad = 20;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const top = pad + padTop();
    const bottom = h - pad - 24;
    const left = pad + padLeft();
    const right = w - pad;

    switch (name) {
      case 'top-left':
        return { x: left + 40, y: top + 20 };
      case 'top-right':
        return { x: right - 40, y: top + 20 };
      case 'bottom-right':
        return { x: right - 56, y: bottom - 80 };
      case 'bottom-left':
        return { x: left + 48, y: bottom - 48 };
      default:
        return { x: w / 2, y: h / 2 };
    }
  }

  function refreshLogoPoint() {
    const logo =
      window.innerWidth <= 1024
        ? document.querySelector('.mobile-bar img')
        : document.getElementById('sidebarLogo')?.querySelector('img') ||
          document.querySelector('.sidebar-logo img');
    if (!logo) {
      cachedLogo = getCorner('top-left');
      return cachedLogo;
    }
    const r = logo.getBoundingClientRect();
    cachedLogo = {
      x: r.left + r.width * 0.68,
      y: r.top + r.height * 0.38,
    };
    return cachedLogo;
  }

  function easeInOut(t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  }

  function flightAngle(from, to) {
    return (Math.atan2(to.y - from.y, to.x - from.x) * 180) / Math.PI + 90;
  }

  function setTransform(point, angleDeg, perched) {
    if (!bodyEl) return;
    const x = Math.round(point.x);
    const y = Math.round(point.y);
    bodyEl.style.transform =
      `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) rotate(${angleDeg}deg)`;
    bodyEl.classList.toggle('is-perched', !!perched);
    bodyEl.style.willChange = perched ? 'auto' : 'transform';
  }

  function setLottieActive(active) {
    if (!lottieEl) return;
    try {
      lottieEl.setAttribute('speed', active ? '1' : '0.45');
      if (active) lottieEl.play?.();
      else lottieEl.pause?.();
    } catch {
      /* dotlottie API may vary */
    }
  }

  function fly(from, to, duration) {
    return new Promise((resolve) => {
      if (!bodyEl) {
        resolve();
        return;
      }

      flying = true;
      rootEl?.classList.add('is-flying');
      bodyEl.classList.remove('is-perched');
      setLottieActive(true);

      const angle = flightAngle(from, to);
      const start = performance.now();

      function frame(now) {
        if (document.hidden) {
          rafId = requestAnimationFrame(frame);
          return;
        }

        const t = Math.min((now - start) / duration, 1);
        const e = easeInOut(t);
        const x = from.x + (to.x - from.x) * e;
        const y = from.y + (to.y - from.y) * e;
        const wobble = Math.sin(t * Math.PI * 4) * (1 - t) * 4;

        setTransform({ x, y: y + wobble }, angle, false);

        if (t < 1) {
          rafId = requestAnimationFrame(frame);
        } else {
          flying = false;
          rafId = null;
          rootEl?.classList.remove('is-flying');
          resolve();
        }
      }

      rafId = requestAnimationFrame(frame);
    });
  }

  function perchOnLogo() {
    setTransform(refreshLogoPoint(), 0, true);
    setLottieActive(false);
  }

  async function runCycle() {
    if (flying || !bodyEl) return;

    const route = DIAGONAL_ROUTES[routeIndex % DIAGONAL_ROUTES.length];
    routeIndex += 1;

    const from = getCorner(route.from);
    const to = getCorner(route.to);

    bodyEl.style.opacity = '0';
    setTransform(from, flightAngle(from, to), false);
    bodyEl.style.opacity = '1';

    await fly(from, to, FLY_MS);
    perchOnLogo();
  }

  function scheduleNextFlight() {
    clearTimeout(cycleTimer);
    cycleTimer = setTimeout(async () => {
      if (!document.hidden) {
        await runCycle();
      }
      scheduleNextFlight();
    }, REST_ON_LOGO_MS);
  }

  function onScroll() {
    if (flying) return;
    clearTimeout(scrollRefreshTimer);
    scrollRefreshTimer = setTimeout(() => {
      if (!flying && bodyEl) perchOnLogo();
    }, 120);
  }

  function onResize() {
    refreshLogoPoint();
    if (!flying && bodyEl) perchOnLogo();
  }

  async function init() {
    if (document.getElementById('butterflyFly')) return;

    try {
      await customElements.whenDefined('dotlottie-wc');
    } catch {
      return;
    }

    rootEl = document.createElement('div');
    rootEl.id = 'butterflyFly';
    rootEl.className = 'butterfly-fly';
    rootEl.setAttribute('aria-hidden', 'true');

    bodyEl = document.createElement('div');
    bodyEl.className = 'butterfly-fly__body is-perched';

    lottieEl = document.createElement('dotlottie-wc');
    lottieEl.setAttribute('src', LOTTIE_SRC);
    lottieEl.setAttribute('autoplay', '');
    lottieEl.setAttribute('loop', '');
    lottieEl.setAttribute('speed', '0.45');

    bodyEl.appendChild(lottieEl);
    rootEl.appendChild(bodyEl);
    document.body.appendChild(rootEl);

    refreshLogoPoint();
    perchOnLogo();

    setTimeout(() => {
      runCycle().then(scheduleNextFlight);
    }, REST_ON_LOGO_MS);

    window.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        clearTimeout(cycleTimer);
        if (rafId) cancelAnimationFrame(rafId);
        setLottieActive(false);
      } else {
        refreshLogoPoint();
        perchOnLogo();
        scheduleNextFlight();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
