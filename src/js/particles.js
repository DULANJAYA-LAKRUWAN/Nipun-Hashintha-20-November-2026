let heroCanvas, heroCtx;
let heroParticles = [];
let heroAnimationFrame;

function initParticles() {
  heroCanvas = document.getElementById('hero-canvas');
  if (!heroCanvas) return;
  
  heroCtx = heroCanvas.getContext('2d');
  
  resizeHeroCanvas();
  window.addEventListener('resize', resizeHeroCanvas);
  
  initHeroParticles();
  animateHeroParticles();
}

function resizeHeroCanvas() {
  if (!heroCanvas) return;
  
  heroCanvas.width = heroCanvas.offsetWidth;
  heroCanvas.height = heroCanvas.offsetHeight;
  
  // Reinitialize particles on resize
  initHeroParticles();
}

function initHeroParticles() {
  heroParticles = [];
  const particleCount = Math.min(Math.floor((heroCanvas.width * heroCanvas.height) / 9000), 50);
  
  for (let i = 0; i < particleCount; i++) {
    heroParticles.push({
      x: Math.random() * heroCanvas.width,
      y: Math.random() * heroCanvas.height,
      r: Math.random() * 1.2 + 0.2,
      a: Math.random() * 0.4 + 0.1,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.6 + 0.2,
      pulsePhase: Math.random() * Math.PI * 2
    });
  }
}

function animateHeroParticles() {
  function draw() {
    heroCtx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
    
    heroParticles.forEach(particle => {
      // Update pulse effect
      particle.pulsePhase += 0.02;
      const pulse = 1 + Math.sin(particle.pulsePhase) * 0.2;
      const currentR = particle.r * pulse;
      
      heroCtx.beginPath();
      heroCtx.arc(particle.x, particle.y, currentR, 0, Math.PI * 2);
      
      const gradient = heroCtx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, currentR * 2
      );
      gradient.addColorStop(0, `rgba(200, 162, 75, ${particle.a})`);
      gradient.addColorStop(1, `rgba(200, 162, 75, 0)`);
      heroCtx.fillStyle = gradient;
      
      heroCtx.fill();
      
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      if (particle.x < 0 || particle.x > heroCanvas.width) {
        particle.vx *= -1;
      }
      if (particle.y < 0 || particle.y > heroCanvas.height) {
        particle.vy *= -1;
      }
    });
    
    heroAnimationFrame = requestAnimationFrame(draw);
  }
  
  draw();
}

function stopParticles() {
  if (heroAnimationFrame) {
    cancelAnimationFrame(heroAnimationFrame);
  }
  heroAnimationFrame = null;
  heroParticles = [];
}

// Export for use in main.js
export { initParticles, stopParticles };
