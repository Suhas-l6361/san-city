/* Shared POST helper — each form passes its own Google Form URL.
   Uses a hidden iframe + form POST (not fetch) — Google Forms blocks CORS from websites. */
(function () {
  function sanitizeValue(val) {
    if (window.SanCitySecurity && window.SanCitySecurity.sanitizeText) {
      return window.SanCitySecurity.sanitizeText(val);
    }
    if (val == null) return '';
    return String(val);
  }

  function appendFields(form, fields) {
    Object.keys(fields).forEach(function (key) {
      var input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = sanitizeValue(fields[key]);
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
    if (!isAllowedGoogleFormUrl(actionUrl)) {
      return Promise.resolve({ ok: false, status: 403 });
    }
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

  function sanitizePayload(payload) {
    if (!payload || typeof payload !== 'object') return payload;
    var out = {};
    Object.keys(payload).forEach(function (key) {
      var val = payload[key];
      if (key === 'resumeBase64' || key === 'resumeMime') {
        out[key] = val;
      } else {
        out[key] = sanitizeValue(val);
      }
    });
    return out;
  }

  function isAllowedGoogleFormUrl(url) {
    try {
      var u = new URL(String(url));
      return (
        u.protocol === 'https:' &&
        u.hostname === 'docs.google.com' &&
        u.pathname.indexOf('/forms/') !== -1
      );
    } catch (err) {
      return false;
    }
  }

  function isAllowedAppsScriptUrl(url) {
    try {
      var u = new URL(String(url));
      return (
        u.protocol === 'https:' &&
        u.hostname === 'script.google.com' &&
        /\/macros\/s\/[^/]+\/exec$/.test(u.pathname)
      );
    } catch (err) {
      return false;
    }
  }

  function postAppsScript(url, payload) {
    if (!isAllowedAppsScriptUrl(url)) {
      return Promise.resolve({ ok: false, status: 403 });
    }
    return fetch(url, {
      method: 'POST',
      mode: 'cors',
      credentials: 'omit',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(sanitizePayload(payload)),
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
