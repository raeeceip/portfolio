/**
 * Draggable Cards - Optimized for performance
 */
document.addEventListener('DOMContentLoaded', function() {
  // Get all feature cards
  const featureCards = document.querySelectorAll('.feature-card');
  
  // Create paper sound effect for dragging - load only when needed
  let paperSound = null;
  let dropSound = null;
  
  const loadSounds = () => {
    if (!paperSound) {
      paperSound = new Audio();
      paperSound.src = '/sounds/paper-slide.mp3';
      paperSound.volume = 0.2;
    }
    
    if (!dropSound) {
      dropSound = new Audio();
      dropSound.src = '/sounds/paper-drop.mp3';
      dropSound.volume = 0.3;
    }
  };
  
  featureCards.forEach(card => {
    // Add draggable attributes and styling
    card.setAttribute('draggable', 'true');
    
    // Track position
    let isDragging = false;
    let initialX = 0;
    let initialY = 0;
    
    // Add slight rotation for a more natural look - use transform attribute
    const randomRotation = (Math.random() * 2 - 1) * 0.8; // Between -0.8 and 0.8 degrees
    card.style.transform = `rotate(${randomRotation}deg)`;
    
    // Add subtle shadow and z-index - applying only essential styles
    card.style.position = 'relative';
    card.style.zIndex = '1';
    
    // To handle both mouse and touch events
    card.addEventListener('mousedown', startDrag);
    card.addEventListener('touchstart', handleTouch(startDrag), {passive: true});
    
    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', handleTouch(drag), {passive: false});
    
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', handleTouch(endDrag), {passive: true});
    
    // Preventing default drag behavior for links inside cards
    const links = card.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('mousedown', e => e.stopPropagation());
      link.addEventListener('touchstart', e => e.stopPropagation(), {passive: true});
    });
    
    // When card is picked up
    function startDrag(e) {
      isDragging = true;
      
      // Load sounds only when needed
      loadSounds();
      
      // Get initial positions
      initialX = e.clientX || (e.touches && e.touches[0].clientX);
      initialY = e.clientY || (e.touches && e.touches[0].clientY);
      
      // Enhance visual effect when dragging - use minimal styling
      card.style.zIndex = '100';
      card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
      card.style.cursor = 'grabbing';
      
      // Play paper sound
      if (paperSound) {
        paperSound.currentTime = 0;
        paperSound.play().catch(e => console.log('Audio play failed:', e));
      }
    }
    
    // During drag - performance optimized
    function drag(e) {
      if (!isDragging) return;
      
      // Prevent default behaviors
      e.preventDefault();
      
      // Calculate new position
      const currentX = e.clientX || (e.touches && e.touches[0].clientX);
      const currentY = e.clientY || (e.touches && e.touches[0].clientY);
      
      if (!currentX || !currentY) return;
      
      const deltaX = currentX - initialX;
      const deltaY = currentY - initialY;
      
      // Optimize performance by using transform
      const dragRotation = deltaX * 0.02; // Small rotation based on horizontal movement
      card.style.transform = `translate(${deltaX}px, ${deltaY}px) rotate(${randomRotation + dragRotation}deg)`;
    }
    
    // When card is released
    function endDrag() {
      if (!isDragging) return;
      isDragging = false;
      
      // Animate card back to original position
      card.style.transform = `rotate(${randomRotation}deg)`;
      card.style.boxShadow = '';
      card.style.zIndex = '1';
      card.style.cursor = 'grab';
      
      // Play drop sound
      if (dropSound) {
        dropSound.currentTime = 0;
        dropSound.play().catch(e => console.log('Audio play failed:', e));
      }
    }
    
    // Helper to handle touch events
    function handleTouch(callback) {
      return function(e) {
        if (e.touches) {
          callback(e);
        }
      };
    }
    
    // Add visual cue that cards are draggable
    card.addEventListener('mouseenter', () => {
      card.style.cursor = 'grab';
      card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    });
    
    card.addEventListener('mouseleave', () => {
      if (!isDragging) {
        card.style.boxShadow = '';
      }
    });
  });
});
