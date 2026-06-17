// Gallery.js - Placeholder for gallery functionality
// This file provides basic gallery interaction for the wedding invitation

document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery img');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            this.classList.toggle('expanded');
        });
    });
});