let lightbox, lightboxImg, lightboxClose;
let currentImageIndex = 0;
let galleryItems = [];

function initGallery() {
  lightbox = document.getElementById('lightbox');
  lightboxImg = document.getElementById('lightbox-img');
  lightboxClose = document.querySelector('.lightbox-close');
  
  if (!lightbox || !lightboxImg) return;
  
  // Collect all gallery items
  galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
  
  // Add click event to each gallery item
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
  });
  
  // Close button event
  lightboxClose.addEventListener('click', closeLightbox);
  
  // Close on background click
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', handleLightboxKeyPress);
}

function openLightbox(index) {
  if (!lightbox || !lightboxImg) return;
  
  currentImageIndex = index;
  
  // Get the image source
  const imgSrc = galleryItems[index].querySelector('img').src;
  lightboxImg.src = imgSrc;
  
  // Add class to open lightbox
  lightbox.classList.add('open');
  
  // Prevent body scrolling
  document.body.style.overflow = 'hidden';
  
  // Animate image in
  setTimeout(() => {
    lightboxImg.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
    lightboxImg.style.transform = 'scale(1)';
  }, 10);
}

function closeLightbox() {
  if (!lightbox || !lightboxImg) return;
  
  // Animate image out
  lightboxImg.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
  lightboxImg.style.transform = 'scale(0.9) translateY(20px)';
  
  // Remove class to close lightbox
  setTimeout(() => {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }, 300);
}

function handleLightboxKeyPress(e) {
  if (!lightbox) return;
  
  switch (e.key) {
    case 'Escape':
      closeLightbox();
      break;
    case 'ArrowLeft':
      navigateLightbox(-1);
      break;
    case 'ArrowRight':
      navigateLightbox(1);
      break;
  }
}

function navigateLightbox(direction) {
  if (!lightbox || galleryItems.length === 0) return;
  
  currentImageIndex += direction;
  
  if (currentImageIndex < 0) {
    currentImageIndex = galleryItems.length - 1;
  } else if (currentImageIndex >= galleryItems.length) {
    currentImageIndex = 0;
  }
  
  const imgSrc = galleryItems[currentImageIndex].querySelector('img').src;
  
  // Animate out then in
  lightboxImg.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
  lightboxImg.style.transform = 'scale(0.9) translateY(20px) opacity 0';
  
  setTimeout(() => {
    lightboxImg.src = imgSrc;
    lightboxImg.style.transform = 'scale(1) translateY(0) opacity 1';
  }, 300);
}

function stopGallery() {
  if (lightbox) {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }
  
  document.removeEventListener('keydown', handleLightboxKeyPress);
}

// Export for use in main.js
export { initGallery, stopGallery };
