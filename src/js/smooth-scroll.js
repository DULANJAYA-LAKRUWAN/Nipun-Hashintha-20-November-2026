let smoothScrollEnabled = true;
let scrollTimeout;
let currentScrollY = 0;
let targetScrollY = 0;
let scrollVelocity = 0;

function initSmoothScroll() {
  // Update current scroll position
  currentScrollY = window.pageYOffset;
  
  // Set up scroll event listener
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  // Set up resize event listener
  window.addEventListener('resize', handleResize);
  
  // Initialize scroll position
  updateScrollPosition();
}

function handleScroll() {
  if (!smoothScrollEnabled) return;
  
  const newScrollY = window.pageYOffset;
  const scrollDifference = newScrollY - currentScrollY;
  
  // Calculate velocity
  scrollVelocity = Math.abs(scrollDifference) / (scrollDifference || 1);
  
  // Update current position
  currentScrollY = newScrollY;
  
  // Update target position
  targetScrollY = newScrollY;
  
  // Apply smooth scroll
  applySmoothScroll();
  
  // Update nav based on scroll
  updateNavOnScroll();
}

function applySmoothScroll() {
  const scrollStep = Math.max(1, Math.floor(scrollVelocity * 16));
  const scrollDifference = targetScrollY - currentScrollY;
  
  if (Math.abs(scrollDifference) < scrollStep) {
    // Snap to target
    window.scrollTo(0, targetScrollY);
    currentScrollY = targetScrollY;
  } else {
    // Smooth scroll
    currentScrollY += scrollStep * Math.sign(scrollDifference);
    window.scrollTo(0, currentScrollY);
  }
}

function updateNavOnScroll() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}

function handleResize() {
  // Recalculate scroll position on resize
  currentScrollY = window.pageYOffset;
  targetScrollY = currentScrollY;
}

function updateScrollPosition() {
  currentScrollY = window.pageYOffset;
  targetScrollY = currentScrollY;
}

function stopSmoothScroll() {
  smoothScrollEnabled = false;
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('resize', handleResize);
}

function enableSmoothScroll() {
  smoothScrollEnabled = true;
  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', handleResize);
}

// Export for use in main.js
export { initSmoothScroll, stopSmoothScroll, enableSmoothScroll };
