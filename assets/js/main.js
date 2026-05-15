(() => {
  const qs = (s, r = document) => r.querySelector(s);
  const qsa = (s, r = document) => Array.from(r.querySelectorAll(s));
  const language = document.documentElement.lang || document.body.dataset.lang || 'cs-CZ';
  const push = (payload) => { window.dataLayer = window.dataLayer || []; window.dataLayer.push({ language, ...payload }); };

  const menuButton = qs('[data-menu-btn]');
  if (menuButton) {
    menuButton.addEventListener('click', () => {
      const open = document.body.classList.toggle('menu-open');
      menuButton.setAttribute('aria-expanded', String(open));
    });
  }
  qsa('[data-nav] a').forEach((link) => link.addEventListener('click', () => {
    document.body.classList.remove('menu-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  }));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      document.body.classList.remove('menu-open');
      menuButton?.setAttribute('aria-expanded', 'false');
    }
  });

  qsa('[data-lang-link]').forEach((link) => {
    link.addEventListener('click', () => {
      const selectedLanguage = link.dataset.langLink || 'cs';
      try { localStorage.setItem('ldsadmin_lang', selectedLanguage); } catch (_) {}
      if (window.location.hash && !link.href.includes('#')) link.href += window.location.hash;
      push({ event: 'language_switch', selected_language: selectedLanguage });
    });
  });

  qsa('[data-track]').forEach((element) => {
    element.addEventListener('click', () => push({
      event: 'cta_click',
      cta_id: element.dataset.track,
      cta_text: (element.textContent || '').trim(),
      cta_url: element.getAttribute('href') || ''
    }));
  });
  qsa('a[href^="mailto:"]').forEach((el) => el.addEventListener('click', () => push({ event: 'email_click', email: el.getAttribute('href').replace('mailto:', '') })));
  qsa('a[href^="tel:"]').forEach((el) => el.addEventListener('click', () => push({ event: 'phone_click', phone: el.getAttribute('href').replace('tel:', '') })));

  qsa('[data-faq]').forEach((item) => {
    const button = qs('.faq-question', item);
    if (!button) return;
    button.addEventListener('click', () => {
      const open = item.classList.toggle('open');
      button.setAttribute('aria-expanded', String(open));
      push({ event: 'faq_toggle', question: (qs('.qtext', button)?.textContent || '').trim(), state: open ? 'open' : 'closed' });
    });
  });

  const form = qs('[data-contact-form]');
  const status = qs('[data-form-status]');
  if (form) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      const data = Object.fromEntries(new FormData(form).entries());
      const endpoint = form.getAttribute('action') || '/api/contact';
      const submitButton = qs('button[type="submit"]', form);
      const isLocalPreview = window.location.protocol === 'file:';
      if (submitButton) submitButton.disabled = true;
      if (status) { status.classList.remove('error'); status.style.display = 'block'; status.textContent = form.dataset.sending || 'Sending...'; }
      try {
        let ok = true;
        if (!isLocalPreview) {
          const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
          ok = response.ok;
          if (!ok) throw new Error(`HTTP ${response.status}`);
        } else {
          await new Promise((resolve) => setTimeout(resolve, 400));
        }
        push({ event: 'form_submit', form_id: 'contact', form_location: 'contact_section', status: 'success' });
        if (status) status.textContent = form.dataset.success || 'Thank you. Your message was sent.';
        form.reset();
      } catch (error) {
        push({ event: 'form_submit', form_id: 'contact', form_location: 'contact_section', status: 'error', error_message: String(error.message || error) });
        if (status) { status.classList.add('error'); status.textContent = form.dataset.error || 'The message could not be sent. Please try again.'; }
      } finally { if (submitButton) submitButton.disabled = false; }
    });
  }

  const cookieBanner = qs('[data-cookie]');
  const consentKey = 'ldsadmin_consent_v2';
  const updateConsent = (choice) => {
    const analytics = choice.analytics ? 'granted' : 'denied';
    const marketing = choice.marketing ? 'granted' : 'denied';
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', { analytics_storage: analytics, ad_storage: marketing, ad_user_data: marketing, ad_personalization: marketing, functionality_storage: 'granted', security_storage: 'granted' });
    }
    push({ event: 'consent_update', analytics_storage: analytics, ad_storage: marketing });
  };
  if (cookieBanner) {
    let existing = null;
    try { existing = JSON.parse(localStorage.getItem(consentKey)); } catch (_) {}
    if (existing) updateConsent(existing); else cookieBanner.classList.add('show');
    qsa('[data-cookie-action]', cookieBanner).forEach((button) => {
      button.addEventListener('click', () => {
        const action = button.dataset.cookieAction;
        const choice = {
          necessary: true,
          analytics: action === 'all' || (action === 'selected' && Boolean(qs('[name="cookie_analytics"]')?.checked)),
          marketing: action === 'all' || (action === 'selected' && Boolean(qs('[name="cookie_marketing"]')?.checked))
        };
        if (action === 'rejected') { choice.analytics = false; choice.marketing = false; }
        try { localStorage.setItem(consentKey, JSON.stringify(choice)); } catch (_) {}
        updateConsent(choice);
        cookieBanner.classList.remove('show');
      });
    });
  }

  const milestones = [25, 50, 75, 100];
  const sent = new Set();
  const onScroll = () => {
    const doc = document.documentElement;
    const scrollable = Math.max(1, doc.scrollHeight - window.innerHeight);
    const progress = Math.min(100, Math.round((window.scrollY / scrollable) * 100));
    milestones.forEach((m) => {
      if (progress >= m && !sent.has(m)) { sent.add(m); push({ event: 'scroll_milestone', scroll_depth: m }); }
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const animated = qsa('.hero-feature,.audience-mini,.card,.detail-card,.audience,.faq-item,.contact-panel,.legal-content,.visual-panel,.device-preview,.matrix,.cta');
  animated.forEach((el, i) => { el.classList.add('reveal'); el.style.setProperty('--delay', `${(i % 6) * 55}ms`); });
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); }
    }), { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
    animated.forEach((el) => io.observe(el));
  } else {
    animated.forEach((el) => el.classList.add('is-visible'));
  }
})();
