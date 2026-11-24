// ============================================================
// RODRIGUEZ ENTERPRISES — shared site behavior & navigation
// ============================================================

document.addEventListener('DOMContentLoaded', function () {

  // ---- 1. Transparent-to-Solid Header on Scroll & Menu Open ----
  var header = document.querySelector('.site-header');
  var mobileDrawer = document.querySelector('.mobile-nav-drawer');

  function updateHeaderScroll() {
    var isDrawerOpen = mobileDrawer && mobileDrawer.classList.contains('open');
    if (window.scrollY > 20 || isDrawerOpen) {
      if (header) header.classList.add('scrolled');
    } else {
      if (header) header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', updateHeaderScroll, { passive: true });
  updateHeaderScroll();

  // ---- 2. Mobile Nav Drawer & Backdrop Toggle ----
  var mobileToggle = document.querySelector('.mobile-nav-toggle');
  var mobileBackdrop = document.querySelector('.mobile-drawer-backdrop');
  var mobileCloseBtn = document.querySelector('.mobile-drawer-close');

  function openDrawer() {
    if (mobileDrawer) mobileDrawer.classList.add('open');
    if (mobileBackdrop) mobileBackdrop.classList.add('open');
    if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    document.body.classList.add('drawer-open');
    updateHeaderScroll();
  }

  function closeDrawer() {
    if (mobileDrawer) mobileDrawer.classList.remove('open');
    if (mobileBackdrop) mobileBackdrop.classList.remove('open');
    if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    document.body.classList.remove('drawer-open');
    updateHeaderScroll();
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

  // ---- Smooth Scroll to Top for #top Anchors & Badges ----
  document.querySelectorAll('a[href="#top"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
      if (window.history && window.history.pushState) {
        window.history.pushState(null, null, window.location.pathname);
      }
    });
  });

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
        if (recommendedPrice) recommendedPrice.textContent = 'Up to 60 Guests';
        if (recommendedDesc) recommendedDesc.textContent = '4 Hours • 1 Licensed Bartender • 2 Signature Drinks';
      } else if (count <= 75) {
        if (recommendedPkg) recommendedPkg.textContent = 'Gold Package (Most Popular)';
        if (recommendedPrice) recommendedPrice.textContent = '60–75 Guests';
        if (recommendedDesc) recommendedDesc.textContent = '4 Hours • 1 Licensed Bartender • 3 Signature Drinks';
      } else if (count <= 100) {
        if (recommendedPkg) recommendedPkg.textContent = 'Platinum Package';
        if (recommendedPrice) recommendedPrice.textContent = '75–100 Guests';
        if (recommendedDesc) recommendedDesc.textContent = '5 Hours • 2 Licensed Bartenders • 3 Signature Drinks • Custom Party Decor & Premium Garnish';
      } else {
        if (recommendedPkg) recommendedPkg.textContent = 'Diamond Package';
        if (recommendedPrice) recommendedPrice.textContent = '100+ Guests';
        if (recommendedDesc) recommendedDesc.textContent = '5 Hours • 2 Licensed Bartenders • 4 Signature Drinks • Garnish, Custom Decor & Choice of Add-on';
      }
    });
  }

  // Auto-fill and sync package selection pills and select dropdown
  var formPkgBtns = document.querySelectorAll('.form-pkg-pill-btn');
  var pkgSelect = document.getElementById('package');

  function syncPackageSelection(pkgName) {
    if (!pkgSelect) return;
    for (var i = 0; i < pkgSelect.options.length; i++) {
      if (pkgSelect.options[i].text.toLowerCase().includes(pkgName.toLowerCase()) ||
          pkgSelect.options[i].value.toLowerCase().includes(pkgName.toLowerCase())) {
        pkgSelect.selectedIndex = i;
        break;
      }
    }
    formPkgBtns.forEach(function (btn) {
      var target = btn.getAttribute('data-pkg-target');
      if (target && target.toLowerCase() === pkgName.toLowerCase()) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  formPkgBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = btn.getAttribute('data-pkg-target');
      if (target) syncPackageSelection(target);
    });
  });

  if (pkgSelect) {
    pkgSelect.addEventListener('change', function () {
      var selectedText = pkgSelect.options[pkgSelect.selectedIndex].text;
      formPkgBtns.forEach(function (btn) {
        var target = btn.getAttribute('data-pkg-target');
        if (target && selectedText.toLowerCase().includes(target.toLowerCase())) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
    });
  }

  // ---- Package Selection and Smooth Scroll to Direct Booking ----
  var pkgDetailsMap = {
    'Silver': {
      title: 'Silver Package',
      details: 'Up to 60 guests · 4 hrs · 1 Licensed Bartender · 2 Custom Cocktails',
      smsText: 'Hi! I would like to book the Silver Package (up to 60 guests) for my event.'
    },
    'Gold': {
      title: 'Gold Package',
      details: '60–75 guests · 4 hrs · 1 Licensed Bartender · 3 Custom Cocktails (Most Popular)',
      smsText: 'Hi! I would like to book the Gold Package (60-75 guests) for my event.'
    },
    'Platinum': {
      title: 'Platinum Package',
      details: '75–100 guests · 5 hrs · 2 Licensed Bartenders · 3 Custom Cocktails · Custom Decor',
      smsText: 'Hi! I would like to book the Platinum Package (75-100 guests) for my event.'
    },
    'Diamond': {
      title: 'Diamond Package',
      details: '100+ guests · 5 hrs · 2 Licensed Bartenders · 4 Custom Cocktails · Choice of Add-On',
      smsText: 'Hi! I would like to book the Diamond Package (100+ guests) for my event.'
    }
  };

  var pkgBanner = document.getElementById('vibezSelectedPkgBanner');
  var pkgTitleEl = document.getElementById('selectedPkgTitle');
  var pkgDetailsEl = document.getElementById('selectedPkgDetails');
  var clearPkgBtn = document.getElementById('clearSelectedPkg');
  var contactBox = document.getElementById('vibezContactBox');
  var contactHeading = document.getElementById('vibezContactHeading');
  var callBtnText = document.getElementById('vibezCallBtnText');
  var textBtn = document.getElementById('vibezTextBtn');
  var textBtnText = document.getElementById('vibezTextBtnText');

  function selectAndScrollToPackage(pkgName) {
    if (typeof syncPackageSelection === 'function') {
      syncPackageSelection(pkgName);
    }

    var pkgData = pkgDetailsMap[pkgName] || {
      title: pkgName + ' Package',
      details: 'Tailored for your event',
      smsText: 'Hi! I would like to book the ' + pkgName + ' Package for my event.'
    };

    if (pkgBanner && pkgTitleEl && pkgDetailsEl) {
      pkgTitleEl.textContent = pkgData.title;
      pkgDetailsEl.textContent = pkgData.details;
      pkgBanner.style.display = 'flex';
    }

    if (contactHeading) {
      contactHeading.textContent = 'Book the ' + pkgData.title;
    }

    if (callBtnText) {
      callBtnText.textContent = 'Call (630) 465-7063 to Book ' + pkgName;
    }

    if (textBtn) {
      textBtn.href = 'sms:+16304657063?body=' + encodeURIComponent(pkgData.smsText);
    }
    if (textBtnText) {
      textBtnText.textContent = 'Text Us About ' + pkgName + ' Package';
    }

    // Smooth scroll down to contact section with header offset
    var target = document.getElementById('quote');
    if (target) {
      var headerDock = document.getElementById('main-header');
      var headerH = headerDock ? headerDock.offsetHeight : 70;
      var targetTop = target.getBoundingClientRect().top + window.pageYOffset - (headerH + 20);

      window.scrollTo({
        top: Math.max(0, targetTop),
        behavior: 'smooth'
      });
      if (window.history && window.history.pushState) {
        window.history.pushState(null, null, '#quote');
      }

      var formPanel = target.querySelector('.vibez-form-panel') || target.querySelector('.form-panel') || target;
      if (formPanel) {
        formPanel.classList.remove('highlight-pulse');
        void formPanel.offsetWidth; // re-flow to restart animation
        formPanel.classList.add('highlight-pulse');
      }
    }

    // Trigger visual pulse glow on contact box
    if (contactBox) {
      contactBox.classList.remove('highlight-pulse');
      void contactBox.offsetWidth; // re-flow to restart animation
      contactBox.classList.add('highlight-pulse');
    }
  }

  // Hook up all Book Package buttons
  document.querySelectorAll('[data-select-pkg]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var pkgName = btn.getAttribute('data-select-pkg');
      if (pkgName) {
        selectAndScrollToPackage(pkgName);
      }
    });
  });

  // Clear package button
  if (clearPkgBtn) {
    clearPkgBtn.addEventListener('click', function () {
      if (pkgBanner) pkgBanner.style.display = 'none';
      if (contactHeading) contactHeading.textContent = 'Direct Booking & Date Availability';
      if (callBtnText) callBtnText.textContent = 'Call (630) 465-7063';
      if (textBtnText) textBtnText.textContent = 'Text Us Directly';
      if (textBtn) {
        textBtn.href = 'sms:+16304657063?body=' + encodeURIComponent("Hi! I would like to check availability and book Poured Up Vibez for an event.");
      }
    });
  }

  // Smooth scroll for internal anchor links (e.g. #quote, #contact, etc.)
  document.querySelectorAll('a[href^="#"]:not([href="#"]):not([href="#top"]):not([data-select-pkg])').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var hash = link.getAttribute('href');
      if (hash && hash.length > 1) {
        var target = document.querySelector(hash);
        if (target) {
          e.preventDefault();
          var headerDock = document.getElementById('main-header');
          var headerH = headerDock ? headerDock.offsetHeight : 70;
          var targetTop = target.getBoundingClientRect().top + window.pageYOffset - (headerH + 20);
          window.scrollTo({
            top: Math.max(0, targetTop),
            behavior: 'smooth'
          });
          if (window.history && window.history.pushState) {
            window.history.pushState(null, null, hash);
          }
          var targetBox = target.querySelector('.vibez-direct-contact-box, .service-direct-contact-box') || target;
          if (targetBox && targetBox.classList) {
            targetBox.classList.remove('highlight-pulse');
            void targetBox.offsetWidth;
            targetBox.classList.add('highlight-pulse');
          }
        }
      }
    });
  });

  // ---- Floating Call & Text Circle Widget ----
  var floatWidget = document.getElementById('floatingContactWidget');
  var floatTrigger = document.getElementById('floatingContactTrigger');
  var floatClose = document.getElementById('floatingCardClose');

  if (floatTrigger && floatWidget) {
    floatTrigger.addEventListener('click', function (e) {
      e.stopPropagation();
      floatWidget.classList.toggle('active');
    });

    if (floatClose) {
      floatClose.addEventListener('click', function (e) {
        e.stopPropagation();
        floatWidget.classList.remove('active');
      });
    }

    document.addEventListener('click', function (e) {
      if (!floatWidget.contains(e.target)) {
        floatWidget.classList.remove('active');
      }
    });
  }

  // ---- 6. Form Submission: Auto-format and submit directly to phone via SMS (630) 465-7063 ----
  document.querySelectorAll('form[data-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var requiredFields = form.querySelectorAll('[required]');
      var valid = true;
      requiredFields.forEach(function (field) {
        if (!field.value.trim()) {
          valid = false;
          field.focus();
        }
      });
      if (!valid) return;

      var pagePath = window.location.pathname.toLowerCase();
      var smsLines = [];

      var nameVal = (form.querySelector('#name') && form.querySelector('#name').value.trim()) || '';
      var phoneVal = (form.querySelector('#phone') && form.querySelector('#phone').value.trim()) || '';
      var emailVal = (form.querySelector('#email') && form.querySelector('#email').value.trim()) || '';
      var dateVal = (form.querySelector('#date') && form.querySelector('#date').value.trim()) || '';
      var guestsVal = (form.querySelector('#guests') && form.querySelector('#guests').value.trim()) || '';
      var locationVal = (form.querySelector('#location') && form.querySelector('#location').value.trim()) || '';
      var packageEl = form.querySelector('#package');
      var packageVal = '';
      if (packageEl) {
        if (packageEl.tagName === 'SELECT' && packageEl.selectedIndex >= 0) {
          packageVal = packageEl.options[packageEl.selectedIndex].text.replace(/\s+/g, ' ').trim();
        } else {
          packageVal = packageEl.value.trim();
        }
      }
      var serviceEl = form.querySelector('#service');
      var serviceVal = serviceEl ? (serviceEl.options ? serviceEl.options[serviceEl.selectedIndex].text : serviceEl.value).trim() : '';
      var applianceEl = form.querySelector('#appliance');
      var applianceVal = applianceEl ? (applianceEl.options ? applianceEl.options[applianceEl.selectedIndex].text : applianceEl.value).trim() : '';
      var brandVal = (form.querySelector('#brand') && form.querySelector('#brand').value.trim()) || '';
      var propertyEl = form.querySelector('#property');
      var propertyVal = propertyEl ? (propertyEl.options ? propertyEl.options[propertyEl.selectedIndex].text : propertyEl.value).trim() : '';
      var scopeEl = form.querySelector('#scope');
      var scopeVal = scopeEl ? (scopeEl.options ? scopeEl.options[scopeEl.selectedIndex].text : scopeEl.value).trim() : '';
      var detailsVal = (form.querySelector('#details') && form.querySelector('#details').value.trim()) ||
                       (form.querySelector('#message') && form.querySelector('#message').value.trim()) || '';

      if (pagePath.includes('vibez') || form.querySelector('#guests') || form.querySelector('#package')) {
        smsLines.push('🍹 POURED UP VIBEZ BOOKING REQUEST');
        if (nameVal) smsLines.push('• Name: ' + nameVal);
        if (phoneVal) smsLines.push('• Phone: ' + phoneVal);
        if (emailVal) smsLines.push('• Email: ' + emailVal);
        if (dateVal) smsLines.push('• Date: ' + dateVal);
        if (guestsVal) smsLines.push('• Guests: ' + guestsVal);
        if (locationVal) smsLines.push('• Location: ' + locationVal);
        if (packageVal) smsLines.push('• Package: ' + packageVal);
        if (detailsVal) smsLines.push('• Notes/Drinks: ' + detailsVal);
      } else if (pagePath.includes('security') || (serviceVal && serviceVal.toLowerCase().includes('security'))) {
        smsLines.push('🛡️ RODRIGUEZ SECURITY QUOTE REQUEST');
        if (nameVal) smsLines.push('• Name: ' + nameVal);
        if (emailVal) smsLines.push('• Email: ' + emailVal);
        if (serviceVal) smsLines.push('• Coverage Needed: ' + serviceVal);
        if (dateVal) smsLines.push('• Date: ' + dateVal);
        if (detailsVal) smsLines.push('• Details: ' + detailsVal);
      } else if (pagePath.includes('appliance') || applianceVal) {
        smsLines.push('🔧 APPLIANCE REPAIR SERVICE CALL');
        if (nameVal) smsLines.push('• Name: ' + nameVal);
        if (phoneVal) smsLines.push('• Phone: ' + phoneVal);
        if (applianceVal) smsLines.push('• Appliance: ' + applianceVal);
        if (brandVal) smsLines.push('• Brand/Model: ' + brandVal);
        if (detailsVal) smsLines.push('• Issue: ' + detailsVal);
      } else if (pagePath.includes('maintenance') || propertyVal) {
        smsLines.push('🏢 PROPERTY MAINTENANCE REQUEST');
        if (nameVal) smsLines.push('• Name: ' + nameVal);
        if (emailVal) smsLines.push('• Email: ' + emailVal);
        if (propertyVal) smsLines.push('• Property: ' + propertyVal);
        if (scopeVal) smsLines.push('• Scope: ' + scopeVal);
        if (detailsVal) smsLines.push('• Work Details: ' + detailsVal);
      } else {
        smsLines.push('📩 INQUIRY - RODRIGUEZ ENTERPRISES');
        if (nameVal) smsLines.push('• Name: ' + nameVal);
        if (emailVal) smsLines.push('• Email: ' + emailVal);
        if (serviceVal) smsLines.push('• Division: ' + serviceVal);
        if (detailsVal) smsLines.push('• Details: ' + detailsVal);
      }

      var smsBody = smsLines.join('\n');

      // Copy text to clipboard as safety fallback
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(smsBody).catch(function () {});
      }

      var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
      var smsUri = 'sms:+16304657063' + (isIOS ? '&' : '?') + 'body=' + encodeURIComponent(smsBody);

      var successEl = form.parentElement.querySelector('.form-success');
      if (successEl) {
        successEl.innerHTML =
          '<div style="font-size: 1.05rem; font-weight: 700; color: #4ade80; margin-bottom: 4px;">Opening your text app...</div>' +
          '<div style="margin-bottom: 10px; font-size: 0.9rem; color: var(--paper-dim);">If your messaging app did not open automatically, <a href="' + smsUri + '" style="color: #fff; text-decoration: underline; font-weight: 600;">tap here to send your text</a>.</div>';
        successEl.classList.add('show');
        successEl.setAttribute('tabindex', '-1');
        successEl.focus();
      }

      // Automatically launch native SMS application with prefilled message
      setTimeout(function () {
        window.location.href = smsUri;
      }, 200);
    });
  });

  // ---- 7. Poured Up Vibez — Video Hero Controls ----
  var heroVideo = document.getElementById('vibez-hero-video');
  var heroSoundToggle = document.getElementById('hero-sound-toggle');
  var heroSoundLabel = document.getElementById('hero-sound-label');
  var heroSoundIcon = document.getElementById('hero-sound-icon');

  if (heroVideo && heroSoundToggle) {
    heroSoundToggle.addEventListener('click', function () {
      if (heroVideo.muted) {
        heroVideo.muted = false;
        heroSoundLabel.textContent = 'Mute';
        heroSoundIcon.innerHTML = '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>';
      } else {
        heroVideo.muted = true;
        heroSoundLabel.textContent = 'Unmute';
        heroSoundIcon.innerHTML = '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line>';
      }
    });
  }

  // ---- 8. Poured Up Vibez — Reel Showcase & Filter Tabs ----
  var filterPills = document.querySelectorAll('.vibez-filter-pill');
  var reelCards = Array.from(document.querySelectorAll('.vibez-reel-card'));
  var moreReelCards = Array.from(document.querySelectorAll('#vibez-more-reel-grid .vibez-reel-card'));
  var reelModal = document.getElementById('reel-modal');
  var reelModalVideo = document.getElementById('reel-modal-video');
  var reelModalTitle = document.getElementById('reel-modal-title');
  var reelModalCaption = document.getElementById('reel-modal-caption');
  var reelModalClose = document.getElementById('reel-modal-close');
  var reelModalPrev = document.getElementById('reel-modal-prev');
  var reelModalNext = document.getElementById('reel-modal-next');

  var currentReelIndex = 0;
  var visibleReels = reelCards.slice();

  // Filter tab clicks (filters cards in #vibez-more-reel-grid)
  if (filterPills.length > 0) {
    filterPills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        filterPills.forEach(function (p) { p.classList.remove('active'); });
        pill.classList.add('active');

        var filter = pill.getAttribute('data-filter');

        moreReelCards.forEach(function (card) {
          var cat = card.getAttribute('data-category');
          if (filter === 'all' || cat === filter) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });

        // Sync visible reels for lightbox modal navigation
        visibleReels = reelCards.filter(function (card) {
          return !card.classList.contains('hidden');
        });
      });
    });
  }

  // Card hover video preview
  reelCards.forEach(function (card) {
    var previewVideo = card.querySelector('.reel-card-video-preview');

    card.addEventListener('mouseenter', function () {
      if (previewVideo) {
        card.classList.add('playing-preview');
        previewVideo.play().catch(function () {});
      }
    });

    card.addEventListener('mouseleave', function () {
      if (previewVideo) {
        card.classList.remove('playing-preview');
        previewVideo.pause();
        previewVideo.currentTime = 0;
      }
    });

    // Open in modal on click or Enter key
    function openThisCard() {
      var idx = visibleReels.indexOf(card);
      if (idx !== -1) {
        openReelModal(idx);
      }
    }

    card.addEventListener('click', openThisCard);
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openThisCard();
      }
    });
  });

  function openReelModal(index) {
    if (!reelModal || visibleReels.length === 0) return;
    currentReelIndex = (index + visibleReels.length) % visibleReels.length;
    var targetCard = visibleReels[currentReelIndex];

    var src = targetCard.getAttribute('data-video-src');
    var title = targetCard.getAttribute('data-title');
    var desc = targetCard.getAttribute('data-desc');

    if (reelModalVideo) {
      reelModalVideo.src = src;
      reelModalVideo.muted = false;
      reelModalVideo.currentTime = 0;
      reelModalVideo.play().catch(function () {
        // Autoplay policy fallback: mute and play
        reelModalVideo.muted = true;
        reelModalVideo.play().catch(function () {});
      });
    }

    if (reelModalTitle) reelModalTitle.innerHTML = title;
    if (reelModalCaption) reelModalCaption.innerHTML = desc;

    reelModal.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Pause hero video while modal is open
    if (heroVideo && !heroVideo.paused) {
      heroVideo.pause();
    }
  }

  function closeReelModal() {
    if (!reelModal) return;
    reelModal.classList.remove('open');
    document.body.style.overflow = '';
    if (reelModalVideo) {
      reelModalVideo.pause();
      reelModalVideo.src = '';
    }
    // Resume hero video
    if (heroVideo && heroVideo.paused) {
      heroVideo.play().catch(function () {});
    }
  }

  if (reelModalClose) {
    reelModalClose.addEventListener('click', function (e) {
      e.stopPropagation();
      closeReelModal();
    });
  }

  if (reelModal) {
    reelModal.addEventListener('click', function (e) {
      if (e.target === reelModal) {
        closeReelModal();
      }
    });
  }

  if (reelModalPrev) {
    reelModalPrev.addEventListener('click', function (e) {
      e.stopPropagation();
      openReelModal(currentReelIndex - 1);
    });
  }

  if (reelModalNext) {
    reelModalNext.addEventListener('click', function (e) {
      e.stopPropagation();
      openReelModal(currentReelIndex + 1);
    });
  }

  // Keyboard navigation for modal
  document.addEventListener('keydown', function (e) {
    if (reelModal && reelModal.classList.contains('open')) {
      if (e.key === 'Escape') {
        closeReelModal();
      } else if (e.key === 'ArrowLeft') {
        openReelModal(currentReelIndex - 1);
      } else if (e.key === 'ArrowRight') {
        openReelModal(currentReelIndex + 1);
      }
    }
  });

  // ---- 9. Field Gallery Lightbox & Filter Tabs (Repair & Maintenance) ----
  var uModal = document.getElementById('universal-modal');
  var uImg = document.getElementById('universal-modal-img');
  var uVideo = document.getElementById('universal-modal-video');
  var uTitle = document.getElementById('universal-modal-title');
  var uDesc = document.getElementById('universal-modal-desc');
  var uClose = document.getElementById('universal-modal-close');
  var uPrev = document.getElementById('universal-modal-prev');
  var uNext = document.getElementById('universal-modal-next');

  var fieldCards = Array.from(document.querySelectorAll('.field-card'));
  var fieldFilterPills = document.querySelectorAll('.field-filter-pill');
  var heroBgVideo = document.querySelector('.hero-bg-video');

  var currentFieldIndex = 0;
  var visibleFieldCards = fieldCards.slice();

  // Category filter tabs
  if (fieldFilterPills.length > 0) {
    fieldFilterPills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        fieldFilterPills.forEach(function (p) { p.classList.remove('active'); });
        pill.classList.add('active');

        var filter = pill.getAttribute('data-filter');

        fieldCards.forEach(function (card) {
          var cat = card.getAttribute('data-category');
          if (filter === 'all' || cat === filter) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });

        visibleFieldCards = fieldCards.filter(function (card) {
          return card.style.display !== 'none';
        });
      });
    });
  }

  function openUniversalModal(index) {
    if (!uModal || visibleFieldCards.length === 0) return;
    currentFieldIndex = (index + visibleFieldCards.length) % visibleFieldCards.length;
    var targetCard = visibleFieldCards[currentFieldIndex];

    var type = targetCard.getAttribute('data-media-type') || 'image';
    var src = targetCard.getAttribute('data-media-src');
    var title = targetCard.getAttribute('data-title');
    var desc = targetCard.getAttribute('data-desc');

    if (type === 'video') {
      if (uImg) uImg.style.display = 'none';
      if (uVideo) {
        uVideo.style.display = 'block';
        uVideo.src = src;
        uVideo.muted = false;
        uVideo.currentTime = 0;
        uVideo.play().catch(function () {
          uVideo.muted = true;
          uVideo.play().catch(function () {});
        });
      }
    } else {
      if (uVideo) {
        uVideo.pause();
        uVideo.src = '';
        uVideo.style.display = 'none';
      }
      if (uImg) {
        uImg.style.display = 'block';
        uImg.src = src;
        uImg.alt = title || '';
      }
    }

    if (uTitle) uTitle.textContent = title || '';
    if (uDesc) uDesc.textContent = desc || '';

    uModal.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Pause hero video
    if (heroBgVideo && !heroBgVideo.paused) {
      heroBgVideo.pause();
    }
  }

  function closeUniversalModal() {
    if (!uModal) return;
    uModal.classList.remove('open');
    document.body.style.overflow = '';
    if (uVideo) {
      uVideo.pause();
      uVideo.src = '';
      uVideo.style.display = 'none';
    }
    if (uImg) {
      uImg.src = '';
      uImg.style.display = 'none';
    }
    // Resume hero background video
    if (heroBgVideo && heroBgVideo.paused) {
      heroBgVideo.play().catch(function () {});
    }
  }

  // Bind click/keypress to cards
  fieldCards.forEach(function (card) {
    function handleOpen() {
      var idx = visibleFieldCards.indexOf(card);
      if (idx !== -1) {
        openUniversalModal(idx);
      }
    }
    card.addEventListener('click', handleOpen);
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleOpen();
      }
    });
  });

  if (uClose) {
    uClose.addEventListener('click', function (e) {
      e.stopPropagation();
      closeUniversalModal();
    });
  }

  if (uModal) {
    uModal.addEventListener('click', function (e) {
      if (e.target === uModal) {
        closeUniversalModal();
      }
    });
  }

  if (uPrev) {
    uPrev.addEventListener('click', function (e) {
      e.stopPropagation();
      openUniversalModal(currentFieldIndex - 1);
    });
  }

  if (uNext) {
    uNext.addEventListener('click', function (e) {
      e.stopPropagation();
      openUniversalModal(currentFieldIndex + 1);
    });
  }

  // Global keydown for universal modal
  document.addEventListener('keydown', function (e) {
    if (uModal && uModal.classList.contains('open')) {
      if (e.key === 'Escape') {
        closeUniversalModal();
      } else if (e.key === 'ArrowLeft') {
        openUniversalModal(currentFieldIndex - 1);
      } else if (e.key === 'ArrowRight') {
        openUniversalModal(currentFieldIndex + 1);
      }
    }
  });

});

