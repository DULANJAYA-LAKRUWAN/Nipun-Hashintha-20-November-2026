let rsvpForm, formSuccess, whatsappBtn, emailBtn;
let confettiInterval;

function initRSVP() {
  rsvpForm = document.getElementById('rsvp-form');
  formSuccess = document.getElementById('form-success');
  whatsappBtn = document.querySelector('.btn-wa');
  emailBtn = document.querySelector('.btn-email');
  
  if (!rsvpForm) return;
  
  // Form submission
  rsvpForm.addEventListener('submit', handleFormSubmit);
  
  // WhatsApp button click
  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', handleWhatsAppClick);
  }
  
  // Email button click
  if (emailBtn) {
    emailBtn.addEventListener('click', handleEmailClick);
  }
  
  // Form field focus effects
  initFormFieldEffects();
}

function handleFormSubmit(e) {
  e.preventDefault();
  
  // Get form data
  const formData = new FormData(rsvpForm);
  const data = Object.fromEntries(formData);
  
  // Validate required fields
  if (!data.name || !data.phone || !data.guests) {
    showNotification('Please fill in all required fields', 'error');
    return;
  }
  
  // Show loading state
  const submitBtn = rsvpForm.querySelector('button[type="submit"]');
  if (submitBtn) {
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    submitBtn.style.transform = 'scale(0.98)';
  }
  
  // Simulate form submission
  setTimeout(() => {
    // Hide form
    rsvpForm.style.display = 'none';
    
    // Show success message
    formSuccess.classList.add('show');
    
    // Launch confetti celebration
    launchConfetti();
    
    // Reset button
    if (submitBtn) {
      submitBtn.textContent = 'Confirm Attendance';
      submitBtn.disabled = false;
      submitBtn.style.transform = '';
    }
    
    // Log form data (in real app, this would be sent to server)
    console.log('RSVP submitted:', data);
    
  }, 1500);
}

function handleWhatsAppClick(e) {
  e.preventDefault();
  
  const message = encodeURIComponent(
    'Hi Nipun & Hashintha, I\'d like to RSVP for your wedding on 20 Nov 2026. Please add me to the guest list!'
  );
  
  window.open(`https://wa.me/94716510928?text=${message}`, '_blank');
}

function handleEmailClick(e) {
  e.preventDefault();
  
  const subject = encodeURIComponent('RSVP for Nipun & Hashintha\'s Wedding');
  const body = encodeURIComponent(
    'Dear Nipun & Hashintha,\n\nI would like to confirm my attendance at your wedding on November 20, 2026.\n\nDetails:\n- Name: [Your Name]\n- Phone: [Your Phone]\n- Guests: [Number of Guests]\n- Dietary Requirements: [Any requirements]\n\nLooking forward to celebrating with you!\n\nBest regards,\n[Your Name]'
  );
  
  window.location.href = `mailto:nipun@example.com?subject=${subject}&body=${body}`;
}

function initFormFieldEffects() {
  const formInputs = rsvpForm.querySelectorAll('input, select, textarea');
  
  formInputs.forEach(input => {
    input.addEventListener('focus', (e) => {
      e.target.style.borderColor = 'var(--gold)';
      e.target.style.transform = 'translateY(-2px)';
      e.target.style.boxShadow = '0 4px 20px rgba(200, 162, 75, 0.15)';
    });
    
    input.addEventListener('blur', (e) => {
      e.target.style.borderColor = 'rgba(200, 162, 75, 0.2)';
      e.target.style.transform = '';
      e.target.style.boxShadow = '';
    });
  });
}

function launchConfetti() {
  const colors = ['#C8A24B', '#E2C97E', '#7A9082', '#D4B896', '#1A2820', '#F5F1E8'];
  const confettiCount = 80;
  
  for (let i = 0; i < confettiCount; i++) {
    setTimeout(() => {
      createConfettiPiece(colors);
    }, i * 30);
  }
}

function createConfettiPiece(colors) {
  const piece = document.createElement('div');
  piece.className = 'confetti-piece';
  
  const color = colors[Math.floor(Math.random() * colors.length)];
  const size = Math.random() * 6 + 3;
  const left = Math.random() * 100;
  const animationDuration = Math.random() * 2 + 2;
  const rotation = Math.random() * 360;
  const translateX = (Math.random() - 0.5) * 60;
  
  piece.style.cssText = `
    left: ${left}vw;
    background: ${color};
    width: ${size}px;
    height: ${size * 2}px;
    animation-duration: ${animationDuration}s;
    animation-delay: ${Math.random() * 0.5}s;
    transform: rotate(${rotation}deg) translateX(${translateX}px);
    border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
  `;
  
  document.body.appendChild(piece);
  
  setTimeout(() => {
    piece.remove();
  }, animationDuration * 1000);
}

function stopRSVP() {
  if (rsvpForm) {
    rsvpForm.style.display = 'block';
    formSuccess.classList.remove('show');
  }
  
  if (confettiInterval) {
    clearInterval(confettiInterval);
  }
  
  // Remove all confetti pieces
  document.querySelectorAll('.confetti-piece').forEach(piece => {
    piece.remove();
  });
}

function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: ${type === 'success' ? 'var(--gold)' : '#e74c3c'};
    color: ${type === 'success' ? 'var(--cream)' : 'white'};
    padding: 16px 32px;
    border-radius: 8px;
    z-index: 10000;
    font-family: var(--ff-sans);
    font-size: 0.875rem;
    font-weight: 500;
    letter-spacing: 0.1em;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    animation: slideUp 0.3s ease;
  `;
  
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideDown 0.3s ease';
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

@keyframes slideDown {
  from {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
  to {
    opacity: 0;
    transform: translateX(-50%) translateY(20px);
  }
}
`;
document.head.appendChild(style);

// Export for use in main.js
export { initRSVP, stopRSVP };
