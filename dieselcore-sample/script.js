/* ─── Mobile nav ──────────────────────────────────────── */
function toggleMobileNav() {
  const nav       = document.getElementById('mobile-nav');
  const hamburger = document.getElementById('nav-hamburger');
  const isOpen    = nav.classList.contains('open');
  nav.classList.toggle('open');
  hamburger.classList.toggle('open');
  hamburger.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
  document.body.style.overflow = isOpen ? '' : 'hidden';
}

function closeMobileNav() {
  document.getElementById('mobile-nav').classList.remove('open');
  document.getElementById('nav-hamburger').classList.remove('open');
  document.getElementById('nav-hamburger').setAttribute('aria-label', 'Open menu');
  document.body.style.overflow = '';
}

// Close mobile nav on resize to desktop
window.addEventListener('resize', () => {
  if (window.innerWidth > 1024) closeMobileNav();
});

/* ─── Tabs ─────────────────────────────────────────────── */
function switchTab(tab) {
  const buyBtn    = document.getElementById('tab-buy');
  const sellBtn   = document.getElementById('tab-sell');
  const buyPanel  = document.getElementById('panel-buy');
  const sellPanel = document.getElementById('panel-sell');

  if (tab === 'buy') {
    buyBtn.classList.add('active');
    sellBtn.classList.remove('active');
    buyPanel.classList.add('active');
    sellPanel.classList.remove('active');
  } else {
    sellBtn.classList.add('active');
    buyBtn.classList.remove('active');
    sellPanel.classList.add('active');
    buyPanel.classList.remove('active');
  }
}

function scrollToContact() {
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/* ─── Nav logo: appear when hero brand scrolls behind navbar ─ */
const heroBrand  = document.querySelector('.hero-brand-centered');
const navLogoImg = document.querySelector('.nav-logo img');
const navHeight  = document.querySelector('nav').offsetHeight;

const navLogoObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      navLogoImg.classList.add('nav-logo--visible');
    } else {
      navLogoImg.classList.remove('nav-logo--visible');
    }
  });
}, {
  threshold: 0,
  rootMargin: `-${navHeight}px 0px 0px 0px`
});

navLogoObserver.observe(heroBrand);

// Scroll-triggered fade-in for cards and steps
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.why-card, .step').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});
