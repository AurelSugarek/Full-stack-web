document.addEventListener('DOMContentLoaded', function() {
  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  const backToTop = document.querySelector('.back-to-top');
  const themeToggle = document.querySelector('.theme-toggle');
  const loadingScreen = document.querySelector('.loading');
  
  // Loading screen
  setTimeout(() => {
    loadingScreen.classList.add('hidden');
  }, 1000);
  
  // Navbar scroll effect
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
      backToTop.classList.add('visible');
    } else {
      navbar.classList.remove('scrolled');
      backToTop.classList.remove('visible');
    }
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
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
  backToTop.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Dark/Light theme toggle
  themeToggle.addEventListener('click', function() {
    document.documentElement.setAttribute('data-theme', 
      document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
    );
    
    // Toggle icon
    const icon = this.querySelector('i');
    if (icon) {
      icon.className = document.documentElement.getAttribute('data-theme') === 'dark' 
        ? 'fas fa-sun' 
        : 'fas fa-moon';
    }
    
    // Save preference to localStorage
    localStorage.setItem('theme', document.documentElement.getAttribute('data-theme'));
  });
  
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  // Set initial icon
  const icon = themeToggle.querySelector('i');
  if (icon) {
    icon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }
  
  // Animate skills on scroll
  const skillBars = document.querySelectorAll('.skill-progress');
  const animateSkills = () => {
    skillBars.forEach(bar => {
      const width = bar.getAttribute('data-width');
      bar.style.width = '0';
      setTimeout(() => {
        bar.style.width = width;
      }, 100);
    });
  };
  
  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        
        // Animate skill bars when skills section is in view
        if (entry.target.id === 'skills') {
          animateSkills();
        }
        
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe all sections
  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });
  
  // Initialize skill bars with data attributes
  skillBars.forEach(bar => {
    const width = bar.parentElement.getAttribute('data-percent');
    bar.setAttribute('data-width', width);
  });
  
  // Form submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const form = this;
      const submitButton = form.querySelector('button[type="submit"]');
      const responseMessage = document.getElementById('response-message');
      const formData = new FormData(form);
      
      // Disable button and show loading state
      submitButton.disabled = true;
      submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';
      responseMessage.textContent = '';
      responseMessage.className = '';
      
      // Simulate form submission (replace with actual form submission)
      setTimeout(() => {
        // This is a simulation - replace with actual fetch/AJAX call
        const isSuccess = Math.random() > 0.5;
        
        if (isSuccess) {
          responseMessage.textContent = 'Thank you! Your message has been sent successfully.';
          responseMessage.className = 'text-success';
          form.reset();
        } else {
          responseMessage.textContent = 'Oops! Something went wrong. Please try again later.';
          responseMessage.className = 'text-danger';
        }
        
        // Re-enable button
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
        
        // Hide message after 5 seconds
        setTimeout(() => {
          responseMessage.textContent = '';
          responseMessage.className = '';
        }, 5000);
      }, 1500);
    });
  }
  
  // Initialize tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function(tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
  
  // Initialize popovers
  const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
  popoverTriggerList.map(function(popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
  });
  
  // Add animation to project cards on hover
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const angleX = (y - centerY) / 20;
      const angleY = (centerX - x) / 20;
      
      this.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
  });
  
  // Add animation to skill cards on hover
  const skillCards = document.querySelectorAll('.skill-category');
  skillCards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const angleX = (y - centerY) / 30;
      const angleY = (centerX - x) / 30;
      
      this.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.02, 1.02, 1.02)`;
      this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      this.style.boxShadow = 'var(--box-shadow)';
    });
  });
  
  // Add parallax effect to hero section
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('mousemove', function(e) {
      const x = (window.innerWidth - e.pageX * 0.5) / 100;
      const y = (window.innerHeight - e.pageY * 0.5) / 100;
      hero.style.backgroundPosition = `${x}px ${y}px`;
    });
  }
  
  // Animate numbers in stats
  const animateNumbers = () => {
    const counters = document.querySelectorAll('.counter');
    const speed = 200;
    
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const increment = target / speed;
      
      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(animateNumbers, 1);
      } else {
        counter.innerText = target;
      }
    });
  };
  
  // Check if stats section is in view
  const statsSection = document.getElementById('stats');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateNumbers();
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
  }
  
  // Add smooth page transitions
  document.querySelectorAll('a:not([href^="#"], [target="_blank"])').forEach(link => {
    link.addEventListener('click', function(e) {
      if (this.href && this.href !== '#' && !this.href.startsWith('mailto:') && !this.href.startsWith('tel:')) {
        e.preventDefault();
        
        // Add loading class to body
        document.body.classList.add('page-transition');
        
        // Navigate after a short delay
        setTimeout(() => {
          window.location.href = this.href;
        }, 300);
      }
    });
  });
  
  // Handle page load animations
  window.addEventListener('load', function() {
    document.body.classList.add('page-loaded');
  });
});
