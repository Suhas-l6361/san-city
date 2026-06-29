/* Homepage hero — ongoing projects only, badges from project highlights */
(function () {
  const catalog = window.SanCityProjects;
  if (!catalog) return;

  const heroImg = document.getElementById('heroImg');
  const heroBadges = document.getElementById('heroBadges');
  const heroViewProjectBtn = document.getElementById('heroViewProjectBtn');
  const heroProjectName = document.getElementById('heroProjectName');
  const heroLoc = document.getElementById('heroLoc');
  const heroDesc = document.getElementById('heroDesc');
  const hPrev = document.getElementById('hPrev');
  const hNext = document.getElementById('hNext');
  const slideNav = document.querySelector('.hero-slide-nav');
  if (!heroImg || !heroProjectName) return;

  const heroData = catalog.PROJECTS.filter(
    (project) => project.status === 'ongoing' && catalog.heroImage(project)
  ).map((project) => ({
    img: catalog.heroImage(project),
    name: project.name,
    projectId: catalog.projectSlug(project.name),
    loc: `${project.city}, Karnataka`,
    desc: `${project.name} — ${project.size} in ${project.location}.`,
    highlights: project.highlights || [],
    cropWide: project.imageSlot === 1,
  }));

  if (!heroData.length) {
    if (slideNav) slideNav.hidden = true;
    return;
  }

  let hIdx = 0;
  let heroTimer = null;

  function highlightBadgeClass(tag) {
    if (/RERA|E-Katha/i.test(tag)) return 'badge-gold';
    return 'badge-green';
  }

  function renderBadges(highlights) {
    if (!heroBadges) return;
    heroBadges.innerHTML = (highlights || [])
      .map((tag) => `<span class="badge ${highlightBadgeClass(tag)}">${tag}</span>`)
      .join('');
  }

  function setHero(i) {
    hIdx = ((i % heroData.length) + heroData.length) % heroData.length;
    const slide = heroData[hIdx];

    heroImg.style.opacity = '0';
    window.setTimeout(() => {
      heroImg.src = slide.img;
      heroImg.alt = slide.name;
      heroImg.classList.toggle('hero-img--wide-crop', !!slide.cropWide);
      heroProjectName.textContent = slide.name;
      if (heroLoc) heroLoc.textContent = slide.loc;
      if (heroDesc) heroDesc.textContent = slide.desc;
      renderBadges(slide.highlights);
      if (heroViewProjectBtn) {
        heroViewProjectBtn.href = `sancity/projects.html#${slide.projectId}`;
        heroViewProjectBtn.setAttribute('aria-label', `View ${slide.name}`);
      }
      heroImg.style.transition = 'opacity 0.5s';
      heroImg.style.opacity = '1';
    }, 300);
  }

  if (slideNav) slideNav.hidden = heroData.length <= 1;
  if (hPrev) hPrev.onclick = () => setHero(hIdx - 1);
  if (hNext) hNext.onclick = () => setHero(hIdx + 1);

  setHero(0);

  if (heroData.length > 1) {
    heroTimer = window.setInterval(() => setHero(hIdx + 1), 6000);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        if (heroTimer) window.clearInterval(heroTimer);
        heroTimer = null;
      } else if (!heroTimer) {
        heroTimer = window.setInterval(() => setHero(hIdx + 1), 6000);
      }
    });
  }
})();
