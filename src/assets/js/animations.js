// Luxury Wedding Website - Animations

// Opening Screen Animation
function initOpeningAnimation() {
  const openingScreen = document.getElementById('opening-screen');
  const scrollIndicator = document.querySelector('.scroll-indicator');
  
  // Trigger content reveal after opening animation
  setTimeout(() => {
    openingScreen.classList.add('hidden');
    
    // Allow scrolling after animation
    setTimeout(() => {
      openingScreen.style.pointerEvents = 'none';
      initScrollIndicator();
    }, 500);
  }, 7000);

  // Envelope hover effect
  const envelope = document.querySelector('.envelope');
  if (envelope) {
    envelope.addEventListener('click', () => {
      envelope.style.transform = 'scale(1.1)';
      setTimeout(() => {
        envelope.style.transform = 'scale(1)';
      }, 200);
    });
  }

  // Mouse movement interaction
  initMouseInteraction();
}

// Initialize mouse interaction for luxury effects
function initMouseInteraction() {
  const mouseInteraction = document.getElementById('mouse-interaction');
  const mouseDots = document.querySelectorAll('.mouse-dot');
  
  if (!mouseInteraction) return;

  let mouseX = 0;
  let mouseY = 0;
  let currentDot = 0;
  
  mouseInteraction.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Update mouse dot positions with delay
    mouseDots.forEach((dot, index) => {
      setTimeout(() => {
        dot.style.left = `${mouseX + (index * 10 - 5)}px`;
        dot.style.top = `${mouseY + (index * 10 - 5)}px`;
        dot.style.opacity = '0.6';
      }, index * 50);
    });
    
    // Clear opacity after delay
    setTimeout(() => {
      mouseDots.forEach(dot => {
        dot.style.opacity = '0';
      });
    }, 1500);
  });

  // Reset mouse interaction on mouse leave
  mouseInteraction.addEventListener('mouseleave', () => {
    mouseDots.forEach(dot => {
      dot.style.opacity = '0';
    });
  });
}

// Initialize scroll indicator
function initScrollIndicator() {
  const scrollIndicator = document.querySelector('.scroll-indicator');
  const scrollArrow = document.querySelector('.scroll-arrow');
  
  if (!scrollIndicator) return;

  let scrollY = 0;
  
  function animateScrollIndicator() {
    scrollY = (scrollY + 0.5) % 40;
    scrollArrow.style.transform = `translateY(${scrollY - 20}px)`;
    requestAnimationFrame(animateScrollIndicator);
  }
  
  animateScrollIndicator();

  // Smooth scroll to next section
  scrollIndicator.addEventListener('click', () => {
    const hero = document.getElementById('hero');
    if (hero) {
      hero.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}

// Initialize parallax effects
function initParallax() {
  const parallaxLayers = document.querySelectorAll('.parallax-layer');
  
  if (!parallaxLayers.length) return;

  let ticking = false;
  
  function updateParallax() {
    const scrollY = window.pageYOffset;
    
    parallaxLayers.forEach((layer, index) => {
      const speed = 0.5 + (index * 0.2);
      const yPos = -(scrollY * speed);
      layer.style.transform = `translateY(${yPos}px)`;
    });
    
    ticking = false;
  }
  
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }
  
  window.addEventListener('scroll', requestTick);
}

// Initialize floating elements
function initFloatingElements() {
  const floatingElements = document.querySelectorAll('.leaf, .gold-dot');
  
  floatingElements.forEach(element => {
    let x = 0;
    let y = 0;
    let vx = 0.1;
    let vy = 0.1;
    
    function animate() {
      x += vx;
      y += vy;
      
      // Boundary check
      if (x > window.innerWidth - 100 || x < 0) vx *= -1;
      if (y > window.innerHeight - 100 || y < 0) vy *= -1;
      
      element.style.transform = `translate(${x}px, ${y}px)`;
      requestAnimationFrame(animate);
    }
    
    animate();
  });
}

// Initialize intersection observer for reveal animations
function initIntersectionObserver() {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('.reveal').forEach(element => {
    observer.observe(element);
  });
}

// Initialize form validation and submission
function initRSVPForm() {
  const form = document.getElementById('rsvp-form');
  const submitBtn = document.getElementById('rsvp-submit');
  const successMessage = document.getElementById('form-success');
  
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Validate form
    const formData = new FormData(form);
    const name = formData.get('name');
    const phone = formData.get('phone');
    const guests = formData.get('guests');
    
    if (!name || !phone || !guests) {
      showNotification('Please fill in all required fields', 'error');
      return;
    }
    
    // Show loading state
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
      // Show success message
      form.style.display = 'none';
      successMessage.classList.add('active');
      
      // Reset button
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      
      // Confetti effect
      createConfetti();
    }, 1500);
  });

  // Email RSVP button
  const emailRsvpBtn = document.querySelector('.btn-email');
  if (emailRsvpBtn) {
    emailRsvpBtn.addEventListener('click', () => {
      showNotification('Email RSVP feature will be available soon!', 'info');
    });
  }
}

// Create confetti effect
function createConfetti() {
  const colors = ['#C8A24B', '#8AA294', '#F4F1E8', '#20302B'];
  const confettiCount = 50;
  
  for (let i = 0; i < confettiCount; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * window.innerWidth + 'px';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.width = Math.random() * 10 + 5 + 'px';
      confetti.style.height = Math.random() * 10 + 5 + 'px';
      confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
      
      document.body.appendChild(confetti);
      
      const angle = (Math.PI / 4) * (Math.random() - 0.5);
      const velocity = Math.random() * 5 + 2;
      const x = Math.cos(angle) * velocity;
      const y = Math.sin(angle) * velocity + 2;
      
      let posX = parseFloat(confetti.style.left);
      let posY = 0;
      let opacity = 1;
      
      function animateConfetti() {
        posX += x;
        posY += y;
        opacity -= 0.01;
        
        confetti.style.left = posX + 'px';
        confetti.style.top = posY + 'px';
        confetti.style.opacity = opacity;
        
        if (opacity > 0) {
          requestAnimationFrame(animateConfetti);
        } else {
          document.body.removeChild(confetti);
        }
      }
      
      animateConfetti();
    }, i * 50);
  }
}

// Show notification
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 16px 24px;
    background: ${type === 'error' ? '#ef4444' : type === 'success' ? '#10b981' : '#C8A24B'};
    color: white;
    border-radius: 8px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    font-family: var(--font-tertiary);
    font-size: 14px;
    font-weight: 500;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    animation: slideIn 0.3s ease forwards;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 10);
  
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Initialize gallery functionality
function initGallery() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const index = parseInt(item.dataset.index);
      openLightbox(index);
    });
  });
}

// Open lightbox
function openLightbox(index) {
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <div class="lightbox-content">
      <button class="lightbox-close">×</button>
      <img src="images/image${index + 1}.jpg" alt="Gallery image ${index + 1}" loading="lazy">
      <div class="lightbox-nav">
        <button class="lightbox-prev">‹</button>
        <button class="lightbox-next">›</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(lightbox);
  document.body.style.overflow = 'hidden';
  
  // Close lightbox
  const closeBtn = lightbox.querySelector('.lightbox-close');
  closeBtn.addEventListener('click', () => {
    document.body.removeChild(lightbox);
    document.body.style.overflow = '';
  });
  
  // Navigate images
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');
  
  prevBtn.addEventListener('click', () => {
    const newIndex = (index - 1 + 5) % 5;
    openLightbox(newIndex);
  });
  
  nextBtn.addEventListener('click', () => {
    const newIndex = (index + 1) % 5;
    openLightbox(newIndex);
  });
  
  // Close on background click
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      document.body.removeChild(lightbox);
      document.body.style.overflow = '';
    }
  });
}

// Add CSS animation for notification
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }
`;
document.head.appendChild(style);

// Initialize everything when DOM is ready
function init() {
  initOpeningAnimation();
  initParallax();
  initFloatingElements();
  initIntersectionObserver();
  initRSVPForm();
  initGallery();
  initCountdown();
}

// Countdown functionality (will be called from countdown.js)
function initCountdown() {
  const weddingDate = new Date('2026-11-20T00:00:00');
  
  function updateCountdown() {
    const now = new Date();
    const diff = Math.max(0, weddingDate - now);
    
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    
    // Update hero countdown
    const heroDays = document.getElementById('days');
    const heroHours = document.getElementById('hours');
    const heroMinutes = document.getElementById('minutes');
    const heroSeconds = document.getElementById('seconds');
    
    if (heroDays) heroDays.textContent = String(days).padStart(2, '0');
    if (heroHours) heroHours.textContent = String(hours).padStart(2, '0');
    if (heroMinutes) heroMinutes.textContent = String(minutes).padStart(2, '0');
    if (heroSeconds) heroSeconds.textContent = String(seconds).padStart(2, '0');
  }
  
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}