// Navbar scroll effect
const navbar = document.querySelector('.navbar');
const backToTopBtn = document.querySelector('.back-to-top');

// Navbar scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Show/hide back to top button
  if (window.scrollY > 300) {
    backToTopBtn.classList.add('active');
  } else {
    backToTopBtn.classList.remove('active');
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 70,
        behavior: 'smooth'
      });
      
      // Close mobile menu if open
      const navbarCollapse = document.querySelector('.navbar-collapse');
      if (navbarCollapse.classList.contains('show')) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
        bsCollapse.hide();
      }
    }
  });
});

// Back to top button
backToTopBtn.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Form submission handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';
    
    // Simulate form submission (replace with actual AJAX call)
    setTimeout(() => {
      // Show success message
      const alertDiv = document.createElement('div');
      alertDiv.className = 'alert alert-success mt-3';
      alertDiv.role = 'alert';
      alertDiv.textContent = 'Your message has been sent successfully!';
      
      // Insert after form
      this.parentNode.insertBefore(alertDiv, this.nextSibling);
      
      // Reset form
      this.reset();
      
      // Reset button state
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
      
      // Remove success message after 5 seconds
      setTimeout(() => {
        alertDiv.remove();
      }, 5000);
    }, 1500);
  });
}

// Add animation on scroll
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.animate-on-scroll');
  
  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    
    if (elementPosition < screenPosition) {
      element.classList.add('animated');
    }
  });
};

// Initialize animations on page load
window.addEventListener('load', () => {
  // Add animation classes to elements
  document.querySelectorAll('.skill-card, .project-card, .contact-item').forEach((el, index) => {
    el.classList.add('animate-on-scroll');
    el.style.animationDelay = `${index * 0.1}s`;
  });
  
  // Trigger initial animation check
  animateOnScroll();
});

// Add scroll event listener for animations
window.addEventListener('scroll', animateOnScroll);

// Tooltip initialization
const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});

// Add smooth page load transition
document.body.style.opacity = '0';
window.addEventListener('load', () => {
  document.body.style.transition = 'opacity 0.5s ease-in-out';
  document.body.style.opacity = '1';
});
