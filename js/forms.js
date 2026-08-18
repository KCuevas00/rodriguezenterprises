/**
 * Rodriguez Enterprises - Interactive Forms & Notifications
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Auto-select Service in Contact Form based on URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const selectedService = urlParams.get('service');
  const serviceDropdown = document.getElementById('service-select');
  
  if (selectedService && serviceDropdown) {
    serviceDropdown.value = selectedService;
  }

  // 2. Handle Form Submissions
  const forms = document.querySelectorAll('form.inquiry-form');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Submit';
      
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin"><circle cx="12" cy="12" r="10" stroke-opacity="0.25"/><path d="M12 2 a10 10 0 0 1 10 10"/></svg> Sending Inquiry...';
      }

      // Simulate API form submission delay
      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }

        // Show Toast Notification
        let toast = form.querySelector('.form-toast');
        if (!toast) {
          toast = document.createElement('div');
          toast.className = 'form-toast';
          form.insertBefore(toast, form.firstChild);
        }
        
        toast.innerHTML = '<strong>Thank you!</strong> Your request has been received. A representative from Rodriguez Enterprises will contact you shortly.';
        toast.classList.add('visible');

        // Reset form inputs
        form.reset();

        // Auto-scroll toast into view
        toast.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        // Hide toast after 7 seconds
        setTimeout(() => {
          toast.classList.remove('visible');
        }, 7000);
      }, 900);
    });
  });
});
