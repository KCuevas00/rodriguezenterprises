// ============================================================
// RODRIGUEZ ENTERPRISES — shared site behavior & navigation
// ============================================================

document.addEventListener('DOMContentLoaded', function () {

  // ---- 1. Transparent-to-Solid Header on Scroll ----
  var header = document.querySelector('.site-header');
  function updateHeaderScroll() {
    if (window.scrollY > 20) {
      if (header) header.classList.add('scrolled');
    } else {
      if (header) header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', updateHeaderScroll, { passive: true });
  updateHeaderScroll();

  // ---- 2. Mobile Nav Drawer Toggle ----
  var mobileToggle = document.querySelector('.mobile-nav-toggle');
  var mobileDrawer = document.querySelector('.mobile-nav-drawer');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', function () {
      var isOpen = mobileDrawer.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';

      var svg = mobileToggle.querySelector('svg');
      if (svg) {
        if (isOpen) {
          svg.innerHTML = '<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>';
        } else {
          svg.innerHTML = '<line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>';
        }
      }
    });

    // Close drawer when clicking any link inside
    mobileDrawer.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileDrawer.classList.remove('open');
        document.body.style.overflow = '';
        mobileToggle.setAttribute('aria-expanded', 'false');
        var svg = mobileToggle.querySelector('svg');
        if (svg) {
          svg.innerHTML = '<line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>';
        }
      });
    });
  }

  // ---- 3. Active Link State Auto-Detection ----
  var currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link-item, .mobile-nav-item').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ---- Generic form handling (no backend wired yet) ----
  // Any <form data-form> on the site will show a local success message
  // instead of actually submitting. Swap this for a real endpoint
  // (e.g. Formspree, or a server route) when ready to go live.
  document.querySelectorAll('form[data-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var requiredFields = form.querySelectorAll('[required]');
      var valid = true;
      requiredFields.forEach(function (field) {
        if (!field.value.trim()) valid = false;
      });
      if (!valid) return;

      var successEl = form.parentElement.querySelector('.form-success');
      if (successEl) {
        successEl.classList.add('show');
        successEl.setAttribute('tabindex', '-1');
        successEl.focus();
      }
      form.reset();
    });
  });

});
