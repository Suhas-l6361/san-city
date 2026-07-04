/* San City — Projects showcase & detail modal */
(function () {
  const HIGHLIGHTS = {
    standard: ['DC Converted', 'DTCP Approved'],
    ekatha: ['DC Converted', 'DTCP Approved', 'E-Katha'],
    reraApplied: ['DC Converted', 'DTCP Approved', 'RERA Applied'],
    reraApproved: ['DC Converted', 'DTCP Approved', 'RERA Approved'],
  };

  const PROJECTS = [
    {
      name: 'San City New Town',
      status: 'completed',
      city: 'Mysore',
      region: 'Mysore',
      location: 'Mysore District',
      size: '205 Plots',
      highlights: HIGHLIGHTS.standard,
      imageSlot: 1,
    },
    {
      name: 'San City Kaveri',
      status: 'ongoing',
      city: 'Mysore',
      region: 'Mysore',
      location: 'Mysore District',
      size: 'Est. 10,000 Plots',
      highlights: HIGHLIGHTS.standard,
      imageSlot: 2,
    },
    {
      name: 'San City Rachana',
      status: 'completed',
      city: 'Mysore',
      region: 'Mysore',
      location: 'Mysore District',
      size: '150+ Plots',
      highlights: HIGHLIGHTS.standard,
      imageSlot: 3,
    },
    {
      name: 'Wonder Woods',
      status: 'completed',
      city: 'Bangalore',
      region: 'Bangalore',
      location: 'Bangalore District',
      size: '480 Plots',
      highlights: HIGHLIGHTS.standard,
      imageSlot: 4,
    },
    {
      name: 'San City Kalpatharu',
      status: 'completed',
      city: 'Chikkaballapur',
      region: 'Chikkaballapur',
      location: 'Chikkaballapur District',
      size: '385 Plots',
      highlights: HIGHLIGHTS.reraApproved,
      imageSlot: 5,
    },
    {
      name: 'San City Kamal Enclave',
      status: 'completed',
      city: 'Mysore',
      region: 'Mysore',
      location: 'Mysore District',
      size: '100+ Plots',
      highlights: HIGHLIGHTS.standard,
      imageSlot: 6,
    },
    {
      name: 'San City Orchid',
      status: 'completed',
      city: 'Tumkur',
      region: 'Tumkur',
      location: 'Tumkur District',
      size: '600 Plots',
      highlights: HIGHLIGHTS.standard,
      imageSlot: 7,
    },
    {
      name: 'San City Prakruthi',
      status: 'completed',
      city: 'Chikkaballapur',
      region: 'Chikkaballapur',
      location: 'Chikkaballapur District',
      size: '160+ Plots',
      highlights: HIGHLIGHTS.standard,
      imageSlot: 8,
    },
    {
      name: 'San City Gardenia',
      status: 'completed',
      city: 'Chikkaballapur',
      region: 'Chikkaballapur',
      location: 'Chikkaballapur District',
      size: '160+ Plots',
      highlights: HIGHLIGHTS.standard,
      imageSlot: 9,
    },
    {
      name: 'San City Grand',
      status: 'completed',
      city: 'Chikkaballapur',
      region: 'Chikkaballapur',
      location: 'Chikkaballapur District',
      size: 'Under Development',
      highlights: HIGHLIGHTS.standard,
      imageSlot: 10,
    },
    {
      name: 'San City Gold',
      status: 'completed',
      city: 'Gowribidanur',
      region: 'Gowribidanur',
      location: 'Chikkaballapur District',
      size: '2300+ Plots',
      highlights: HIGHLIGHTS.standard,
      imageSlot: 11,
    },
    {
      name: 'San City Vc Gallexy',
      status: 'ongoing',
      city: 'Mysore',
      region: 'Mysore',
      location: 'Mysore District',
      size: 'Details coming soon',
      highlights: HIGHLIGHTS.reraApplied,
      cardImage: '../images/VC Gallexy Logo.png',
    },
    {
      name: 'San City Bhoomi',
      status: 'completed',
      city: 'Mysore',
      region: 'Mysore',
      location: 'Mysore District',
      size: '2300+ Plots',
      highlights: HIGHLIGHTS.standard,
      imageSlot: 12,
    },
    {
      name: 'San City Blue Bell',
      status: 'completed',
      city: 'Mysore',
      region: 'Mysore',
      location: 'Mysore District',
      size: 'Details coming soon',
      highlights: HIGHLIGHTS.standard,
      cardImage: '../images/bluebell.png',
    },
    {
      name: 'San City Comfort',
      status: 'completed',
      city: 'Mysore',
      region: 'Mysore',
      location: 'Mysore District',
      size: 'Details coming soon',
      highlights: HIGHLIGHTS.standard,
      cardImage: '../images/comfort.png',
    },
    {
      name: 'San City Diamond',
      status: 'ongoing',
      city: 'Mysore',
      region: 'Mysore',
      location: 'Mysore District',
      size: 'Details coming soon',
      highlights: HIGHLIGHTS.standard,
      cardImage: '../images/sancity diamond.png',
    },
    {
      name: 'San City Disha',
      status: 'completed',
      city: 'Bangalore',
      region: 'Bangalore',
      location: 'Bangalore District',
      size: 'Details coming soon',
      highlights: HIGHLIGHTS.standard,
      cardImage: '../images/disha.png',
    },
    {
      name: 'San City Lake View',
      status: 'completed',
      city: 'Mysore',
      region: 'Mysore',
      location: 'Mysore District',
      size: 'Details coming soon',
      highlights: HIGHLIGHTS.standard,
      cardImage: '../images/lake view.png',
    },
    {
      name: 'San City Prerana',
      status: 'completed',
      city: 'Mysore',
      region: 'Mysore',
      location: 'Mysore District',
      size: 'Details coming soon',
      highlights: HIGHLIGHTS.standard,
      cardImage: '../images/prerana.png',
    },
    {
      name: 'San City Sky City',
      status: 'completed',
      city: 'Mysore',
      region: 'Mysore',
      location: 'Mysore District',
      size: 'Details coming soon',
      highlights: HIGHLIGHTS.standard,
      cardImage: '../images/skycity.png',
    },
    {
      name: 'San City Sun Flower',
      status: 'completed',
      city: 'Mysore',
      region: 'Mysore',
      location: 'Mysore District',
      size: 'Details coming soon',
      highlights: HIGHLIGHTS.standard,
      cardImage: '../images/sunflower.png',
    },
    {
      name: 'San City Wapour',
      status: 'completed',
      city: 'Mysore',
      region: 'Mysore',
      location: 'Mysore District',
      size: 'Details coming soon',
      highlights: HIGHLIGHTS.standard,
    },
    {
      name: 'San City Elegance',
      status: 'completed',
      city: 'Mysore',
      region: 'Mysore',
      location: 'Mysore District',
      size: 'Details coming soon',
      highlights: HIGHLIGHTS.standard,
    },
    {
      name: 'San City Fortune',
      status: 'completed',
      city: 'Karnataka',
      region: 'Karnataka',
      location: 'Karnataka',
      size: 'Details coming soon',
      highlights: HIGHLIGHTS.standard,
    },
    {
      name: 'San City Green',
      status: 'completed',
      city: 'Mysore',
      region: 'Mysore',
      location: 'Mysore District',
      size: 'Details coming soon',
      highlights: HIGHLIGHTS.standard,
    },
    {
      name: 'San City Nature',
      status: 'completed',
      city: 'Mysore',
      region: 'Mysore',
      location: 'Mysore District',
      size: 'Details coming soon',
      highlights: HIGHLIGHTS.standard,
    },
    {
      name: 'San City Pride',
      status: 'completed',
      city: 'Bangalore',
      region: 'Bangalore',
      location: 'Bangalore District',
      size: 'Details coming soon',
      highlights: HIGHLIGHTS.standard,
    },
    {
      name: 'San City Silver Shine',
      status: 'completed',
      city: 'Mysore',
      region: 'Mysore',
      location: 'Mysore District',
      size: 'Details coming soon',
      highlights: HIGHLIGHTS.standard,
    },
    {
      name: 'San City Sun Shine',
      status: 'completed',
      city: 'Ramanagara',
      region: 'Ramanagara',
      location: 'Ramanagara District',
      size: 'Details coming soon',
      highlights: HIGHLIGHTS.ekatha,
    },
    {
      name: 'San City MCC',
      status: 'ongoing',
      city: 'Chikkaballapur',
      region: 'Chikkaballapur',
      location: 'Chikkaballapur District',
      size: 'Details coming soon',
      highlights: HIGHLIGHTS.ekatha,
    },
    {
      name: 'San City Violet',
      status: 'completed',
      city: 'Mysore',
      region: 'Mysore',
      location: 'Mysore District',
      size: 'Details coming soon',
      highlights: HIGHLIGHTS.standard,
    },
    {
      name: 'San City White Lotus',
      status: 'completed',
      city: 'Mysore',
      region: 'Mysore',
      location: 'Mysore District',
      size: 'Details coming soon',
      highlights: HIGHLIGHTS.standard,
    },
  ];

  const STATUS_LABELS = { completed: 'Completed', ongoing: 'Ongoing' };

  function padNum(n) {
    return String(n).padStart(2, '0');
  }

  function hasArchCardImage(project) {
    return !!(project.cardImage || project.imageSlot);
  }

  function archCardImage(project) {
    if (project.cardImage) return encodeImagePath(project.cardImage);
    if (project.imageSlot) return encodeImagePath(`../images/p${project.imageSlot}.jpg`);
    return null;
  }

  function cardImage(project) {
    return archCardImage(project);
  }

  function mapCardCandidates(project) {
    if (hasArchCardImage(project)) return [];
    if (!projectHasLayoutMaps(project)) return [];
    const groups = getMapCandidateGroups(project);
    return groups[0] || [];
  }

  const cardThumbCache = new Map();

  async function resolveListCardThumb(project, index) {
    const arch = archCardImage(project);
    if (arch) return arch;
    const candidates = mapCardCandidates(project);
    for (const src of candidates) {
      if (await probeImageUrl(src)) return src;
    }
    return null;
  }

  async function warmListCardThumbs() {
    await Promise.all(
      PROJECTS.map(async (project, index) => {
        const thumb = await resolveListCardThumb(project, index);
        if (thumb) cardThumbCache.set(index, thumb);
      })
    );
  }

  function listCardImage(project, index) {
    const arch = archCardImage(project);
    if (arch) return arch;
    return cardThumbCache.get(index) || null;
  }

  /** Map file prefix(es) — probes `{prefix} map.png` + `{prefix} map2.jpg` (and ext variants). */
  const MAP_PREFIX_CANDIDATES_BY_PROJECT = {
    'San City New Town': ['New Town', 'new town', 'san sity'],
    'San City Kaveri': ['Kaveri', 'kaveri'],
    'San City Rachana': ['Rachana', 'rachana'],
    'Wonder Woods': ['Wonder Wood', 'Wonder Woods', 'wonder wood'],
    'San City Kalpatharu': ['Kalapataru', 'Kalpatharu', 'kalapataru'],
    'San City Kamal Enclave': ['Kamal Enclave'],
    'San City Orchid': ['Orchid'],
    'San City Prakruthi': ['Prakruthi', 'prakruthi'],
    'San City Gardenia': ['Gardenia', 'gardenia'],
    'San City Grand': ['Grand', 'grand'],
    'San City Gold': ['Gold', 'gold'],
    'San City Vc Gallexy': ['vc galaxy', 'VC Gallexy', 'Vc Gallexy'],
    'San City Bhoomi': ['Bhoomi', 'bhoomi'],
    'San City Blue Bell': ['Blue Bell', 'bluebell'],
    'San City Comfort': ['comfort', 'Comfort'],
    'San City Diamond': ['sancity diamond', 'diamond', 'Diamond'],
    'San City Disha': ['Disha', 'disha', 'Deesha', 'deesha'],
    'San City Lake View': ['lake view', 'Lake View', 'lakeview'],
    'San City Prerana': ['prerana', 'Prerana'],
    'San City Sky City': ['sky city', 'Sky City', 'skycity'],
    'San City Sun Flower': ['sun flower', 'Sun Flower', 'sunflower'],
    'San City Wapour': ['Vapour'],
    'San City Violet': ['Voilet'],
    'San City Elegance': ['Elegance'],
    'San City Fortune': ['Fortune'],
    'San City Green': ['Green'],
    'San City Nature': ['Nature'],
    'San City Pride': ['Pride'],
    'San City Silver Shine': ['Silver'],
    'San City Sun Shine': ['Sun Shine', 'sun shine', 'sunshine'],
    'San City MCC': ['MCC', 'mcc'],
    'San City White Lotus': ['White Lotus'],
  };

  function getMapPrefixCandidates(project) {
    if (project.mapPrefix) return [project.mapPrefix];
    return MAP_PREFIX_CANDIDATES_BY_PROJECT[project.name] || [];
  }

  function buildMapSlotGroups(prefix) {
    return [
      MAP1_EXTENSIONS.map((ext) => mapFilePath(prefix, 1, ext)),
      MAP2_EXTENSIONS.map((ext) => mapFilePath(prefix, 2, ext)),
    ];
  }

  /** Modal shows map carousel only for these 8; all others use popup brochure images. */
  const MAP_ONLY_MODAL_PROJECTS = new Set([
    'San City Wapour',
    'San City Elegance',
    'San City Fortune',
    'San City Green',
    'San City Pride',
    'San City Silver Shine',
    'San City Violet',
    'San City White Lotus',
  ]);

  /** Filename stems (without extension) under Frontend/images/ — e.g. "kaveri popup.png". */
  const POPUP_STEMS_BY_PROJECT = {
    'San City New Town': ['san sity popup', 'new town popup', 'newtown popup'],
    'San City Kaveri': ['kaveri popup'],
    'San City Rachana': ['rachana popup'],
    'Wonder Woods': ['wonder wood popup', 'wonder woods popup'],
    'San City Kalpatharu': ['kalapataru popup', 'kalpatharu popup'],
    'San City Kamal Enclave': ['kamal enclave popup', 'kamal popup'],
    'San City Orchid': ['orchid popup', 'san city orchid popup'],
    'San City Prakruthi': ['prakruthi popup'],
    'San City Gardenia': ['gardenia popup'],
    'San City Grand': ['grand popup'],
    'San City Gold': ['gold popup'],
    'San City Vc Gallexy': ['vc galaxy popup', 'vc gallexy popup', 'VC Gallexy popup'],
    'San City Bhoomi': ['bhoomi popup'],
    'San City Blue Bell': ['blue bell popup'],
    'San City Comfort': ['comfort popup'],
    'San City Diamond': ['diamond popup', 'sancity diamond popup'],
    'San City Disha': ['disha popup', 'deesha popup'],
    'San City Lake View': ['lave view popup', 'lake view popup', 'lakeview popup'],
    'San City Prerana': ['prerana popup'],
    'San City Sky City': ['sky city popup', 'skycity popup'],
    'San City Sun Flower': ['sun flower popup', 'sunflower popup'],
    'San City Nature': ['nature popup'],
    'San City Sun Shine': ['sun shine popup', 'sunshine popup'],
    'San City MCC': ['mcc popup', 'MCC popup'],
  };

  const POPUP_EXTENSIONS = ['.png', '.jpg', '.jpeg'];
  const MAP1_EXTENSIONS = ['.png', '.jpg', '.jpeg'];
  const MAP2_EXTENSIONS = ['.jpg', '.jpeg', '.png'];

  function encodeImagePath(path) {
    if (!path) return path;
    return String(path).replace(/ /g, '%20');
  }

  function mapFilePath(prefix, slot, ext) {
    const label = slot === 2 ? ' map2' : ' map';
    return encodeImagePath(`../images/${prefix}${label}${ext}`);
  }

  function getMapCandidateGroups(project) {
    if (project.mapImages && project.mapImages.length) {
      return project.mapImages.map((path) => [encodeImagePath(path)]);
    }

    const prefixes = getMapPrefixCandidates(project);
    if (prefixes.length) return buildMapSlotGroups(prefixes[0]);

    const legacy = project.mapImage || project.detailImage;
    if (legacy) return [[encodeImagePath(legacy)]];

    if (project.cardImage) return [[encodeImagePath(project.cardImage)]];

    return [];
  }

  async function resolveMapSlotGroups(groups) {
    const resolved = [];
    for (const candidates of groups) {
      let found = null;
      for (const src of candidates) {
        if (await probeImageUrl(src)) {
          found = src;
          break;
        }
      }
      if (found) resolved.push(found);
      else break;
    }
    return resolved;
  }

  async function resolveMapsForProject(project) {
    if (project.mapImages && project.mapImages.length) {
      const resolved = [];
      for (const path of project.mapImages) {
        const src = encodeImagePath(path);
        if (await probeImageUrl(src)) resolved.push(src);
        else break;
      }
      if (resolved.length) return resolved;
    }

    for (const prefix of getMapPrefixCandidates(project)) {
      const resolved = await resolveMapSlotGroups(buildMapSlotGroups(prefix));
      if (resolved.length) return resolved;
    }

    const legacy = project.mapImage || project.detailImage;
    if (legacy) {
      const src = encodeImagePath(legacy);
      if (await probeImageUrl(src)) return [src];
    }

    return [];
  }

  function popupImageCandidates(project) {
    const stems = POPUP_STEMS_BY_PROJECT[project.name];
    if (!stems) return [];
    const out = [];
    for (const stem of stems) {
      for (const ext of POPUP_EXTENSIONS) {
        out.push(encodeImagePath(`../images/${stem}${ext}`));
      }
    }
    return out;
  }

  function projectUsesPopupModal(project) {
    return !MAP_ONLY_MODAL_PROJECTS.has(project.name) && !!POPUP_STEMS_BY_PROJECT[project.name];
  }

  async function resolvePopupImage(project) {
    for (const src of popupImageCandidates(project)) {
      if (await probeImageUrl(src)) return src;
    }
    return null;
  }

  function probeImageUrl(src) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = src;
    });
  }

  async function resolveMapImages(project) {
    if (projectUsesPopupModal(project)) {
      const popup = await resolvePopupImage(project);
      if (popup) return { images: [popup], source: 'popup' };
    }

    const maps = await resolveMapsForProject(project);
    if (maps.length) return { images: maps, source: 'map' };

    if (project.cardImage) {
      const src = encodeImagePath(project.cardImage);
      if (await probeImageUrl(src)) return { images: [src], source: 'popup' };
    }

    return { images: [], source: 'none' };
  }

  function projectHasLayoutMaps(project) {
    return !!(
      (project.mapImages && project.mapImages.length) ||
      project.mapImage ||
      project.detailImage ||
      getMapPrefixCandidates(project).length
    );
  }

  function detailImages(project) {
    let images = [];
    if (project.mapImages && project.mapImages.length) {
      images = project.mapImages.filter(Boolean);
    } else {
      const prefixes = getMapPrefixCandidates(project);
      if (prefixes.length) {
        images = [
          mapFilePath(prefixes[0], 1, '.png'),
          mapFilePath(prefixes[0], 2, '.jpg'),
        ];
      } else {
        const single = project.mapImage || project.detailImage;
        if (single) images = [single];
        else if (project.cardImage) images = [project.cardImage];
        else {
          const popupStems = POPUP_STEMS_BY_PROJECT[project.name];
          if (popupStems) images = popupStems.map((stem) => `../images/${stem}.png`);
        }
      }
    }
    return images.map(encodeImagePath);
  }

  function detailImage(project) {
    const images = detailImages(project);
    return images.length ? images[0] : null;
  }

  function projectSlug(name) {
    return 'project-' + name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }

  function heroImage(project) {
    const src = archCardImage(project);
    if (!src) return null;
    return src.replace(/^\.\.\//, '');
  }

  window.SanCityProjects = {
    PROJECTS,
    projectSlug,
    heroImage,
  };

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
  const imgEmptyEl = document.getElementById('projectModalImgEmpty');
  const mapNavEl = document.getElementById('projectModalMapNav');
  const mapPrevBtn = document.getElementById('projectModalMapPrev');
  const mapNextBtn = document.getElementById('projectModalMapNext');
  const mapCounterEl = document.getElementById('projectModalMapCounter');
  const counterEl = document.getElementById('projectModalCounter');
  const eyebrowEl = document.getElementById('projectModalEyebrow');
  const statusEl = document.getElementById('projectModalStatus');
  const titleEl = document.getElementById('projectModalTitle');
  const locationEl = document.getElementById('projectModalLocation');
  const sizeEl = document.getElementById('projectModalSize');
  const tagsEl = document.getElementById('projectModalTags');

  let currentIndex = 0;
  let modalMapIndex = 0;
  let modalImages = [];
  let modalImageSource = 'none';
  let modalRenderId = 0;
  let modalImageLoadId = 0;
  let activeStatus = 'all';
  let activeCity = 'all';

  const completedCount = PROJECTS.filter((p) => p.status === 'completed').length;
  const ongoingCount = PROJECTS.filter((p) => p.status === 'ongoing').length;

  const CITIES = [...new Set(PROJECTS.map((p) => p.city))].sort((a, b) => a.localeCompare(b));

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

      const cardSrc = listCardImage(project, i);
      const visualClass = cardSrc
        ? `proj-row__visual${hasArchCardImage(project) ? '' : ' proj-row__visual--map'}`
        : 'proj-row__visual proj-row__visual--empty';
      const visualImg = cardSrc
        ? `<img src="${cardSrc}" alt="${project.name}" loading="lazy" width="720" height="440" />`
        : '';

      return `
        <article class="proj-row reveal${flip}" id="${projectSlug(project.name)}" data-index="${i}" data-status="${project.status}" data-city="${project.city}">
          <div class="proj-row__btn">
            <button type="button" class="proj-row__visual-btn" aria-label="View details for ${project.name}">
              <div class="${visualClass}">
                ${visualImg}
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

  function setModalImageEmpty(show, variant) {
    const imgFrame = modal.querySelector('.project-modal__img-frame');
    if (imgEmptyEl) {
      const text =
        variant === 'missing-file'
          ? 'Map image not found. Check the file name in Frontend/images/.'
          : 'No image available for this project yet.';
      const icon = imgEmptyEl.querySelector('i');
      imgEmptyEl.textContent = '';
      if (icon) imgEmptyEl.appendChild(icon);
      imgEmptyEl.append(document.createTextNode(text));
    }
    if (show) {
      imgEl.removeAttribute('src');
      imgEl.alt = '';
      imgEl.classList.add('is-hidden');
      imgFrame?.classList.add('is-empty');
      if (imgEmptyEl) imgEmptyEl.hidden = false;
    } else {
      imgEl.classList.remove('is-hidden');
      imgFrame?.classList.remove('is-empty');
      if (imgEmptyEl) imgEmptyEl.hidden = true;
    }
  }

  function loadModalImage(src) {
    const loadId = ++modalImageLoadId;

    return new Promise((resolve) => {
      if (!src) {
        resolve(false);
        return;
      }

      const probe = new Image();
      probe.onload = () => {
        if (loadId !== modalImageLoadId) return;
        imgEl.src = src;
        imgEl.classList.remove('is-hidden');
        resolve(true);
      };
      probe.onerror = () => {
        if (loadId !== modalImageLoadId) return;
        resolve(false);
      };
      probe.src = src;
    });
  }

  function updateModalImageView(project) {
    const src = modalImages[modalMapIndex];
    const isMapView = modalImageSource === 'map' || MAP_ONLY_MODAL_PROJECTS.has(project.name);

    if (!src) {
      setModalImageEmpty(true, 'no-image');
      if (mapNavEl) mapNavEl.hidden = true;
      return;
    }

    loadModalImage(src).then((ok) => {
      if (ok) {
        setModalImageEmpty(false);
        if (isMapView && modalImages.length > 1) {
          imgEl.alt = `${project.name} — site map ${modalMapIndex + 1} of ${modalImages.length}`;
        } else if (isMapView) {
          imgEl.alt = `${project.name} — site map`;
        } else {
          imgEl.alt = `${project.name} — project brochure`;
        }
      } else {
        setModalImageEmpty(true, 'missing-file');
      }

      const showMapNav = modalImages.length > 1;
      if (mapNavEl) mapNavEl.hidden = !showMapNav;
      if (showMapNav && mapCounterEl) {
        mapCounterEl.textContent = `${padNum(modalMapIndex + 1)} / ${padNum(modalImages.length)}`;
      }
      if (mapPrevBtn) mapPrevBtn.disabled = modalMapIndex <= 0;
      if (mapNextBtn) mapNextBtn.disabled = modalMapIndex >= modalImages.length - 1;
    });
  }

  function renderModal(index) {
    const project = PROJECTS[index];
    if (!project) return;

    const renderId = ++modalRenderId;
    currentIndex = index;
    modalMapIndex = 0;
    modalImages = [];
    modalImageSource = 'none';
    setModalImageEmpty(true, 'no-image');
    if (mapNavEl) mapNavEl.hidden = true;

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

    resolveMapImages(project).then((resolved) => {
      if (renderId !== modalRenderId) return;
      modalImages = resolved.images;
      modalImageSource = resolved.source;
      modalMapIndex = 0;
      updateModalImageView(project);
    });
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

  function goMapPrev() {
    if (modalMapIndex <= 0) return;
    modalMapIndex -= 1;
    updateModalImageView(PROJECTS[currentIndex]);
    const frame = modal.querySelector('.project-modal__img-frame');
    if (frame) frame.scrollTop = 0;
  }

  function goMapNext() {
    if (modalMapIndex >= modalImages.length - 1) return;
    modalMapIndex += 1;
    updateModalImageView(PROJECTS[currentIndex]);
    const frame = modal.querySelector('.project-modal__img-frame');
    if (frame) frame.scrollTop = 0;
  }

  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);
  prevBtn.addEventListener('click', goPrev);
  nextBtn.addEventListener('click', goNext);
  if (mapPrevBtn) mapPrevBtn.addEventListener('click', goMapPrev);
  if (mapNextBtn) mapNextBtn.addEventListener('click', goMapNext);

  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('open')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') goPrev();
    if (e.key === 'ArrowRight') goNext();
  });

  renderCitySelect();
  renderStatusFilters();
  warmListCardThumbs().then(() => renderShowcase());

  window.addEventListener('hashchange', focusProjectFromHash);
  if (window.location.hash) {
    window.requestAnimationFrame(() => window.setTimeout(focusProjectFromHash, 120));
  }
})();
