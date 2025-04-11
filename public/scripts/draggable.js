/**
 * Draggable Cards - Adds draggable functionality to feature cards
 */
document.addEventListener('DOMContentLoaded', function() {
  // Get all feature cards
  const featureCards = document.querySelectorAll('.feature-card');
  
  // Create paper sound effect for dragging
  const paperSound = new Audio();
  paperSound.src = '/sounds/paper-slide.mp3';
  paperSound.volume = 0.2;
  
  // Create drop sound effect
  const dropSound = new Audio();
  dropSound.src = '/sounds/paper-drop.mp3';
  dropSound.volume = 0.3;
  
  featureCards.forEach(card => {
    // Add draggable attributes and styling
    card.setAttribute('draggable', 'true');
    
    // Track position
    let isDragging = false;
    let initialX = 0;
    let initialY = 0;
    let initialTop = 0;
    let initialLeft = 0;
    
    // Add slight rotation for a more natural look
    const randomRotation = (Math.random() * 2 - 1) * 0.8; // Between -0.8 and 0.8 degrees
    card.style.transform = `rotate(${randomRotation}deg)`;
    
    // Add subtle shadow and z-index
    card.style.position = 'relative';
    card.style.zIndex = '1';
    card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease, z-index 0s';
    
    // Add a paper texture overlay for more tactile feel
    const textureOverlay = document.createElement('div');
    textureOverlay.classList.add('card-texture-overlay');
    textureOverlay.style.position = 'absolute';
    textureOverlay.style.top = '0';
    textureOverlay.style.left = '0';
    textureOverlay.style.right = '0';
    textureOverlay.style.bottom = '0';
    textureOverlay.style.pointerEvents = 'none';
    textureOverlay.style.backgroundImage = "url('data:image/svg+xml,%3Csvg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noise\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noise)\" opacity=\"0.08\"/%3E%3C/svg%3E')";
    textureOverlay.style.opacity = '0';
    textureOverlay.style.transition = 'opacity 0.3s';
    card.appendChild(textureOverlay);
    
    // To handle both mouse and touch events
    card.addEventListener('mousedown', startDrag);
    card.addEventListener('touchstart', handleTouch(startDrag));
    
    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', handleTouch(drag));
    
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', handleTouch(endDrag));
    
    // Preventing default drag behavior for links inside cards
    const links = card.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('mousedown', e => e.stopPropagation());
      link.addEventListener('touchstart', e => e.stopPropagation());
    });
    
    // When card is picked up
    function startDrag(e) {
      isDragging = true;
      
      // Get initial positions
      initialX = e.clientX || e.touches[0].clientX;
      initialY = e.clientY || e.touches[0].clientY;
      
      // Get current card position
      const rect = card.getBoundingClientRect();
      initialLeft = rect.left;
      initialTop = rect.top;
      
      // Enhance visual effect when dragging
      card.style.zIndex = '100';
      card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
      card.style.cursor = 'grabbing';
      
      // Show texture when dragging
      textureOverlay.style.opacity = '1';
      
      // Play paper sound
      if (paperSound) {
        paperSound.currentTime = 0;
        paperSound.play().catch(e => console.log('Audio play failed:', e));
      }
    }
    
    // During drag
    function drag(e) {
      if (!isDragging) return;
      
      // Prevent default behaviors
      e.preventDefault();
      
      // Calculate new position
      const currentX = e.clientX || e.touches[0].clientX;
      const currentY = e.clientY || e.touches[0].clientY;
      
      const deltaX = currentX - initialX;
      const deltaY = currentY - initialY;
      
      // Update card position with slight rotation for natural feel
      const dragRotation = deltaX * 0.02; // Small rotation based on horizontal movement
      card.style.transform = `translate(${deltaX}px, ${deltaY}px) rotate(${randomRotation + dragRotation}deg)`;
    }
    
    // When card is released
    function endDrag() {
      if (!isDragging) return;
      isDragging = false;
      
      // Animate card back to original position
      card.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease';
      card.style.transform = `rotate(${randomRotation}deg)`;
      card.style.boxShadow = '';
      card.style.zIndex = '1';
      card.style.cursor = 'grab';
      
      // Hide texture overlay
      textureOverlay.style.opacity = '0';
      
      // Play drop sound
      if (dropSound) {
        dropSound.currentTime = 0;
        dropSound.play().catch(e => console.log('Audio play failed:', e));
      }
      
      // Reset transition after animation
      setTimeout(() => {
        card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease, z-index 0s';
      }, 500);
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
  
  // Create directory for sound files if they don't exist
  const checkSounds = async () => {
    try {
      // These are placeholders - the actual sound files would need to be added to the project
      // and the paths updated accordingly
      console.log('Sound effects initialized for draggable cards');
    } catch (e) {
      console.log('Sound effects not available:', e);
    }
  };
  
  checkSounds();
});
