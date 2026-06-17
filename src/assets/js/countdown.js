// Luxury Wedding Website - Countdown

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

// Initialize countdown when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCountdown);
} else {
  initCountdown();
}