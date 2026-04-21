/* ═══════════════════════════════════════════
   EL GRAN DANÉS SUR — script.js
   ═══════════════════════════════════════════ */

/* ── CUSTOM CURSOR ── */
(function initCursor() {
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;

  document.addEventListener('mousemove', (e) => {
    dot.style.left  = e.clientX + 'px';
    dot.style.top   = e.clientY + 'px';
    ring.style.left = e.clientX + 'px';
    ring.style.top  = e.clientY + 'px';
  });

  const hoverTargets = document.querySelectorAll(
    'a, button, .service-card, .gallery-item, .review-card, .chip'
  );
  hoverTargets.forEach((el) => {
    el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
  });
})();

/* ── NAV SCROLL ── */
(function initNav() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
})();

/* ── MOBILE MENU ── */
(function initMobileMenu() {
  const burger = document.getElementById('navBurger');
  const menu   = document.getElementById('mobileMenu');
  if (!burger || !menu) return;

  let open = false;

  const toggle = () => {
    open = !open;
    menu.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
    // Animate burger lines
    const spans = burger.querySelectorAll('span');
    if (open) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    }
  };

  burger.addEventListener('click', toggle);

  // Close on any menu link click
  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => { if (open) toggle(); });
  });
})();

/* ── SCROLL REVEAL ── */
(function initReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach((el) => observer.observe(el));
})();

/* ── STAGGER SERVICE CARDS ── */
(function staggerCards() {
  document.querySelectorAll('.service-card.reveal').forEach((card, i) => {
    card.style.transitionDelay = (i * 0.08) + 's';
  });
})();

/* ── HIGHLIGHT TODAY IN HOURS TABLE ── */
(function highlightToday() {
  const today = new Date().getDay(); // 0=Sunday … 6=Saturday
  const rows  = document.querySelectorAll('.hours-table tr[data-day]');
  rows.forEach((row) => {
    if (parseInt(row.getAttribute('data-day'), 10) === today) {
      row.classList.add('today');
    }
  });
})();

/* ── GALLERY LIGHTBOX ── */
(function initLightbox() {
  const lightbox    = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const closeBtn    = document.getElementById('lightboxClose');
  if (!lightbox || !lightboxImg) return;

  const open = (src) => {
    lightboxImg.src = src;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    // Clear src after transition so prev image doesn't flash
    setTimeout(() => { lightboxImg.src = ''; }, 400);
  };

  // Attach click to each gallery item
  document.querySelectorAll('.gallery-item').forEach((item) => {
    item.addEventListener('click', () => {
      const src = item.getAttribute('data-src') || item.querySelector('img')?.src;
      if (src) open(src);
    });
  });

  // Close triggers
  if (closeBtn) closeBtn.addEventListener('click', close);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
})();

/* ── SMOOTH SCROLL for nav links ── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
})();