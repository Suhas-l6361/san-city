/* Shared POST helper — each form passes its own Google Form URL.
   Uses a hidden iframe + form POST (not fetch) — Google Forms blocks CORS from websites. */
(function () {
  function appendFields(form, fields) {
    Object.keys(fields).forEach(function (key) {
      var input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = fields[key] == null ? '' : String(fields[key]);
      form.appendChild(input);
    });

    [
      ['fvv', '1'],
      ['draftResponse', '[]'],
      ['pageHistory', '0'],
      ['submissionTimestamp', '-1'],
    ].forEach(function (pair) {
      var meta = document.createElement('input');
      meta.type = 'hidden';
      meta.name = pair[0];
      meta.value = pair[1];
      form.appendChild(meta);
    });
  }

  function postGoogleForm(actionUrl, fields) {
    return new Promise(function (resolve) {
      var iframeName = 'googleFormTarget_' + Date.now();
      var iframe = document.createElement('iframe');
      iframe.name = iframeName;
      iframe.setAttribute('aria-hidden', 'true');
      iframe.title = 'Form submission';
      iframe.style.cssText =
        'position:absolute;width:0;height:0;border:0;visibility:hidden;pointer-events:none';

      var relay = document.createElement('form');
      relay.action = actionUrl;
      relay.method = 'POST';
      relay.target = iframeName;
      relay.acceptCharset = 'UTF-8';
      relay.style.display = 'none';
      appendFields(relay, fields);

      var settled = false;
      var submitted = false;
      var fallbackTimer = null;

      function finish(ok) {
        if (settled) return;
        settled = true;
        if (fallbackTimer !== null) window.clearTimeout(fallbackTimer);
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

      fallbackTimer = window.setTimeout(function () {
        finish(false);
      }, 10000);
    });
  }

  function postAppsScript(url, payload) {
    return fetch(url, {
      method: 'POST',
      mode: 'cors',
      credentials: 'omit',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
    })
      .then(function (response) {
        return response.json().catch(function () {
          return { ok: false };
        });
      })
      .then(function (data) {
        return { ok: !!(data && data.ok), status: data && data.ok ? 200 : 400 };
      })
      .catch(function () {
        return { ok: false, status: 0 };
      });
  }

  window.postGoogleForm = postGoogleForm;
  window.postAppsScript = postAppsScript;
})();
