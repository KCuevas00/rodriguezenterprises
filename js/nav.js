/**
 * Rodriguez Enterprises - Navigation & UI Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const navToggle = document.querySelector('.mobile-nav-toggle');
  const navDrawer = document.querySelector('.mobile-nav-drawer');

  // 1. Transparent-to-Solid Header on Scroll
  function updateScrollState() {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', updateScrollState, { passive: true });
  updateScrollState(); // Run immediately in case page loaded scrolled

  // 2. Mobile Nav Drawer Toggle
  if (navToggle && navDrawer) {
    navToggle.addEventListener('click', () => {
      const isOpen = navDrawer.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
      
      // Swap icon (Hamburger vs Close X)
      const svg = navToggle.querySelector('svg');
      if (svg) {
        if (isOpen) {
          svg.innerHTML = '<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>';
        } else {
          svg.innerHTML = '<line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>';
        }
      }
    });

    // Close drawer when clicking links inside
    navDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navDrawer.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // 3. Highlight Current Active Page Link
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const isHomepage = currentPath === 'index.html' || currentPath === '';

  document.querySelectorAll('.nav-item, .mobile-nav-item').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Logo active state — gold underline when on homepage
  const logoLink = document.querySelector('.brand-logo-center');
  if (logoLink && isHomepage) {
    logoLink.classList.add('active-home');
  }

  // 4. Dynamic Hero Slideshow & Navbar Service Hint Syncing
  const slidesTrack = document.querySelector('.slides-track');
  const slides = document.querySelectorAll('.hero-slide');
  const slideDots = document.querySelectorAll('.slide-dot');
  const prevBtn = document.getElementById('slide-prev');
  const nextBtn = document.getElementById('slide-next');
  let currentSlideIndex = 0;
  let slideInterval = null;

  if (slides.length > 0) {
    function goToSlide(index) {
      currentSlideIndex = (index + slides.length) % slides.length;

      // 1. Horizontal Slide Track Animation
      if (slidesTrack) {
        slidesTrack.style.transform = `translateX(-${currentSlideIndex * 25}%)`;
      }

      // 2. Active Dot Highlight
      slideDots.forEach((d, idx) => {
        d.classList.toggle('active', idx === currentSlideIndex);
      });

      // 3. Remove hint glow from all navbar items
      document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('slide-hint'));

      // 4. Add hint glow to active service link in navbar
      const targetSlide = slides[currentSlideIndex];
      if (targetSlide) {
        const navTargetId = targetSlide.getAttribute('data-nav');
        if (navTargetId) {
          const navEl = document.getElementById(navTargetId);
          if (navEl) navEl.classList.add('slide-hint');
        }

        // Update dynamic theme background glow on hero
        const theme = targetSlide.getAttribute('data-theme');
        const heroSection = document.getElementById('hub-hero');
        if (heroSection && theme) {
          heroSection.className = `hero-section hero-slideshow theme-${theme}`;
        }
      }
    }

    function nextSlide() {
      goToSlide(currentSlideIndex + 1);
    }

    function prevSlide() {
      goToSlide(currentSlideIndex - 1);
    }

    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetTimer(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetTimer(); });

    slideDots.forEach(dot => {
      dot.addEventListener('click', () => {
        const slideTo = parseInt(dot.getAttribute('data-slide-to'), 10);
        goToSlide(slideTo);
        resetTimer();
      });
    });

    function startTimer() {
      slideInterval = setInterval(nextSlide, 4500);
    }

    function resetTimer() {
      clearInterval(slideInterval);
      startTimer();
    }

    // Initialize first slide and start timer
    goToSlide(0);
    startTimer();
  }
});


