/* San City — shared shell scripts (drawer, dropdowns, brochure, reveal) */
(function () {
  const drawer = document.getElementById('mobDrawer');
  const mobOpen = document.getElementById('mobOpen');
  const mobClose = document.getElementById('mobClose');
  if (drawer && mobOpen && mobClose) {
    const openDrawer = () => {
      drawer.classList.add('open');
      document.body.classList.add('menu-open');
    };
    const closeDrawer = () => {
      drawer.classList.remove('open');
      document.body.classList.remove('menu-open');
    };
    mobOpen.onclick = openDrawer;
    mobClose.onclick = closeDrawer;
    document.querySelectorAll('.mob').forEach((l) => {
      l.addEventListener('click', () => {
        if (l.id === 'mobMediaToggle') return;
        if (!l.classList.contains('email-link') && !l.href.startsWith('http')) {
          closeDrawer();
        } else if (l.classList.contains('email-link') || l.href.startsWith('http')) {
          setTimeout(closeDrawer, 150);
        }
      });
    });
    document.querySelectorAll('.email-link').forEach((link) => {
      link.addEventListener('click', () => closeDrawer());
    });
  }

  const mediaDropdown = document.getElementById('mediaDropdown');
  const mediaToggle = document.getElementById('mediaToggle');
  if (mediaDropdown && mediaToggle) {
    const isMediaSubPage = /award\.html|blog\.html/i.test(window.location.pathname);

    function setMediaOpen(open) {
      mediaDropdown.classList.toggle('open', open);
      mediaToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    if (isMediaSubPage) {
      setMediaOpen(true);
    }

    mediaToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      setMediaOpen(!mediaDropdown.classList.contains('open'));
    });
    document.addEventListener('click', (e) => {
      if (!mediaDropdown.contains(e.target)) {
        if (isMediaSubPage) return;
        setMediaOpen(false);
      }
    });
  }

  const mobMediaDropdown = document.getElementById('mobMediaDropdown');
  const mobMediaToggle = document.getElementById('mobMediaToggle');
  if (mobMediaDropdown && mobMediaToggle) {
    const isMediaSubPage = /award\.html|blog\.html/i.test(window.location.pathname);
    if (isMediaSubPage) {
      mobMediaDropdown.classList.add('open');
      mobMediaToggle.setAttribute('aria-expanded', 'true');
    }
    mobMediaToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const isOpen = mobMediaDropdown.classList.toggle('open');
      mobMediaToggle.setAttribute('aria-expanded', isOpen);
    });
  }

  const downloadBtn = document.getElementById('brochureDownloadBtn');
  const modal = document.getElementById('brochureModal');
  if (downloadBtn && modal) {
    const BROCHURE_URL = downloadBtn.dataset.brochureUrl || 'brochure.pdf';
    const BROCHURE_NAME = 'San-City-Brochure.pdf';
    const backdrop = document.getElementById('brochureModalBackdrop');
    const icon = document.getElementById('brochureModalIcon');
    const title = document.getElementById('brochureModalTitle');
    const status = document.getElementById('brochureModalStatus');
    const progressWrap = document.getElementById('brochureModalProgress');
    const progressBar = document.getElementById('brochureModalProgressBar');
    let closeTimer;

    function setModalState(state, message, percent) {
      icon.classList.remove('is-success', 'is-error');
      if (state === 'loading') {
        icon.innerHTML = '<i class="fa-solid fa-spinner fa-spin" aria-hidden="true"></i>';
        title.textContent = 'Downloading Brochure';
        status.textContent = message || 'Please wait while your brochure is being prepared...';
        progressWrap.hidden = false;
        progressBar.style.width = (percent || 0) + '%';
      } else if (state === 'success') {
        icon.classList.add('is-success');
        icon.innerHTML = '<i class="fa-solid fa-circle-check" aria-hidden="true"></i>';
        title.textContent = 'Download Complete';
        status.textContent = message || 'Your brochure has been downloaded successfully.';
        progressBar.style.width = '100%';
      } else if (state === 'error') {
        icon.classList.add('is-error');
        icon.innerHTML = '<i class="fa-solid fa-circle-exclamation" aria-hidden="true"></i>';
        title.textContent = 'Download Failed';
        status.textContent = message || 'Something went wrong. Please try again.';
      }
    }

    function openModal() {
      clearTimeout(closeTimer);
      setModalState('loading', 'Connecting...', 0);
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      progressWrap.hidden = true;
      progressBar.style.width = '0%';
    }

    function triggerFileSave(blob) {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = BROCHURE_NAME;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }

    function fallbackDownload() {
      const link = document.createElement('a');
      link.href = BROCHURE_URL;
      link.download = BROCHURE_NAME;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      link.remove();
    }

    async function downloadBrochure() {
      if (downloadBtn.disabled) return;
      downloadBtn.disabled = true;
      openModal();
      try {
        const response = await fetch(BROCHURE_URL);
        if (!response.ok) throw new Error('Brochure not found');
        const total = Number(response.headers.get('Content-Length')) || 0;
        if (!response.body || !total) {
          setModalState('loading', 'Downloading brochure...', 35);
          const blob = await response.blob();
          setModalState('loading', 'Saving brochure...', 90);
          triggerFileSave(blob);
        } else {
          const reader = response.body.getReader();
          const chunks = [];
          let received = 0;
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            chunks.push(value);
            received += value.length;
            const percent = Math.min(99, Math.round((received / total) * 100));
            setModalState('loading', 'Downloading brochure... ' + percent + '%', percent);
          }
          const blob = new Blob(chunks, { type: 'application/pdf' });
          setModalState('loading', 'Saving brochure...', 99);
          triggerFileSave(blob);
        }
        setModalState('success');
        closeTimer = setTimeout(closeModal, 1800);
      } catch (err) {
        try {
          setModalState('loading', 'Starting download...', 50);
          fallbackDownload();
          setModalState('success', 'Your brochure download has started.');
          closeTimer = setTimeout(closeModal, 1800);
        } catch (fallbackErr) {
          setModalState('error', 'Unable to download the brochure. Please try again.');
          closeTimer = setTimeout(closeModal, 2800);
        }
      } finally {
        downloadBtn.disabled = false;
      }
    }

    downloadBtn.addEventListener('click', downloadBrochure);
    if (backdrop) {
      backdrop.addEventListener('click', () => {
        if (!downloadBtn.disabled) closeModal();
      });
    }
  }

  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    let revealIndex = 0;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const delay = Math.min(revealIndex, 6) * 35;
            revealIndex += 1;
            if (delay) {
              setTimeout(() => e.target.classList.add('visible'), delay);
            } else {
              e.target.classList.add('visible');
            }
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => obs.observe(el));
  }

  /* Career application — success popup */
  const careerForm = document.getElementById('careerForm');
  const careerModal = document.getElementById('careerModal');
  if (careerForm && careerModal) {
    const careerBackdrop = document.getElementById('careerModalBackdrop');
    const careerCloseBtn = document.getElementById('careerModalClose');
    const careerMessage = document.getElementById('careerModalMessage');
    const careerSubmitBtn = document.getElementById('careerSubmit');
    const fileInput = document.getElementById('careerResume');
    const uploadZone = document.getElementById('careerUploadZone');
    const fileNameEl = document.getElementById('careerFileName');

    function setFileDisplay(file) {
      if (!uploadZone || !fileNameEl) return;
      if (file) {
        uploadZone.classList.add('has-file');
        fileNameEl.textContent = file.name;
      } else {
        uploadZone.classList.remove('has-file');
        fileNameEl.textContent = '';
      }
    }

    if (fileInput && uploadZone) {
      fileInput.addEventListener('change', () => {
        setFileDisplay(fileInput.files && fileInput.files[0] ? fileInput.files[0] : null);
      });
      uploadZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadZone.classList.add('is-dragover');
      });
      uploadZone.addEventListener('dragleave', () => uploadZone.classList.remove('is-dragover'));
      uploadZone.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadZone.classList.remove('is-dragover');
        if (e.dataTransfer.files.length) {
          fileInput.files = e.dataTransfer.files;
          setFileDisplay(fileInput.files[0]);
        }
      });
    }

    function openCareerModal(firstName, job) {
      if (!careerMessage) return;
      const name = firstName ? `, ${firstName}` : '';
      const role = job ? ` for the ${job} role` : '';
      careerMessage.textContent = `Thank you${name}! Your application${role} has been received. Our HR team will review your profile and get in touch soon.`;
      careerModal.classList.add('open');
      careerModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      if (careerCloseBtn) careerCloseBtn.focus();
    }

    function closeCareerModal() {
      careerModal.classList.remove('open');
      careerModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    careerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!careerForm.checkValidity()) {
        careerForm.reportValidity();
        return;
      }

      const firstName = careerForm.querySelector('[name="firstName"]')?.value.trim() || '';
      const jobSelect = careerForm.querySelector('[name="job"]');
      const job = jobSelect && jobSelect.value ? jobSelect.options[jobSelect.selectedIndex].text : '';
      const submitLabel = careerSubmitBtn ? careerSubmitBtn.innerHTML : '';

      if (careerSubmitBtn) {
        careerSubmitBtn.disabled = true;
        careerSubmitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin" aria-hidden="true"></i> Submitting...';
      }

      setTimeout(() => {
        careerForm.reset();
        setFileDisplay(null);
        if (jobSelect) {
          jobSelect.selectedIndex = 0;
          updateJobTriggerLabel();
        }
        closeJobPanel();
        if (careerSubmitBtn) {
          careerSubmitBtn.disabled = false;
          careerSubmitBtn.innerHTML = submitLabel;
        }
        openCareerModal(firstName, job);
      }, 500);
    });

    if (careerCloseBtn) careerCloseBtn.addEventListener('click', closeCareerModal);
    if (careerBackdrop) careerBackdrop.addEventListener('click', closeCareerModal);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && careerModal.classList.contains('open')) closeCareerModal();
    });

    /* Mobile job picker — keeps dropdown inside screen on small devices */
    const jobSelect = document.getElementById('careerJob');
    const jobPicker = document.getElementById('careerJobPicker');
    const jobField = jobPicker ? jobPicker.closest('.career-field--job') : null;
    const jobMq = window.matchMedia('(max-width: 768px)');
    let jobTrigger = null;
    let jobPanel = null;

    function getJobPlaceholder() {
      const first = jobSelect.options[0];
      return first && first.disabled ? first.text : 'Select a position';
    }

    function updateJobTriggerLabel() {
      if (!jobTrigger) return;
      const span = jobTrigger.querySelector('span');
      const opt = jobSelect.options[jobSelect.selectedIndex];
      if (opt && opt.value) {
        span.textContent = opt.text;
        jobTrigger.classList.remove('is-placeholder');
      } else {
        span.textContent = getJobPlaceholder();
        jobTrigger.classList.add('is-placeholder');
      }
      if (jobPanel) {
        jobPanel.querySelectorAll('.career-job-panel__option').forEach((btn) => {
          btn.classList.toggle('is-selected', btn.dataset.value === jobSelect.value);
        });
      }
    }

    function closeJobPanel() {
      if (!jobPanel || !jobTrigger) return;
      jobPanel.hidden = true;
      jobTrigger.setAttribute('aria-expanded', 'false');
    }

    function openJobPanel() {
      if (!jobPanel || !jobTrigger) return;
      jobPanel.hidden = false;
      jobTrigger.setAttribute('aria-expanded', 'true');
    }

    function closeJobPanelOnOutside(e) {
      if (!jobPanel || jobPanel.hidden) return;
      if (jobPicker && !jobPicker.contains(e.target)) closeJobPanel();
    }

    function closeJobPanelOnEscape(e) {
      if (e.key === 'Escape' && jobPanel && !jobPanel.hidden) closeJobPanel();
    }

    function destroyMobileJobPicker() {
      closeJobPanel();
      document.removeEventListener('click', closeJobPanelOnOutside);
      document.removeEventListener('keydown', closeJobPanelOnEscape);
      if (jobTrigger) jobTrigger.remove();
      if (jobPanel) jobPanel.remove();
      jobTrigger = null;
      jobPanel = null;
      if (jobField) jobField.classList.remove('career-field--job-mobile');
    }

    function buildMobileJobPicker() {
      if (!jobSelect || !jobField || jobTrigger) return;
      jobField.classList.add('career-field--job-mobile');

      jobTrigger = document.createElement('button');
      jobTrigger.type = 'button';
      jobTrigger.className = 'career-job-trigger is-placeholder';
      jobTrigger.id = 'careerJobTrigger';
      jobTrigger.setAttribute('aria-haspopup', 'listbox');
      jobTrigger.setAttribute('aria-expanded', 'false');
      jobTrigger.setAttribute('aria-labelledby', 'careerJobLabel');
      jobTrigger.innerHTML =
        '<i class="fa-solid fa-briefcase" aria-hidden="true"></i>' +
        '<span></span>' +
        '<i class="fa-solid fa-chevron-down career-job-trigger__chevron" aria-hidden="true"></i>';

      jobPanel = document.createElement('div');
      jobPanel.className = 'career-job-panel';
      jobPanel.id = 'careerJobPanel';
      jobPanel.setAttribute('role', 'listbox');
      jobPanel.hidden = true;

      Array.from(jobSelect.children).forEach((child) => {
        if (child.tagName === 'OPTGROUP') {
          const group = document.createElement('div');
          group.className = 'career-job-panel__group';
          const label = document.createElement('p');
          label.className = 'career-job-panel__label';
          label.textContent = child.label;
          group.appendChild(label);
          Array.from(child.children).forEach((opt) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'career-job-panel__option';
            btn.textContent = opt.text;
            btn.dataset.value = opt.value;
            btn.setAttribute('role', 'option');
            btn.addEventListener('click', () => {
              jobSelect.value = opt.value;
              updateJobTriggerLabel();
              closeJobPanel();
              jobSelect.dispatchEvent(new Event('change', { bubbles: true }));
            });
            group.appendChild(btn);
          });
          jobPanel.appendChild(group);
        }
      });

      jobTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        if (jobPanel.hidden) openJobPanel();
        else closeJobPanel();
      });

      jobPicker.appendChild(jobTrigger);
      jobPicker.appendChild(jobPanel);
      updateJobTriggerLabel();

      document.addEventListener('click', closeJobPanelOnOutside);
      document.addEventListener('keydown', closeJobPanelOnEscape);
    }

    function syncJobPickerMode() {
      if (jobMq.matches) buildMobileJobPicker();
      else destroyMobileJobPicker();
    }

    if (jobSelect && jobField) {
      const label = jobField.querySelector('label');
      if (label) label.id = 'careerJobLabel';
      jobMq.addEventListener('change', syncJobPickerMode);
      syncJobPickerMode();
      jobSelect.addEventListener('change', updateJobTriggerLabel);
    }
  }

  /* Contact form — success popup */
  const contactForm = document.getElementById('contactForm');
  const contactModal = document.getElementById('contactModal');
  if (contactForm && contactModal) {
    const contactBackdrop = document.getElementById('contactModalBackdrop');
    const contactCloseBtn = document.getElementById('contactModalClose');
    const contactMessage = document.getElementById('contactModalMessage');
    const contactSubmitBtn = document.getElementById('contactSubmit');

    function openContactModal(name) {
      if (contactMessage) {
        contactMessage.textContent = name
          ? `Thank you, ${name}! Your message has been received. Our team will get back to you shortly.`
          : 'Thank you! Your message has been received. Our team will get back to you shortly.';
      }
      contactModal.classList.add('open');
      contactModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      if (contactCloseBtn) contactCloseBtn.focus();
    }

    function closeContactModal() {
      contactModal.classList.remove('open');
      contactModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      const name = contactForm.querySelector('[name="name"]')?.value.trim() || '';
      const submitLabel = contactSubmitBtn ? contactSubmitBtn.textContent : '';

      if (contactSubmitBtn) {
        contactSubmitBtn.disabled = true;
        contactSubmitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin" aria-hidden="true"></i> Sending...';
      }

      setTimeout(() => {
        contactForm.reset();
        if (contactSubmitBtn) {
          contactSubmitBtn.disabled = false;
          contactSubmitBtn.textContent = submitLabel;
        }
        openContactModal(name);
      }, 600);
    });

    if (contactCloseBtn) contactCloseBtn.addEventListener('click', closeContactModal);
    if (contactBackdrop) contactBackdrop.addEventListener('click', closeContactModal);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && contactModal.classList.contains('open')) closeContactModal();
    });
  }

  /* Floating Free Site Visit — all subpages except Contact */
  (function initFloatSiteVisit() {
    const page = (window.location.pathname.split('/').pop() || '').toLowerCase();
    if (page === 'contactus.html' || page === 'career.html' || page === 'terms.html' || page === 'privacy.html' || page === 'projects.html') return;

    const inSancity = /\/sancity\//i.test(window.location.pathname);
    const visitHref = inSancity ? '../index.html#visit' : 'index.html#visit';

    if (document.getElementById('floatSiteVisit')) return;

    const link = document.createElement('a');
    link.id = 'floatSiteVisit';
    link.className = 'float-site-visit';
    link.href = visitHref;
    link.setAttribute('aria-label', 'Book a free site visit from San City');
    link.innerHTML = `
      <span class="float-site-visit__badge">From Us</span>
      <span class="float-site-visit__label">Free Site Visit</span>
    `;
    document.body.appendChild(link);
  })();
})();
