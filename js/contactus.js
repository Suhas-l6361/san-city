/* Contact Us — office list + Google Forms submit */
(function () {
  const officesEl = document.getElementById('cuOfficesList');
  const offices = window.SanCityOffices || [];

  if (officesEl && offices.length) {
    officesEl.innerHTML = offices
      .map(
        (office) => `
        <li class="cu-office">
          <a class="cu-office__link" href="${office.map}" target="_blank" rel="noopener noreferrer" aria-label="Open ${office.name} office in Google Maps">
            <strong>${office.name}</strong>
            <p>${office.address}</p>
          </a>
        </li>`
      )
      .join('');
  }

  const form = document.getElementById('contactForm');
  const modal = document.getElementById('contactModal');
  if (!form || !modal) return;

  const backdrop = document.getElementById('contactModalBackdrop');
  const closeBtn = document.getElementById('contactModalClose');
  const messageEl = document.getElementById('contactModalMessage');
  const titleEl = document.getElementById('contactModalTitle');
  const iconEl = modal.querySelector('.contact-modal__icon i');
  const submitBtn = document.getElementById('contactSubmit');

  /* SETUP: Create Google Form "San City — Contact Enquiry" with fields:
     Your Name, Your Email, Subject, Message (short answer each).
     Publish → Anyone with the link. Link to a new Sheet.
     Open pre-filled link or view-source to get entry.XXXXXXXX IDs, then paste below. */
  const GOOGLE_CONTACT_FORM_ACTION = '';
  const GOOGLE_CONTACT_FORM_ENTRIES = {
    name: '',
    email: '',
    subject: '',
    message: '',
  };

  function isConfigured() {
    return !!(
      GOOGLE_CONTACT_FORM_ACTION &&
      GOOGLE_CONTACT_FORM_ENTRIES.name &&
      GOOGLE_CONTACT_FORM_ENTRIES.email &&
      GOOGLE_CONTACT_FORM_ENTRIES.subject &&
      GOOGLE_CONTACT_FORM_ENTRIES.message
    );
  }

  function openModal(name, success) {
    if (success) {
      modal.classList.remove('is-error');
      if (iconEl) iconEl.className = 'fa-solid fa-circle-check';
      if (titleEl) titleEl.textContent = 'Message Sent!';
      if (messageEl) {
        messageEl.textContent = name
          ? `Thank you, ${name}! Your message has been received. Our team will get back to you shortly.`
          : 'Thank you! Your message has been received. Our team will get back to you shortly.';
      }
    } else {
      modal.classList.add('is-error');
      if (iconEl) iconEl.className = 'fa-solid fa-circle-xmark';
      if (titleEl) titleEl.textContent = 'Message Not Sent';
      if (messageEl) {
        messageEl.textContent = isConfigured()
          ? 'Your message could not be sent. Please try again or email admin@sancity1.com directly.'
          : 'Contact form is not connected yet. Please email admin@sancity1.com or call +91 97319 01111.';
      }
    }
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    modal.classList.remove('open', 'is-error');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function sendToGoogleForm({ name, email, subject, message }) {
    if (!window.postGoogleForm || !isConfigured()) {
      return Promise.resolve({ ok: false });
    }
    return window.postGoogleForm(GOOGLE_CONTACT_FORM_ACTION, {
      [GOOGLE_CONTACT_FORM_ENTRIES.name]: name,
      [GOOGLE_CONTACT_FORM_ENTRIES.email]: email,
      [GOOGLE_CONTACT_FORM_ENTRIES.subject]: subject,
      [GOOGLE_CONTACT_FORM_ENTRIES.message]: message,
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const name = form.querySelector('[name="name"]')?.value.trim() || '';
    const email = form.querySelector('[name="email"]')?.value.trim() || '';
    const subject = form.querySelector('[name="subject"]')?.value.trim() || '';
    const message = form.querySelector('[name="message"]')?.value.trim() || '';
    const submitLabel = submitBtn ? submitBtn.innerHTML : '';

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin" aria-hidden="true"></i> Sending...';
    }

    sendToGoogleForm({ name, email, subject, message })
      .then((result) => {
        if (result && result.ok) form.reset();
        openModal(name, !!(result && result.ok));
      })
      .catch(() => openModal(name, false))
      .finally(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = submitLabel;
        }
      });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });
})();
