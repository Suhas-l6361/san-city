/* San City — shared footer renderer + newsletter */
(function () {
  const root = document.getElementById('siteFooter');
  if (!root) return;

  const inSancity = /\/sancity\//i.test(window.location.pathname);
  const page = inSancity ? '' : 'sancity/';
  const asset = inSancity ? '../' : '';

  root.innerHTML = `
    <div class="footer-wrap">
      <div class="footer-top">
        <div class="footer-brand">
          <a href="${asset}index.html" class="footer-brand__logo">
            <img src="${asset}images/Sancity logo.jpg" alt="San City" />
          </a>
          <div class="footer-brand__text">
            <strong>India's Leading Developer</strong>
            <p>Premium townships and plotted developments across Karnataka — trusted by 11,000+ families.</p>
          </div>
        </div>
      </div>

      <div class="footer-grid">
        <div class="footer-col footer-col--offices">
          <h4 class="footer-title">Our Offices</h4>
          <div class="footer-locations">
            <article class="footer-loc">
              <div class="footer-loc__city"><i class="fa-solid fa-location-dot" aria-hidden="true"></i> Bangalore</div>
              <p>#2/177, Byadarahalli College Stop, Vishvadeenam Post, Magadi Road, Bangalore 560091</p>
            </article>
            <article class="footer-loc">
              <div class="footer-loc__city"><i class="fa-solid fa-location-dot" aria-hidden="true"></i> Sheshadripuram</div>
              <p>#11 &amp; 12, 2nd Floor, PS Plaza, Jawaharlal Street, Sheshadripuram, Bangalore 560020</p>
            </article>
            <article class="footer-loc">
              <div class="footer-loc__city"><i class="fa-solid fa-location-dot" aria-hidden="true"></i> Mysore</div>
              <p>#1, 1st St, Vijay Nagar 2nd Stage, Vijayanagar, Mysuru 570017</p>
            </article>
            <article class="footer-loc">
              <div class="footer-loc__city"><i class="fa-solid fa-location-dot" aria-hidden="true"></i> Bylakuppe</div>
              <p>#115, 1st Floor, Bylsan City Complex, Kushalnagar, Bylakuppe 571104</p>
            </article>
          </div>
        </div>

        <div class="footer-col footer-col--connect">
          <h4 class="footer-title">Stay Connected</h4>
          <div class="footer-contact-chips">
            <a href="tel:+919731901111"><i class="fa-solid fa-phone" aria-hidden="true"></i> +91 97319 01111</a>
            <a href="mailto:admin@sancity1.com" class="email-link"><i class="fa-solid fa-envelope" aria-hidden="true"></i> admin@sancity1.com</a>
          </div>
          <p class="footer-news-text">Get project updates, offers, and launch alerts in your inbox.</p>
          <form class="footer-news-form" id="footerNewsForm">
            <input type="email" name="email" placeholder="Your email address" required autocomplete="email" aria-label="Email for newsletter" />
            <button type="submit" id="footerNewsSubmit">Subscribe</button>
          </form>
          <p class="footer-news-success" id="footerNewsSuccess" role="status">
            <i class="fa-solid fa-circle-check" aria-hidden="true"></i> Thank you for subscribing!
          </p>
          <div class="footer-social" aria-label="Social links">
            <a href="#" class="footer-social__link footer-social__link--facebook" aria-label="Facebook"><i class="fa-brands fa-facebook-f" aria-hidden="true"></i></a>
            <a href="#" class="footer-social__link footer-social__link--twitter" aria-label="Twitter / X"><i class="fa-brands fa-x-twitter" aria-hidden="true"></i></a>
            <a href="#" class="footer-social__link footer-social__link--linkedin" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in" aria-hidden="true"></i></a>
            <a href="#" class="footer-social__link footer-social__link--instagram" aria-label="Instagram"><i class="fa-brands fa-instagram" aria-hidden="true"></i></a>
            <a href="#" class="footer-social__link footer-social__link--youtube" aria-label="YouTube"><i class="fa-brands fa-youtube" aria-hidden="true"></i></a>
            <a href="https://wa.me/919731901111?text=Hello%20San%20City%2C%20I%20would%20like%20to%20know%20more%20about%20your%20projects." class="footer-social__link footer-social__link--whatsapp" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-whatsapp" aria-hidden="true"></i></a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <span>&copy; 2026 San City. All rights reserved.</span>
        <div class="footer-bottom-links">
          <a href="${page}contactus.html">Contact</a>
          <a href="${page}career.html">Careers</a>
          <a href="#">Company Profile</a>
        </div>
      </div>
    </div>
  `;

  const form = document.getElementById('footerNewsForm');
  const submitBtn = document.getElementById('footerNewsSubmit');
  const successEl = document.getElementById('footerNewsSuccess');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const label = submitBtn ? submitBtn.textContent : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Subscribing...';
      }

      window.setTimeout(() => {
        form.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = label;
        }
        if (successEl) {
          successEl.classList.add('is-visible');
          window.setTimeout(() => successEl.classList.remove('is-visible'), 5000);
        }
      }, 500);
    });
  }
})();
