/* San City — shared compact footer */
(function () {
  const root = document.getElementById('siteFooter');
  if (!root) return;

  const inSancity = /\/sancity\//i.test(window.location.pathname);
  const page = inSancity ? '' : 'sancity/';
  const asset = inSancity ? '../' : '';
  const offices = window.SanCityOffices || [];

  function officeMapLink(office) {
    return `<a href="${office.map}" class="footer-office-map" target="_blank" rel="noopener noreferrer" aria-label="Open ${office.name} office in Google Maps"><i class="fa-solid fa-location-dot" aria-hidden="true"></i> ${office.address}</a>`;
  }

  const officeListHtml = offices.map((office) => `
            <li>
              <strong>${office.name}</strong>
              <span>${officeMapLink(office)}</span>
            </li>`).join('');

  root.innerHTML = `
    <div class="footer-wrap">
      <div class="footer-main">
        <div class="footer-brand">
          <a href="${asset}index.html" class="footer-brand__logo">
            <img src="${asset}images/Sancity logo.jpg" alt="San City" width="120" height="40" />
          </a>
          <p class="footer-brand__tag">Premium townships &amp; plotted developments across Karnataka.</p>
          <div class="footer-social" aria-label="Social links">
            <a href="#" class="footer-social__link footer-social__link--facebook" aria-label="Facebook"><i class="fa-brands fa-facebook-f" aria-hidden="true"></i></a>
            <a href="https://www.linkedin.com/company/vsan-infrastructure-private-limited/" class="footer-social__link footer-social__link--linkedin" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-linkedin-in" aria-hidden="true"></i></a>
            <a href="https://www.instagram.com/vsaninfrastructurepvt/" class="footer-social__link footer-social__link--instagram" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-instagram" aria-hidden="true"></i></a>
            <a href="https://www.youtube.com/@sancity01" class="footer-social__link footer-social__link--youtube" aria-label="YouTube" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-youtube" aria-hidden="true"></i></a>
            <a href="https://wa.me/919731901111?text=Hello%20San%20City%2C%20I%20would%20like%20to%20know%20more%20about%20your%20projects." class="footer-social__link footer-social__link--whatsapp" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-whatsapp" aria-hidden="true"></i></a>
          </div>
        </div>

        <div class="footer-offices">
          <h4 class="footer-heading">Our Offices</h4>
          <ul class="footer-office-list">
            ${officeListHtml}
          </ul>
        </div>

        <div class="footer-connect">
          <h4 class="footer-heading">Contact</h4>
          <a href="tel:+919731901111" class="footer-link"><i class="fa-solid fa-phone" aria-hidden="true"></i> +91 97319 01111</a>
          <a href="tel:+918023469234" class="footer-link"><i class="fa-solid fa-phone" aria-hidden="true"></i> +91 80 2346 9234</a>
          <a href="tel:+918023562346" class="footer-link"><i class="fa-solid fa-phone" aria-hidden="true"></i> +91 80 2356 2346</a>
          <a href="mailto:admin@sancity1.com" class="footer-link email-link"><i class="fa-solid fa-envelope" aria-hidden="true"></i> admin@sancity1.com</a>
        </div>
      </div>

      <div class="footer-bottom">
        <span>&copy; 2026 San City. All rights reserved.</span>
        <nav class="footer-bottom-links" aria-label="Footer links">
          <a href="${page}aboutus.html">About</a>
          <a href="${page}projects.html">Projects</a>
          <a href="${page}contactus.html">Contact</a>
          <a href="${page}terms.html">Terms</a>
          <a href="${page}privacy.html">Privacy</a>
          <a href="${asset}index.html#visit">Book Visit</a>
        </nav>
      </div>
    </div>
  `;
})();
