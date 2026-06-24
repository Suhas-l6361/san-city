/* San City — shared compact footer */
(function () {
  const root = document.getElementById('siteFooter');
  if (!root) return;

  const inSancity = /\/sancity\//i.test(window.location.pathname);
  const page = inSancity ? '' : 'sancity/';
  const asset = inSancity ? '../' : '';

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
            <a href="#" class="footer-social__link footer-social__link--linkedin" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in" aria-hidden="true"></i></a>
            <a href="#" class="footer-social__link footer-social__link--instagram" aria-label="Instagram"><i class="fa-brands fa-instagram" aria-hidden="true"></i></a>
            <a href="#" class="footer-social__link footer-social__link--youtube" aria-label="YouTube"><i class="fa-brands fa-youtube" aria-hidden="true"></i></a>
            <a href="https://wa.me/919731901111?text=Hello%20San%20City%2C%20I%20would%20like%20to%20know%20more%20about%20your%20projects." class="footer-social__link footer-social__link--whatsapp" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-whatsapp" aria-hidden="true"></i></a>
          </div>
        </div>

        <div class="footer-offices">
          <h4 class="footer-heading">Our Offices</h4>
          <ul class="footer-office-list">
            <li>
              <strong>Sheshadripuram</strong>
              <span>#11 &amp; 12, 2nd Floor, PS Plaza, Jawaharlal Street, Bangalore 560020</span>
            </li>
            <li>
              <strong>Magadi Road</strong>
              <span>#2/177, Byadarahalli College Stop, Vishvadeenam Post, Bangalore 560091</span>
            </li>
            <li>
              <strong>Mysore</strong>
              <span>#1, 1st St, Vijay Nagar 2nd Stage, Mysuru 570017</span>
            </li>
            <li>
              <strong>Bylakuppe</strong>
              <span>#115, 1st Floor, Bylsan City Complex, Kushalnagar 571104</span>
            </li>
          </ul>
        </div>

        <div class="footer-connect">
          <h4 class="footer-heading">Contact</h4>
          <a href="tel:+919731901111" class="footer-link"><i class="fa-solid fa-phone" aria-hidden="true"></i> +91 97319 01111</a>
          <a href="mailto:admin@sancity1.com" class="footer-link email-link"><i class="fa-solid fa-envelope" aria-hidden="true"></i> admin@sancity1.com</a>
        </div>
      </div>

      <div class="footer-bottom">
        <span>&copy; 2026 San City. All rights reserved.</span>
        <nav class="footer-bottom-links" aria-label="Footer links">
          <a href="${page}aboutus.html">About</a>
          <a href="${page}projects.html">Projects</a>
          <a href="${page}contactus.html">Contact</a>
          <a href="${asset}index.html#visit">Book Visit</a>
        </nav>
      </div>
    </div>
  `;
})();
