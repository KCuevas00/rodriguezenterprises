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
  document.querySelectorAll('.nav-link-item').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ---- 4. Hero Doors Video Hover Playback ----
  document.querySelectorAll('.door').forEach(function (door) {
    var video = door.querySelector('.door-video');
    if (!video) return;

    door.addEventListener('mouseenter', function () {
      var playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(function () {
          // Fallback if browser policies restrict
        });
      }
    });

  // ---- 5. Package Layout Switcher & Guest Slider (Poured Up Vibez) ----
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
