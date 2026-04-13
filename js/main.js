/* =============================================
   TASARI EĞİTİM – main.js  (Premium v2)
   ============================================= */

// ===== LOGO LOAD =====
const logoImgs = document.querySelectorAll('.logo-icon img');
logoImgs.forEach(img => {
  const apply = () => {
    img.closest('.logo-icon')?.classList.add('has-logo');
  };
  const fallback = () => {
    // Image failed to load → show text logo
    img.closest('.logo-icon')?.classList.add('no-img');
    img.style.display = 'none';
    const logoText = img.closest('.nav-logo')?.querySelector('.logo-text');
    if (logoText) logoText.style.display = 'flex';
  };
  if (img.complete && img.naturalWidth > 0) apply();
  else if (img.complete && img.naturalWidth === 0) fallback();
  else {
    img.addEventListener('load', apply);
    img.addEventListener('error', fallback);
  }
});

// ===== NAVBAR SCROLL =====
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('themeToggle');

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  if (themeToggle) {
    themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
    themeToggle.title = theme === 'light' ? 'Koyu Temaya Geç' : 'Açık Temaya Geç';
  }
}

// Init from storage (also applied via inline script to avoid flash)
const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme);

themeToggle?.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  // Smooth transition
  document.documentElement.style.transition = 'background 0.35s ease, color 0.35s ease';
  applyTheme(current === 'dark' ? 'light' : 'dark');
  setTimeout(() => {
    document.documentElement.style.transition = '';
  }, 400);
});

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Add/remove scrolled class for extra shadow depth
  if (scrollY > 60) {
    navbar?.classList.add('scrolled');
  } else {
    navbar?.classList.remove('scrolled');
  }

  // Auto-hide on scroll down, show on scroll up
  if (scrollY > lastScroll && scrollY > 120) {
    navbar?.classList.add('nav-hidden');
  } else {
    navbar?.classList.remove('nav-hidden');
  }
  lastScroll = scrollY;
}, { passive: true });

// ===== MOBILE MENU =====
const hamburger = document.querySelector('.hamburger');
const navLinks  = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';

    const [s1, s2, s3] = hamburger.querySelectorAll('span');
    if (isOpen) {
      s1.style.transform = 'rotate(45deg) translate(5px, 5px)';
      s2.style.opacity   = '0';
      s3.style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      s1.style.transform = '';
      s2.style.opacity   = '1';
      s3.style.transform = '';
    }
  });

  // Close on link click
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      const [s1, s2, s3] = hamburger.querySelectorAll('span');
      s1.style.transform = '';
      s2.style.opacity   = '1';
      s3.style.transform = '';
    });
  });

  // Close on ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}

// ===== ACTIVE NAV LINK =====
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    a.classList.add('active');
  }
});

// ===== SCROLL FADE-IN (with stagger) =====
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Slight delay based on element index in its parent for card stagger
      const siblings = [...(entry.target.parentElement?.children || [])];
      const idx      = siblings.indexOf(entry.target);
      const delay    = Math.min(idx * 60, 300);

      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);

      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

// ===== HERO PARALLAX (subtle) =====
const heroSection = document.querySelector('.hero');
if (heroSection) {
  window.addEventListener('scroll', () => {
    const offset = window.scrollY;
    if (offset < window.innerHeight) {
      const heroContent = heroSection.querySelector('.hero-content');
      if (heroContent) {
        heroContent.style.transform = `translateY(${offset * 0.18}px)`;
        heroContent.style.opacity   = 1 - (offset / (window.innerHeight * 0.9));
      }
    }
  }, { passive: true });
}

// ===== COUNTER ANIMATION =====
function animateCounter(el) {
  const target   = parseInt(el.dataset.target);
  const suffix   = el.dataset.suffix || '';
  const duration = 2000;
  const fps      = 60;
  const steps    = duration / (1000 / fps);
  const step     = target / steps;
  let current    = 0;

  const ease = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // easeInOut
  let frame  = 0;

  const timer = setInterval(() => {
    frame++;
    const progress = frame / steps;
    current = target * ease(Math.min(progress, 1));
    el.textContent = Math.floor(current) + suffix;

    if (progress >= 1) {
      el.textContent = target + suffix;
      clearInterval(timer);
    }
  }, 1000 / fps);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.animated) {
      entry.target.dataset.animated = 'true';
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.btn-submit');
    const origText = btn.textContent;
    btn.textContent = 'Gönderiliyor…';
    btn.disabled    = true;
    btn.style.opacity = '0.75';

    setTimeout(() => {
      contactForm.reset();
      btn.textContent   = origText;
      btn.disabled      = false;
      btn.style.opacity = '1';
      showToast('✅ Mesajınız başarıyla gönderildi! En kısa sürede dönüş yapacağız.');
    }, 1400);
  });
}

// ===== TOAST =====
function showToast(msg) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4500);
}

// ===== TAB SYSTEM =====
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const tabId    = btn.dataset.tab;
    const container = btn.closest('.container') || btn.closest('section') || document;

    container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    container.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));

    btn.classList.add('active');
    const panel = document.getElementById('tab-' + tabId);
    if (panel) panel.classList.add('active');
  });
});

// ===== SMOOTH CARD ENTRANCE (for dynamically loaded content) =====
// ===== SMOOTH CARD ENTRANCE (for dynamically loaded content) =====
document.querySelectorAll('.card, .pub-card, .branch-card, .takvim-card, .book-card').forEach(card => {
  if (!card.classList.contains('fade-in')) {
    card.classList.add('fade-in');
    fadeObserver.observe(card);
  }
});

// ===== HERO BACKGROUND SLIDER (Sliding) =====
const bgTrack = document.querySelector('.bg-slider-track');
const bgSlides = document.querySelectorAll('.bg-slide');
const bgNext = document.querySelector('.bg-next');
const bgPrev = document.querySelector('.bg-prev');

if (bgTrack && bgSlides.length > 0) {
  let currentBg = 0;
  let bgTimer;

  const updateBgSlider = (index) => {
    currentBg = index;
    bgTrack.style.transform = `translateX(-${currentBg * 100}%)`;
  };

  const nextBg = () => {
    let next = (currentBg + 1) % bgSlides.length;
    updateBgSlider(next);
  };

  const prevBg = () => {
    let prev = (currentBg - 1 + bgSlides.length) % bgSlides.length;
    updateBgSlider(prev);
  };

  bgNext?.addEventListener('click', () => {
    nextBg();
    startBgTimer();
  });

  bgPrev?.addEventListener('click', () => {
    prevBg();
    startBgTimer();
  });

  const startBgTimer = () => {
    if (bgTimer) clearInterval(bgTimer);
    bgTimer = setInterval(nextBg, 5000);
  };

  startBgTimer();
}
