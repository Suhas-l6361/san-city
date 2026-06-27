/* Shared POST helper — each form passes its own Google Form URL.
   Uses a hidden iframe form POST (not fetch) to avoid browser CORS blocks. */
(function () {
  function postGoogleForm(actionUrl, fields) {
    return new Promise(function (resolve) {
      const iframeName = 'googleFormTarget_' + Date.now();
      const iframe = document.createElement('iframe');
      iframe.name = iframeName;
      iframe.setAttribute('aria-hidden', 'true');
      iframe.style.cssText = 'position:absolute;width:0;height:0;border:0;visibility:hidden';

      const relay = document.createElement('form');
      relay.action = actionUrl;
      relay.method = 'POST';
      relay.target = iframeName;
      relay.acceptCharset = 'UTF-8';
      relay.style.display = 'none';

      const params = new URLSearchParams();
      Object.keys(fields).forEach(function (key) {
        params.append(key, fields[key] == null ? '' : String(fields[key]));
      });
      params.set('fvv', '1');
      params.set('draftResponse', '[]');
      params.set('pageHistory', '0');
      params.set('submissionTimestamp', '-1');

      params.forEach(function (value, key) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value;
        relay.appendChild(input);
      });

      let settled = false;
      let fallbackTimer = null;
      let submitted = false;

      function finish(ok) {
        if (settled) return;
        settled = true;
        if (fallbackTimer !== null) clearTimeout(fallbackTimer);
        iframe.remove();
        relay.remove();
        resolve({ ok: ok });
      }

      iframe.addEventListener('load', function () {
        if (!submitted) return;
        finish(true);
      });

      document.body.appendChild(iframe);
      document.body.appendChild(relay);
      submitted = true;
      relay.submit();

      fallbackTimer = setTimeout(function () {
        finish(false);
      }, 5000);
    });
  }

  window.postGoogleForm = postGoogleForm;
})();
