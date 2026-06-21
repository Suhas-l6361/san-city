/* Contact Us — form submit */
(function () {
  const form = document.getElementById('contactForm');
  const modal = document.getElementById('contactModal');
  if (!form || !modal) return;

  const backdrop = document.getElementById('contactModalBackdrop');
  const closeBtn = document.getElementById('contactModalClose');
  const messageEl = document.getElementById('contactModalMessage');
  const submitBtn = document.getElementById('contactSubmit');

  function openModal(name) {
    if (messageEl) {
      messageEl.textContent = name
        ? `Thank you, ${name}! Your message has been received. Our team will get back to you shortly.`
        : 'Thank you! Your message has been received. Our team will get back to you shortly.';
    }
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const name = form.querySelector('[name="name"]')?.value.trim() || '';
    const label = submitBtn ? submitBtn.innerHTML : '';

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin" aria-hidden="true"></i> Sending...';
    }

    setTimeout(() => {
      form.reset();
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = label;
      }
      openModal(name);
    }, 600);
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });
})();
