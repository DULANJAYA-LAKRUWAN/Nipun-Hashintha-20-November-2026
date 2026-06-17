import './css/animations.css';

let openingCanvas, openingCtx;
let openingAnimationFrame;
let openingParticles = [];
let openingLineElement;
let openingSubtitleElement;
let openingDateElement;
let openingButtonElement;
let openingElement;

function initOpeningSequence() {
  // Cache DOM elements
  openingCanvas = document.getElementById('opening-canvas');
  if (!openingCanvas) return;

  openingElement = document.getElementById('opening');
  openingCtx = openingCanvas.getContext('2d');
  openingLineElement = document.getElementById('op-line');
  openingSubtitleElement = document.getElementById('op-subtitle');
  openingDateElement = document.getElementById('op-date');
  openingButtonElement = document.getElementById('op-btn');

  // Set up canvas
  resizeOpeningCanvas();
  window.addEventListener('resize', resizeOpeningCanvas);

  // Initialize particles
  initOpeningParticles();

  // Start animation loop
  animateOpeningParticles();

  // Start text reveal sequence
  startOpeningTextSequence();
}

function resizeOpeningCanvas() {
  openingCanvas.width = window.innerWidth;
  openingCanvas.height = window.innerHeight;
}

function initOpeningParticles() {
  openingParticles = [];
  const particleCount = Math.min(Math.floor(window.innerWidth / 8), 100);

  for (let i = 0; i < particleCount; i++) {
    openingParticles.push({
      x: Math.random() * openingCanvas.width,
      y: Math.random() * openingCanvas.height,
      r: Math.random() * 1.5 + 0.3,
      a: Math.random() * 0.5 + 0.1,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      gold: Math.random() > 0.5,
      opacity: Math.random() * 0.8 + 0.2
    });
  }
}

function animateOpeningParticles() {
  function draw() {
    openingCtx.clearRect(0, 0, openingCanvas.width, openingCanvas.height);

    openingParticles.forEach(particle => {
      openingCtx.beginPath();
      openingCtx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);

      if (particle.gold) {
        const gradient = openingCtx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.r * 3
        );
        gradient.addColorStop(0, `rgba(200, 162, 75, ${particle.a})`);
        gradient.addColorStop(1, `rgba(200, 162, 75, 0)`);
        openingCtx.fillStyle = gradient;
      } else {
        openingCtx.fillStyle = `rgba(26, 40, 32, ${particle.a * 0.4})`;
      }

      openingCtx.fill();

      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < 0 || particle.x > openingCanvas.width) {
        particle.vx *= -1;
      }
      if (particle.y < 0 || particle.y > openingCanvas.height) {
        particle.vy *= -1;
      }

      // Add glow effect for gold particles
      if (particle.gold) {
        openingCtx.shadowColor = 'rgba(200, 162, 75, 0.8)';
        openingCtx.shadowBlur = 10;
        openingCtx.fill();
        openingCtx.shadowColor = 'transparent';
        openingCtx.shadowBlur = 0;
      }
    });

    openingAnimationFrame = requestAnimationFrame(draw);
  }

  draw();
}

function startOpeningTextSequence() {
  // Add loaded class to trigger CSS animations
  setTimeout(() => {
    if (openingElement) {
      openingElement.classList.add('loaded');
    }
  }, 100);

  // Line expansion
  setTimeout(() => {
    openingLineElement.style.transition = 'width 1.2s cubic-bezier(0.25, 1, 0.5, 1)';
    openingLineElement.style.width = '280px';
  }, 1800);

  // Subtitle reveal
  setTimeout(() => {
    openingSubtitleElement.style.transition = 'all 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
    openingSubtitleElement.style.opacity = '1';
    openingSubtitleElement.style.transform = 'translateY(0)';
  }, 2200);

  // Date reveal
  setTimeout(() => {
    openingDateElement.style.transition = 'all 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
    openingDateElement.style.opacity = '1';
    openingDateElement.style.transform = 'translateY(0)';
  }, 2600);

  // Button slide up
  setTimeout(() => {
    openingButtonElement.style.transition = 'all 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
    openingButtonElement.style.opacity = '1';
    openingButtonElement.style.transform = 'translateY(0)';
  }, 3100);
}

function stopOpeningSequence() {
  if (openingAnimationFrame) {
    cancelAnimationFrame(openingAnimationFrame);
  }
  openingAnimationFrame = null;
  openingParticles = [];
}

// Export for use in main.js
export { initOpeningSequence, stopOpeningSequence };
