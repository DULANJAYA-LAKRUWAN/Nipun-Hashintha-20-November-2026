// Particles.js - Placeholder for particle effects
// This file provides basic particle animation for the wedding invitation

const particlesContainer = document.getElementById('particles-container');

if (particlesContainer) {
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        particlesContainer.appendChild(particle);
        
        setTimeout(() => particle.remove(), 5000);
    }
    
    setInterval(createParticle, 200);
}