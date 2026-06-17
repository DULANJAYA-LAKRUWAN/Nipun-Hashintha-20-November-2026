function initCountdown() {
  const targetDate = new Date('2026-11-20T15:30:00+05:30');
  
  function updateCountdown() {
    const now = new Date();
    const diff = targetDate - now;
    
    if (diff <= 0) {
      // Wedding day - show celebration message
      updateCountdownDisplay(0, 0, 0, 0);
      return;
    }
    
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    
    updateCountdownDisplay(days, hours, minutes, seconds);
  }
  
  function updateCountdownDisplay(days, hours, minutes, seconds) {
    const elements = {
      days: document.getElementById('cd-days'),
      hours: document.getElementById('cd-hours'),
      minutes: document.getElementById('cd-mins'),
      seconds: document.getElementById('cd-secs')
    };
    
    if (!elements.days) return;
    
    // Animate each number
    animateNumberChange(elements.days, days, 3);
    animateNumberChange(elements.hours, hours);
    animateNumberChange(elements.minutes, minutes);
    animateNumberChange(elements.seconds, seconds);
    
    // Add pulse effect to active time unit
    addPulseEffect(elements);
  }
  
  function animateNumberChange(element, value, pad = 2) {
    if (!element) return;
    
    const currentValue = element.textContent;
    const targetValue = String(value).padStart(pad, '0');
    
    if (currentValue !== targetValue) {
      element.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
      element.style.transform = 'scale(1.1)';
      element.style.color = 'var(--gold-light)';
      
      setTimeout(() => {
        element.textContent = targetValue;
        element.style.transform = 'scale(1)';
        element.style.color = '';
      }, 100);
    }
  }
  
  function addPulseEffect(elements) {
    // Find which time unit is most relevant
    const now = new Date();
    const diff = targetDate - now;
    const hoursLeft = Math.floor(diff / 3600000);
    
    if (hoursLeft < 24 && hoursLeft > 0) {
      // Less than a day - pulse days
      elements.days.style.animation = 'pulse 1s ease infinite';
    } else if (hoursLeft < 2 && hoursLeft > 0) {
      // Less than 2 hours - pulse hours
      elements.hours.style.animation = 'pulse 1s ease infinite';
    } else if (hoursLeft < 0.1 && hoursLeft > 0) {
      // Less than 6 minutes - pulse minutes
      elements.minutes.style.animation = 'pulse 1s ease infinite';
    } else {
      // Normal state
      Object.values(elements).forEach(el => {
        if (el) el.style.animation = '';
      });
    }
  }
  
  // Initial update
  updateCountdown();
  
  // Update every second
  return setInterval(updateCountdown, 1000);
}

// Export for use in main.js
export { initCountdown };
