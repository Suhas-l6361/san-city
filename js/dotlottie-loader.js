/* Load dotlottie-wc once, on demand */
(function () {
  const SRC = 'https://unpkg.com/@lottiefiles/dotlottie-wc@0.9.14/dist/dotlottie-wc.js';
  let loadPromise = null;

  window.SanCityDotLottie = {
    load() {
      if (customElements.get('dotlottie-wc')) {
        return Promise.resolve();
      }
      if (loadPromise) return loadPromise;

      loadPromise = new Promise((resolve, reject) => {
        const existing = document.querySelector('script[data-dotlottie-loader]');
        if (existing) {
          existing.addEventListener('load', () => resolve(), { once: true });
          existing.addEventListener('error', () => reject(new Error('dotlottie load failed')), { once: true });
          return;
        }

        const script = document.createElement('script');
        script.src = SRC;
        script.type = 'module';
        script.dataset.dotlottieLoader = '1';
        script.onload = () => customElements.whenDefined('dotlottie-wc').then(resolve).catch(reject);
        script.onerror = () => reject(new Error('dotlottie load failed'));
        document.head.appendChild(script);
      });

      return loadPromise;
    },
  };
})();
