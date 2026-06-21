/* Home — Quick Browse awards carousel */
(function () {
  const AWARDS = [
    { title: 'Business Excellence in Real Estate', year: '2019' },
    { title: 'Achievers of Bengaluru', year: '2023' },
    { title: 'Bengaluru Pride Award', year: '2022-23' },
    { title: 'Economic Times Achievers', year: '2023' },
    { title: 'Bengaluru City Icon Award', year: '2018-19' },
    { title: 'Mother Teresa National Award', year: '2020' },
    { title: 'Business Excellence in Real Estate', year: '2023' },
    { title: 'Times Icon For Human Excellence', year: '2021' },
    { title: 'Most Promising Infrastructure Company', year: '2018' },
    { title: 'Emerging Plot Developer of the Year', year: '2023' },
    { title: "Bengaluru's Best Plotted Projects", year: '2022-23' },
    { title: 'Dr. A.P.J. Abdul Kalam Excellence Award', year: '2016' },
  ];

  const viewport = document.getElementById('homeAwardsViewport');
  const track = document.getElementById('homeAwardsTrack');

  if (!viewport || !track) return;

  const MARQUEE_PX_PER_SEC = 42;

  function awardImage(i) {
    return `images/award${i + 1}.jpg`;
  }

  function cardHtml(i, award) {
    return `
      <button type="button" class="home-awards-browse__thumb" data-index="${i}" aria-label="${award.title}">
        <img src="${awardImage(i)}" alt="" loading="lazy" width="88" height="88" />
        <span>${award.year}</span>
      </button>
    `;
  }

  function renderTrack() {
    const cards = AWARDS.map((award, i) => cardHtml(i, award)).join('');
    track.innerHTML = cards + cards;
  }

  function setMarqueeSpeed() {
    const loopWidth = track.scrollWidth / 2;
    if (!loopWidth) return;
    const duration = Math.max(28, loopWidth / MARQUEE_PX_PER_SEC);
    track.style.setProperty('--marquee-duration', `${duration}s`);
  }

  function pauseMarquee() {
    track.classList.add('is-paused');
  }

  function resumeMarquee() {
    track.classList.remove('is-paused');
  }

  viewport.addEventListener('mouseenter', pauseMarquee);
  viewport.addEventListener('mouseleave', resumeMarquee);
  viewport.addEventListener('focusin', pauseMarquee);
  viewport.addEventListener('focusout', (e) => {
    if (!viewport.contains(e.relatedTarget)) resumeMarquee();
  });

  renderTrack();
  setMarqueeSpeed();

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(setMarqueeSpeed);
  }

  window.addEventListener('load', setMarqueeSpeed);
  window.addEventListener('resize', setMarqueeSpeed);
})();
