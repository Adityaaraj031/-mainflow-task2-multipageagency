/* ═══════════════════════════════════════
   NexaStudio – Main JavaScript
   js/main.js
═══════════════════════════════════════ */

/* ────────────────────────────────────
   1. HAMBURGER MENU
──────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', function () {
  this.classList.toggle('open');
  navLinks.classList.toggle('open');
});

/* ────────────────────────────────────
   2. ACTIVE NAV LINK
   (highlights the link for the current page)
──────────────────────────────────── */
function setActiveLink() {
  const page     = document.body.dataset.page;   // e.g. "home"
  const links    = document.querySelectorAll('.nav-link');
  links.forEach(a => {
    a.classList.toggle('active', a.dataset.page === page);
  });
}

// Close mobile menu when a nav link is tapped
document.querySelectorAll('.nav-link').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
  });
});

// Run on page load
setActiveLink();

/* ────────────────────────────────────
   3. FORM VALIDATION  (contact.html)
──────────────────────────────────── */
const form = document.getElementById('contactForm');

if (form) {
  // ── Helper: show / clear error for a field ──
  function showError(fieldId) {
    const input = document.getElementById(fieldId);
    const msg   = document.getElementById('err-' + fieldId);
    if (input) input.classList.add('error');
    if (msg)   msg.classList.add('show');
  }

  function clearError(fieldId) {
    const input = document.getElementById(fieldId);
    const msg   = document.getElementById('err-' + fieldId);
    if (input) input.classList.remove('error');
    if (msg)   msg.classList.remove('show');
  }

  // ── Live clear on input ──
  ['fname', 'email', 'message'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', () => clearError(id));
    }
  });

  // ── Submit handler ──
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    let valid = true;

    // --- First Name ---
    const fname = document.getElementById('fname');
    if (!fname || fname.value.trim() === '') {
      showError('fname');
      valid = false;
    } else {
      clearError('fname');
    }

    // --- Email (non-empty + basic format) ---
    const email      = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || email.value.trim() === '' || !emailRegex.test(email.value.trim())) {
      showError('email');
      valid = false;
    } else {
      clearError('email');
    }

    // --- Message ---
    const message = document.getElementById('message');
    if (!message || message.value.trim() === '') {
      showError('message');
      valid = false;
    } else {
      clearError('message');
    }

    // ── If invalid: scroll to first error ──
    if (!valid) {
      const firstErr = form.querySelector('.error');
      if (firstErr) {
        firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // ── Success ──
    const banner = document.getElementById('successBanner');
    if (banner) banner.classList.add('show');

    form.reset();
    ['fname', 'email', 'message'].forEach(id => clearError(id));

    // Auto-hide banner after 5 s
    setTimeout(() => {
      if (banner) banner.classList.remove('show');
    }, 5000);
  });
}