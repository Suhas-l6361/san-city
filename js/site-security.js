/* San City — client security (forms, honeypot, inspect deterrents) */
(function () {
  const HP_NAME = 'sc_website_url';
  const SUBMIT_COOLDOWN_MS = 30000;
  const FIELD_LIMITS = {
    text: 120,
    email: 254,
    tel: 18,
    textarea: 2000,
  };

  const EDITABLE = new Set(['INPUT', 'TEXTAREA']);

  function isEditableTarget(target) {
    if (!target || !target.tagName) return false;
    if (!EDITABLE.has(target.tagName)) return false;
    if (target.isContentEditable) return true;
    if (target.readOnly || target.disabled) return false;
    return true;
  }

  function sanitizeText(value) {
    if (value == null) return '';
    let s = String(value);
    s = s.replace(/\0/g, '');
    s = s.replace(/<[^>]*>/g, '');
    s = s.replace(/javascript:/gi, '');
    s = s.replace(/on\w+\s*=/gi, '');
    if (s.length > 5000) s = s.slice(0, 5000);
    return s.trim();
  }

  function sanitizeFields(fields) {
    const out = {};
    Object.keys(fields || {}).forEach((key) => {
      out[key] = sanitizeText(fields[key]);
    });
    return out;
  }

  function formRateKey(form) {
    return form.id || form.getAttribute('name') || form.className || 'anonymous-form';
  }

  function isRateLimited(form) {
    try {
      const key = 'sc_rate_' + formRateKey(form);
      const last = sessionStorage.getItem(key);
      return !!(last && Date.now() - Number(last) < SUBMIT_COOLDOWN_MS);
    } catch (err) {
      return false;
    }
  }

  function markFormSubmitted(form) {
    try {
      sessionStorage.setItem('sc_rate_' + formRateKey(form), String(Date.now()));
    } catch (err) {
      /* ignore */
    }
  }

  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function isHoneypotTripped(form) {
    if (!form) return false;
    const hp = form.querySelector('[data-sc-honeypot]');
    return !!(hp && String(hp.value || '').trim());
  }

  function injectHoneypots() {
    document.querySelectorAll('form').forEach((form) => {
      if (form.querySelector('[data-sc-honeypot]')) return;
      const hp = document.createElement('input');
      hp.type = 'text';
      hp.name = HP_NAME;
      hp.setAttribute('data-sc-honeypot', '1');
      hp.setAttribute('aria-hidden', 'true');
      hp.tabIndex = -1;
      hp.autocomplete = 'off';
      hp.className = 'sc-honeypot';
      form.appendChild(hp);
    });
  }

  function applyFieldLimits() {
    document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"]').forEach((el) => {
      if (el.maxLength > 0) return;
      if (el.type === 'email') el.maxLength = FIELD_LIMITS.email;
      else if (el.type === 'tel') el.maxLength = FIELD_LIMITS.tel;
      else el.maxLength = FIELD_LIMITS.text;
    });
    document.querySelectorAll('textarea').forEach((el) => {
      if (!el.maxLength) el.maxLength = FIELD_LIMITS.textarea;
    });
  }

  function showSecurityNotice(message) {
    if (document.getElementById('sc-security-notice')) return;
    const el = document.createElement('div');
    el.id = 'sc-security-notice';
    el.className = 'sc-security-notice';
    el.setAttribute('role', 'status');

    const text = document.createElement('span');
    text.textContent = message || 'This site is protected. Inspection and copying are restricted.';

    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'sc-security-notice__close';
    closeBtn.setAttribute('aria-label', 'Dismiss');
    closeBtn.textContent = '×';
    closeBtn.addEventListener('click', () => el.remove());

    el.appendChild(text);
    el.appendChild(closeBtn);
    document.body.appendChild(el);

    window.setTimeout(() => {
      if (el.parentNode) el.remove();
    }, 6000);
  }

  function blockContextMenu(e) {
    e.preventDefault();
    return false;
  }

  function blockInspectKeys(e) {
    const key = e.key || '';
    const ctrl = e.ctrlKey || e.metaKey;
    const shift = e.shiftKey;
    const alt = e.altKey;

    let blocked = false;

    if (key === 'F12') blocked = true;
    if (ctrl && shift && /^(I|J|C)$/i.test(key)) blocked = true;
    if (ctrl && /^(U|S)$/i.test(key)) blocked = true;
    if (e.metaKey && alt && /^I$/i.test(key)) blocked = true;

    if (blocked) {
      e.preventDefault();
      e.stopPropagation();
      showSecurityNotice('Developer tools and page source are disabled on this site.');
      return false;
    }
  }

  function blockSelection(e) {
    if (isEditableTarget(e.target)) return;
    e.preventDefault();
    return false;
  }

  function blockClipboard(e) {
    if (isEditableTarget(e.target)) return;
    e.preventDefault();
    return false;
  }

  function blockDrag(e) {
    if (isEditableTarget(e.target)) return;
    e.preventDefault();
    return false;
  }

  function isDesktopInspectContext() {
    try {
      return window.matchMedia('(min-width: 768px) and (pointer: fine)').matches;
    } catch (err) {
      return window.innerWidth >= 768;
    }
  }

  function initDevToolsNotice() {
    if (!isDesktopInspectContext()) return;

    let shown = false;
    const check = () => {
      if (shown) return;
      const gap = 160;
      const widthGap = window.outerWidth - window.innerWidth;
      const heightGap = window.outerHeight - window.innerHeight;
      if (widthGap > gap && heightGap > gap) {
        shown = true;
        showSecurityNotice('Developer tools detected. This session may be monitored.');
      }
    };
    window.addEventListener('resize', check);
    window.setInterval(check, 2000);
  }

  function initInspectGuards() {
    if (!isDesktopInspectContext()) return;

    document.body.classList.add('sc-protected');

    document.addEventListener('contextmenu', blockContextMenu, true);
    document.addEventListener('keydown', blockInspectKeys, true);
    document.addEventListener('selectstart', blockSelection, true);
    document.addEventListener('copy', blockClipboard, true);
    document.addEventListener('cut', blockClipboard, true);
    document.addEventListener('dragstart', blockDrag, true);
  }

  function initFormGuards() {
    document.addEventListener(
      'submit',
      (e) => {
        const form = e.target;
        if (!form || form.tagName !== 'FORM') return;
        if (isHoneypotTripped(form)) {
          e.preventDefault();
          e.stopImmediatePropagation();
          return;
        }
        if (isRateLimited(form)) {
          e.preventDefault();
          e.stopImmediatePropagation();
          showSecurityNotice('Please wait a moment before submitting again.');
        }
      },
      true
    );

    document.addEventListener(
      'submit',
      (e) => {
        const form = e.target;
        if (!form || form.tagName !== 'FORM') return;
        if (isHoneypotTripped(form) || isRateLimited(form)) return;
        markFormSubmitted(form);
      },
      false
    );

    document.addEventListener('submit', (e) => {
      const form = e.target;
      if (!form || form.tagName !== 'FORM') return;
      form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], textarea').forEach((el) => {
        if (el.getAttribute('data-sc-honeypot')) return;
        el.value = sanitizeText(el.value);
      });
    });
  }

  function init() {
    injectHoneypots();
    applyFieldLimits();
    initFormGuards();
    initInspectGuards();
    initDevToolsNotice();
  }

  window.SanCitySecurity = {
    sanitizeText,
    sanitizeFields,
    isHoneypotTripped,
    escapeHtml,
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
