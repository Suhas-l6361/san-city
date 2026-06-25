/* San City — floating contact tooltips & chatbot */
(function () {
  const floatContact = document.querySelector('.float-contact');
  if (!floatContact) return;

  const isSubPage = /\/sancity\//i.test(window.location.pathname);
  const homePrefix = isSubPage ? '../index.html' : 'index.html';
  const contactPath = isSubPage ? 'contactus.html' : 'sancity/contactus.html';
  const projectsPath = isSubPage ? 'projects.html' : 'sancity/projects.html';

  const waBtn = floatContact.querySelector('.float-contact-wa');
  const emailBtn = floatContact.querySelector('.float-contact-email');

  if (waBtn) waBtn.dataset.tooltip = 'Message in WhatsApp';
  if (emailBtn) emailBtn.dataset.tooltip = 'Send email';

  if (!document.getElementById('chatbotToggle')) {
    const chatBtn = document.createElement('button');
    chatBtn.type = 'button';
    chatBtn.className = 'float-contact-btn float-contact-chatbot';
    chatBtn.id = 'chatbotToggle';
    chatBtn.setAttribute('aria-label', 'Open chat bot');
    chatBtn.setAttribute('aria-expanded', 'false');
    chatBtn.dataset.tooltip = 'Chat bot';
    chatBtn.innerHTML = '<i class="fa-solid fa-robot" aria-hidden="true"></i>';

    const brochureBtn = floatContact.querySelector('.float-contact-brochure');
    if (brochureBtn) {
      floatContact.insertBefore(chatBtn, brochureBtn);
    } else {
      floatContact.appendChild(chatBtn);
    }
  }

  if (!document.getElementById('chatbotPanel')) {
    const backdrop = document.createElement('button');
    backdrop.type = 'button';
    backdrop.className = 'chatbot-backdrop';
    backdrop.id = 'chatbotBackdrop';
    backdrop.setAttribute('aria-label', 'Close chat bot');
    backdrop.hidden = true;
    document.body.appendChild(backdrop);

    const panel = document.createElement('div');
    panel.className = 'chatbot-panel';
    panel.id = 'chatbotPanel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'true');
    panel.setAttribute('aria-labelledby', 'chatbotPanelTitle');
    panel.setAttribute('aria-hidden', 'true');
    panel.innerHTML = `
      <div class="chatbot-panel__header">
        <div class="chatbot-panel__brand">
          <div class="chatbot-panel__avatar"><i class="fa-solid fa-robot" aria-hidden="true"></i></div>
          <div>
            <strong id="chatbotPanelTitle">San City Assistant</strong>
            <span>Online · replies instantly</span>
          </div>
        </div>
        <button type="button" class="chatbot-panel__close" id="chatbotClose" aria-label="Close chat bot">
          <i class="fa-solid fa-xmark" aria-hidden="true"></i>
        </button>
      </div>
      <div class="chatbot-panel__messages" id="chatbotMessages" aria-live="polite"></div>
      <div class="chatbot-panel__chips" id="chatbotChips">
        <button type="button" class="chatbot-chip" data-reply="projects">View Projects</button>
        <button type="button" class="chatbot-chip" data-reply="visit">Book Site Visit</button>
        <button type="button" class="chatbot-chip" data-reply="contact">Contact Team</button>
      </div>
      <form class="chatbot-panel__form" id="chatbotForm">
        <input type="text" class="chatbot-panel__input" id="chatbotInput" placeholder="Ask about plots, townships..." autocomplete="off" />
        <button type="submit" class="chatbot-panel__send" aria-label="Send message">
          <i class="fa-solid fa-paper-plane" aria-hidden="true"></i>
        </button>
      </form>
    `;
    document.body.appendChild(panel);
  }

  const toggle = document.getElementById('chatbotToggle');
  const panel = document.getElementById('chatbotPanel');
  const backdrop = document.getElementById('chatbotBackdrop');
  const closeBtn = document.getElementById('chatbotClose');
  const messagesEl = document.getElementById('chatbotMessages');
  const form = document.getElementById('chatbotForm');
  const input = document.getElementById('chatbotInput');
  const chips = document.getElementById('chatbotChips');

  if (!toggle || !panel || !messagesEl) return;

  let booted = false;

  const BOT_REPLIES = {
    projects: 'Explore our premium townships and plotted developments on the Projects page. Would you like me to guide you there?',
    visit: 'You can book a free site visit from our home page. I can help you with that — just use the Book Site Visit section.',
    contact: 'Our team is happy to help. You can reach us via the Contact page, WhatsApp, or email anytime.',
    hello: 'Hello! Welcome to San City. I can help with projects, site visits, pricing, and locations across Karnataka.',
    price: 'Plot and township pricing varies by project and location. Book a free site visit or contact our team for the latest offers.',
    location: 'San City develops premium townships across Bangalore outskirts, Mysore, Chikkaballapur, and Coorg.',
    default: 'Thanks for your message. For detailed assistance, please book a site visit or contact our team directly.',
  };

  function addMessage(text, role) {
    const bubble = document.createElement('div');
    bubble.className = 'chatbot-msg chatbot-msg--' + role;
    bubble.textContent = text;
    messagesEl.appendChild(bubble);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function botReply(keyOrText) {
    const text = (keyOrText || '').toLowerCase();
    let reply = BOT_REPLIES.default;

    if (BOT_REPLIES[keyOrText]) {
      reply = BOT_REPLIES[keyOrText];
    } else if (/project|plot|township/.test(text)) {
      reply = BOT_REPLIES.projects;
    } else if (/visit|book|site/.test(text)) {
      reply = BOT_REPLIES.visit;
    } else if (/contact|call|email|phone|whatsapp/.test(text)) {
      reply = BOT_REPLIES.contact;
    } else if (/price|cost|rate|emi/.test(text)) {
      reply = BOT_REPLIES.price;
    } else if (/where|location|bangalore|mysore|coorg/.test(text)) {
      reply = BOT_REPLIES.location;
    } else if (/hi|hello|hey|namaste/.test(text)) {
      reply = BOT_REPLIES.hello;
    }

    window.setTimeout(() => addMessage(reply, 'bot'), 400);
  }

  function bootChat() {
    if (booted) return;
    booted = true;
    addMessage('Hi! I am the San City assistant. Ask about our projects, locations, or book a site visit.', 'bot');
  }

  function openChat() {
    bootChat();
    panel.classList.add('is-open');
    panel.setAttribute('aria-hidden', 'false');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('chatbot-open');
    if (backdrop) backdrop.hidden = false;
    if (input) window.setTimeout(() => input.focus(), 280);
  }

  function closeChat() {
    panel.classList.remove('is-open');
    panel.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('chatbot-open');
    if (backdrop) backdrop.hidden = true;
  }

  toggle.addEventListener('click', () => {
    if (panel.classList.contains('is-open')) closeChat();
    else openChat();
  });

  if (closeBtn) closeBtn.addEventListener('click', closeChat);
  if (backdrop) backdrop.addEventListener('click', closeChat);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && panel.classList.contains('is-open')) closeChat();
  });

  if (form && input) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return;
      addMessage(text, 'user');
      input.value = '';
      botReply(text);
    });
  }

  if (chips) {
    chips.addEventListener('click', (e) => {
      const chip = e.target.closest('.chatbot-chip');
      if (!chip) return;
      const key = chip.dataset.reply;
      addMessage(chip.textContent.trim(), 'user');
      botReply(key);

      if (key === 'projects') {
        window.setTimeout(() => {
          window.location.href = projectsPath;
        }, 900);
      } else if (key === 'visit') {
        window.setTimeout(() => {
          window.location.href = homePrefix + '#visit';
        }, 900);
      } else if (key === 'contact') {
        window.setTimeout(() => {
          window.location.href = contactPath;
        }, 900);
      }
    });
  }
})();
