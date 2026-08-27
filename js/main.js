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

  // ---- 2. Mobile Nav Drawer & Backdrop Toggle ----
  var mobileToggle = document.querySelector('.mobile-nav-toggle');
  var mobileDrawer = document.querySelector('.mobile-nav-drawer');
  var mobileBackdrop = document.querySelector('.mobile-drawer-backdrop');
  var mobileCloseBtn = document.querySelector('.mobile-drawer-close');

  function openDrawer() {
    if (mobileDrawer) mobileDrawer.classList.add('open');
    if (mobileBackdrop) mobileBackdrop.classList.add('open');
    if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (mobileDrawer) mobileDrawer.classList.remove('open');
    if (mobileBackdrop) mobileBackdrop.classList.remove('open');
    if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = mobileDrawer && mobileDrawer.classList.contains('open');
      if (isOpen) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });
  }

  if (mobileCloseBtn) {
    mobileCloseBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      closeDrawer();
    });
  }

  if (mobileBackdrop) {
    mobileBackdrop.addEventListener('click', function () {
      closeDrawer();
    });
  }

  // Close on ESC key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' || e.key === 'Esc') {
      closeDrawer();
    }
  });

  // Close drawer when clicking any link inside
  if (mobileDrawer) {
    mobileDrawer.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        closeDrawer();
      });
    });
  }

  // ---- 3. Active Link State Auto-Detection (Desktop Only) ----
  var currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link-item').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ---- 4. Package Layout Switcher & Guest Slider (Poured Up Vibez) ----
  var switchBtns = document.querySelectorAll('.layout-switch-btn');
  var cardsView = document.getElementById('view-cards');
  var sliderView = document.getElementById('view-slider');
  var tableWrap = document.getElementById('view-table');

  if (switchBtns.length > 0) {
    switchBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        switchBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        var target = btn.getAttribute('data-view');
        if (cardsView) cardsView.style.display = target === 'cards' ? 'grid' : 'none';
        if (sliderView) sliderView.style.display = target === 'slider' ? 'block' : 'none';
        if (tableWrap) tableWrap.style.display = target === 'table' ? 'block' : 'none';
      });
    });
  }

  var guestSlider = document.getElementById('guest-slider');
  var guestOutput = document.getElementById('guest-output');
  var recommendedPkg = document.getElementById('recommended-pkg-name');
  var recommendedPrice = document.getElementById('recommended-pkg-price');
  var recommendedDesc = document.getElementById('recommended-pkg-desc');

  if (guestSlider && guestOutput) {
    guestSlider.addEventListener('input', function () {
      var count = parseInt(guestSlider.value, 10);
      guestOutput.textContent = count + ' Guests';

      if (count <= 60) {
        if (recommendedPkg) recommendedPkg.textContent = 'Silver Package';
        if (recommendedPrice) recommendedPrice.textContent = '$600';
        if (recommendedDesc) recommendedDesc.textContent = '4 Hours • 1 Licensed Bartender • 2 Signature Drinks';
      } else if (count <= 75) {
        if (recommendedPkg) recommendedPkg.textContent = 'Gold Package (Most Popular)';
        if (recommendedPrice) recommendedPrice.textContent = '$800';
        if (recommendedDesc) recommendedDesc.textContent = '4 Hours • 1 Licensed Bartender • 3 Signature Drinks';
      } else if (count <= 100) {
        if (recommendedPkg) recommendedPkg.textContent = 'Platinum Package';
        if (recommendedPrice) recommendedPrice.textContent = '$950';
        if (recommendedDesc) recommendedDesc.textContent = '5 Hours • 2 Licensed Bartenders • 4 Signature Drinks • Premium Garnish & Decor';
      } else {
        if (recommendedPkg) recommendedPkg.textContent = 'Diamond Package';
        if (recommendedPrice) recommendedPrice.textContent = '$1,200';
        if (recommendedDesc) recommendedDesc.textContent = '5 Hours • 2 Licensed Bartenders • 4 Signature Drinks • Garnish, Decor & Choice of Add-on';
      }
    });
  }

  // Auto-fill package select dropdown when clicking "Select Package"
  document.querySelectorAll('[data-select-pkg]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var pkgName = btn.getAttribute('data-select-pkg');
      var pkgSelect = document.getElementById('package');
      if (pkgSelect) {
        for (var i = 0; i < pkgSelect.options.length; i++) {
          if (pkgSelect.options[i].text.toLowerCase().includes(pkgName.toLowerCase())) {
            pkgSelect.selectedIndex = i;
            break;
          }
        }
      }
    });
  });

  // ---- 6. Generic form handling ----
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
