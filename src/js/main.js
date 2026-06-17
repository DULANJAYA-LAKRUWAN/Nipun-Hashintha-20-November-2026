import './css/variables.css';
import './css/base.css';
import './css/components.css';
import './css/animations.css';
import './css/responsive.css';

import { initOpeningSequence } from './js/intro.js';
import { initCountdown } from './js/countdown.js';
import { initParticles } from './js/particles.js';
import { initGallery } from './js/gallery.js';
import { initRSVP } from './js/rsvp.js';
import { initSmoothScroll } from './js/smooth-scroll.js';

// Initialize all modules
function initApp() {
  // Initialize intro sequence first
  initOpeningSequence();
  
  // Initialize other modules after intro
  setTimeout(() => {
    initCountdown();
    initParticles();
    initGallery();
    initRSVP();
    initSmoothScroll();
    
    // Add scroll reveal observer
    initScrollReveal();
    
    // Trigger hero names animation
    initHeroAnimation();
  }, 2000);
}

// Initialize hero names animation
function initHeroAnimation() {
  const heroNames = document.querySelector('.hero-names');
  if (heroNames) {
    // Trigger animation after a brief delay to ensure opening screen has faded
    setTimeout(() => {
      heroNames.classList.add('loaded');
    }, 500);
  }
}

// Scroll reveal initialization
function initScrollReveal() {
  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe all reveal elements
  document.querySelectorAll('.reveal').forEach(element => {
    observer.observe(element);
  });
}

// Performance optimization
let resizeTimeout;
function handleResize() {
  if (resizeTimeout) clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    // Handle resize events
    initParticles();
  }, 250);
}

// Event listeners
window.addEventListener('resize', handleResize);

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// Error handling
window.addEventListener('error', (event) => {
  console.error('Application error:', event.error);
});

export { initApp };
