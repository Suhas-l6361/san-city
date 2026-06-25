/* San City — Projects showcase & detail modal */
(function () {
  const PROJECTS = [
    {
      name: 'San City New Town',
      status: 'completed',
      city: 'Mysore',
      region: 'Mysore',
      location: 'Mysore District',
      size: '205 Plots',
      highlights: ['DC Converted', 'DTCP Approved', 'Club-House', 'Swimming Pool'],
    },
    {
      name: 'San City Kaveri',
      status: 'completed',
      city: 'Mysore',
      region: 'Mysore',
      location: 'Mysore District',
      size: 'Est. 10,000 Plots',
      highlights: ['DC Converted', 'DTCP Approved', 'Fully Developed'],
    },
    {
      name: 'San City Rachana',
      status: 'completed',
      city: 'Mysore',
      region: 'Mysore',
      location: 'Mysore District',
      size: '150+ Plots',
      highlights: ['DC Converted', 'DTCP Approved', 'Club-House', 'Indoor Games', 'Swimming Pool'],
    },
    {
      name: 'Wonder Woods',
      status: 'completed',
      city: 'Bangalore',
      region: 'Bangalore',
      location: 'Bangalore District',
      size: '480 Plots',
      highlights: ['BMRDA Approved', 'DC Converted', 'DTCP Approved'],
    },
    {
      name: 'San City Kalpatharu',
      status: 'completed',
      city: 'Chikkaballapur',
      region: 'Chikkaballapur',
      location: 'Chikkaballapur District',
      size: '385 Plots',
      highlights: ['DC Converted', 'DTCP Approved', 'Fully Developed', 'World-Class Amenities'],
    },
    {
      name: 'San City Kamal Enclave',
      status: 'completed',
      city: 'Mysore',
      region: 'Mysore',
      location: 'Mysore District',
      size: '100+ Plots',
      highlights: ['DC Converted', 'DTCP Approved', 'Fully Developed', 'Basic Amenities'],
    },
    {
      name: 'San City Orchid',
      status: 'ongoing',
      city: 'Tumkur',
      region: 'Tumkur',
      location: 'Tumkur District',
      size: '600 Plots',
      highlights: ['DTCP Approved', 'DC Converted'],
    },
    {
      name: 'San City Prakruthi',
      status: 'completed',
      city: 'Chikkaballapur',
      region: 'Chikkaballapur',
      location: 'Chikkaballapur District',
      size: '160+ Plots',
      highlights: ['DC Converted', 'DTCP Approved'],
    },
    {
      name: 'San City Gardenia',
      status: 'ongoing',
      city: 'Chikkaballapur',
      region: 'Chikkaballapur',
      location: 'Chikkaballapur District',
      size: '160+ Plots',
      highlights: ['DC Converted', 'DTCP Approved'],
    },
    {
      name: 'San City Grand',
      status: 'ongoing',
      city: 'Chikkaballapur',
      region: 'Chikkaballapur',
      location: 'Chikkaballapur District',
      size: 'Under Development',
      highlights: ['DC Converted', 'DTCP Approved'],
    },
    {
      name: 'San City Gold',
      status: 'completed',
      city: 'Gowribidanur',
      region: 'Gowribidanur',
      location: 'Chikkaballapur District',
      size: '2300+ Plots',
      highlights: ['Fully Developed'],
    },
    {
      name: 'San City Bhoomi',
      status: 'ongoing',
      city: 'Mysore',
      region: 'Mysore',
      location: 'Mysore District',
      size: '2300+ Plots',
      highlights: ['DTCP Approved', 'DC Converted'],
    },
  ];

  const STATUS_LABELS = { completed: 'Completed', ongoing: 'Ongoing' };

  const showcase = document.getElementById('projectsShowcase');
  const filtersEl = document.getElementById('projectsFilters');
  const citySelect = document.getElementById('projectsCitySelect');
  const emptyEl = document.getElementById('projectsEmpty');
  const modal = document.getElementById('projectModal');
  if (!showcase || !modal) return;

  const backdrop = document.getElementById('projectModalBackdrop');
  const closeBtn = document.getElementById('projectModalClose');
  const prevBtn = document.getElementById('projectModalPrev');
  const nextBtn = document.getElementById('projectModalNext');
  const imgEl = document.getElementById('projectModalImg');
  const counterEl = document.getElementById('projectModalCounter');
  const eyebrowEl = document.getElementById('projectModalEyebrow');
  const statusEl = document.getElementById('projectModalStatus');
  const titleEl = document.getElementById('projectModalTitle');
  const locationEl = document.getElementById('projectModalLocation');
  const sizeEl = document.getElementById('projectModalSize');
  const tagsEl = document.getElementById('projectModalTags');

  let currentIndex = 0;
  let activeStatus = 'all';
  let activeCity = 'all';

  const completedCount = PROJECTS.filter((p) => p.status === 'completed').length;
  const ongoingCount = PROJECTS.filter((p) => p.status === 'ongoing').length;

  const CITIES = [...new Set(PROJECTS.map((p) => p.city))].sort((a, b) => a.localeCompare(b));

  function padNum(n) {
    return String(n).padStart(2, '0');
  }

  function cardImage(i) {
    return `../images/p${i + 1}.jpg`;
  }

  function detailImage(i) {
    return `../images/pp${i + 1}.jpg`;
  }

  function projectSlug(name) {
    return 'project-' + name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }

  function resetFiltersForDeepLink() {
    activeStatus = 'all';
    activeCity = 'all';
    if (citySelect) citySelect.value = 'all';
    renderStatusFilters();
    applyFilter();
  }

  function highlightProjectRow(row) {
    if (!row) return;
    row.classList.remove('is-targeted');
    void row.offsetWidth;
    row.classList.add('is-targeted');
    window.setTimeout(() => row.classList.remove('is-targeted'), 2400);
  }

  function focusProjectFromHash() {
    const id = window.location.hash.replace(/^#/, '');
    if (!id) return;

    if (id === 'projects-catalog') {
      document.getElementById('projects-catalog')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    const row = document.getElementById(id);
    if (!row || !row.classList.contains('proj-row')) return;

    resetFiltersForDeepLink();

    window.requestAnimationFrame(() => {
      window.setTimeout(() => {
        row.scrollIntoView({ behavior: 'smooth', block: 'center' });
        highlightProjectRow(row);
      }, 80);
    });
  }

  function projectMatchesFilters(project) {
    const statusOk = activeStatus === 'all' || project.status === activeStatus;
    const cityOk = activeCity === 'all' || project.city === activeCity;
    return statusOk && cityOk;
  }

  function getVisibleIndices() {
    return PROJECTS.map((p, i) => (projectMatchesFilters(p) ? i : -1)).filter((i) => i >= 0);
  }

  function observeReveal(root) {
    const els = root.querySelectorAll('.reveal');
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );
    els.forEach((el) => obs.observe(el));
  }

  function renderCitySelect() {
    if (!citySelect) return;
    const options = CITIES.map((city) => {
      const count = PROJECTS.filter((p) => p.city === city).length;
      return `<option value="${city}">${city} (${count})</option>`;
    }).join('');
    citySelect.innerHTML = `<option value="all">All Cities (${PROJECTS.length})</option>${options}`;
    citySelect.value = activeCity;

    citySelect.addEventListener('change', () => {
      activeCity = citySelect.value;
      applyFilter();
    });
  }

  function renderStatusFilters() {
    if (!filtersEl) return;
    const tabs = [
      { id: 'all', label: 'All Projects', count: PROJECTS.length, icon: 'fa-layer-group' },
      { id: 'completed', label: 'Completed', count: completedCount, icon: 'fa-circle-check' },
      { id: 'ongoing', label: 'Ongoing', count: ongoingCount, icon: 'fa-helmet-safety' },
    ];

    filtersEl.innerHTML = tabs
      .map((tab) => {
        const active = tab.id === activeStatus ? ' is-active' : '';
        return `<button type="button" class="projects-status-tab${active}" data-filter="${tab.id}" role="tab" aria-selected="${tab.id === activeStatus}">
          <i class="fa-solid ${tab.icon}" aria-hidden="true"></i>
          <span>${tab.label}</span>
          <em>${tab.count}</em>
        </button>`;
      })
      .join('');

    filtersEl.querySelectorAll('.projects-status-tab').forEach((btn) => {
      btn.addEventListener('click', () => {
        activeStatus = btn.dataset.filter;
        filtersEl.querySelectorAll('.projects-status-tab').forEach((b) => {
          const on = b === btn;
          b.classList.toggle('is-active', on);
          b.setAttribute('aria-selected', on ? 'true' : 'false');
        });
        applyFilter();
      });
    });
  }

  function applyFilter() {
    let visibleCount = 0;
    showcase.querySelectorAll('.proj-row').forEach((row) => {
      const status = row.dataset.status;
      const city = row.dataset.city;
      const statusOk = activeStatus === 'all' || status === activeStatus;
      const cityOk = activeCity === 'all' || city === activeCity;
      const hidden = !(statusOk && cityOk);
      row.classList.toggle('is-hidden', hidden);
      if (!hidden) visibleCount += 1;
    });
    if (emptyEl) emptyEl.hidden = visibleCount > 0;
  }

  function renderShowcase() {
    showcase.innerHTML = PROJECTS.map((project, i) => {
      const num = padNum(i + 1);
      const flip = i % 2 === 1 ? ' proj-row--flip' : '';
      const statusLabel = STATUS_LABELS[project.status];
      const chips = project.highlights
        .slice(0, 3)
        .map((tag) => `<span class="proj-row__chip">${tag}</span>`)
        .join('');

      return `
        <article class="proj-row reveal${flip}" id="${projectSlug(project.name)}" data-index="${i}" data-status="${project.status}" data-city="${project.city}">
          <div class="proj-row__btn">
            <button type="button" class="proj-row__visual-btn" aria-label="View details for ${project.name}">
              <div class="proj-row__visual">
                <img src="${cardImage(i)}" alt="${project.name}" loading="lazy" width="720" height="440" />
                <span class="proj-row__num" aria-hidden="true">${num}</span>
                <span class="proj-row__status proj-row__status--${project.status}">${statusLabel}</span>
              </div>
            </button>
            <div class="proj-row__panel">
              <span class="proj-row__region">${project.city}</span>
              <h3>${project.name}</h3>
              <div class="proj-row__meta">
                <span><i class="fa-solid fa-location-dot" aria-hidden="true"></i>${project.location}</span>
                <span><i class="fa-solid fa-chart-area" aria-hidden="true"></i>${project.size}</span>
              </div>
              <div class="proj-row__chips">${chips}</div>
              <div class="proj-row__actions">
                <button type="button" class="proj-row__cta">View Project <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></button>
                <a href="../index.html#visit" class="proj-row__visit">Free Site Visit</a>
              </div>
            </div>
          </div>
        </article>
      `;
    }).join('');

    showcase.querySelectorAll('.proj-row').forEach((row) => {
      const index = Number(row.dataset.index);
      const openProject = () => openModal(index);

      row.querySelector('.proj-row__visual-btn')?.addEventListener('click', openProject);
      row.querySelector('.proj-row__cta')?.addEventListener('click', (e) => {
        e.preventDefault();
        openProject();
      });
    });

    observeReveal(showcase);
  }

  function updateNavState() {
    const visible = getVisibleIndices();
    const pos = visible.indexOf(currentIndex);
    prevBtn.disabled = pos <= 0;
    nextBtn.disabled = pos >= visible.length - 1;
    counterEl.textContent = `${padNum(pos + 1)} / ${padNum(visible.length)}`;
  }

  function renderModal(index) {
    const project = PROJECTS[index];
    if (!project) return;

    currentIndex = index;
    imgEl.src = detailImage(index);
    imgEl.alt = `${project.name} — project brochure`;
    eyebrowEl.textContent = `Project ${padNum(index + 1)} · ${project.city}`;
    statusEl.textContent = STATUS_LABELS[project.status];
    statusEl.className = `project-modal__status project-modal__status--${project.status}`;
    titleEl.textContent = project.name;
    locationEl.textContent = project.location;
    sizeEl.textContent = project.size;
    tagsEl.innerHTML = project.highlights
      .map((tag) => `<span class="project-modal__tag">${tag}</span>`)
      .join('');

    updateNavState();
    const frame = modal.querySelector('.project-modal__img-frame');
    if (frame) frame.scrollTop = 0;
  }

  function openModal(index) {
    renderModal(index);
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    const frame = modal.querySelector('.project-modal__img-frame');
    if (frame) frame.scrollTop = 0;
    closeBtn.focus();
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function goPrev() {
    const visible = getVisibleIndices();
    const pos = visible.indexOf(currentIndex);
    if (pos > 0) renderModal(visible[pos - 1]);
  }

  function goNext() {
    const visible = getVisibleIndices();
    const pos = visible.indexOf(currentIndex);
    if (pos < visible.length - 1) renderModal(visible[pos + 1]);
  }

  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);
  prevBtn.addEventListener('click', goPrev);
  nextBtn.addEventListener('click', goNext);

  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('open')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') goPrev();
    if (e.key === 'ArrowRight') goNext();
  });

  renderCitySelect();
  renderStatusFilters();
  renderShowcase();

  window.addEventListener('hashchange', focusProjectFromHash);
  if (window.location.hash) {
    window.requestAnimationFrame(() => window.setTimeout(focusProjectFromHash, 120));
  }
})();
