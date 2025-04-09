// notebooks.js - Place this in your public/scripts directory

// Enhanced Notebook Animations and Page Effects
document.addEventListener('DOMContentLoaded', function() {
    // Apply notebook effects to pages
    addNotebookEffects();
    
    // Re-apply effects when new content loads via AJAX/SPA navigation
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.addedNodes.length) {
          // Small delay to ensure nodes are fully rendered
          setTimeout(addNotebookEffects, 100);
        }
      });
    });
    
    // Start observing the document with the configured parameters
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Add skew effects to each notebook page
    function addNotebookEffects() {
      document.querySelectorAll('.notebook-page').forEach(page => {
        // Only add effects if they don't already exist
        if (!page.querySelector('.coffee-stain-1')) {
          // Add coffee stains with randomized positions
          const stain1 = document.createElement('div');
          stain1.className = 'coffee-stain coffee-stain-1';
          stain1.style.top = `${15 + Math.random() * 20}%`;
          stain1.style.right = `${10 + Math.random() * 15}%`;
          page.appendChild(stain1);
          
          const stain2 = document.createElement('div');
          stain2.className = 'coffee-stain coffee-stain-2';
          stain2.style.bottom = `${20 + Math.random() * 20}%`;
          stain2.style.left = `${15 + Math.random() * 15}%`;
          page.appendChild(stain2);
          
          if (window.innerWidth > 768) {
            const stain3 = document.createElement('div');
            stain3.className = 'coffee-stain coffee-stain-3';
            stain3.style.top = `${40 + Math.random() * 20}%`;
            stain3.style.left = `${30 + Math.random() * 20}%`;
            page.appendChild(stain3);
          }
          
          // Add fingerprints with randomized positions
          const fingerprint1 = document.createElement('div');
          fingerprint1.className = 'fingerprint fingerprint-1';
          fingerprint1.style.bottom = `${15 + Math.random() * 30}%`;
          fingerprint1.style.right = `${10 + Math.random() * 20}%`;
          fingerprint1.style.setProperty('--rotation', `${Math.random() * 90 - 45}deg`);
          page.appendChild(fingerprint1);
          
          const fingerprint2 = document.createElement('div');
          fingerprint2.className = 'fingerprint fingerprint-2';
          fingerprint2.style.top = `${20 + Math.random() * 30}%`;
          fingerprint2.style.left = `${25 + Math.random() * 20}%`;
          fingerprint2.style.setProperty('--rotation', `${Math.random() * 90 - 45}deg`);
          page.appendChild(fingerprint2);
          
          // Add corner fold
          const cornerFold = document.createElement('div');
          cornerFold.className = 'corner-fold';
          page.appendChild(cornerFold);
          
          // Randomly add paper clips to some pages (30% chance)
          if (Math.random() < 0.3) {
            const paperClip = document.createElement('div');
            paperClip.className = 'paper-clip';
            paperClip.style.right = `${20 + Math.random() * 30}%`;
            page.appendChild(paperClip);
          }
          
          // Add subtle random rotation to each page
          const baseRotation = page.classList.contains('notebook-page:nth-child(even)') ? 0.7 : -1;
          const randomRotation = baseRotation + (Math.random() * 0.6 - 0.3);
          page.style.transform = `rotate(${randomRotation}deg)`;
          page.style.setProperty('--base-rotation', `${randomRotation}deg`);
        }
      });
      
      // Apply similar effects to article cards, recipe cards, etc.
      document.querySelectorAll('.recipe-card, .skill-item, .feature-card').forEach(card => {
        if (!card.querySelector('.corner-fold')) {
          // Add corner fold to cards
          const cornerFold = document.createElement('div');
          cornerFold.className = 'corner-fold';
          cornerFold.style.borderTopWidth = '30px'; // Smaller fold for cards
          cornerFold.style.borderLeftWidth = '30px';
          card.appendChild(cornerFold);
          
          // Randomly add a coffee stain to some cards (20% chance)
          if (Math.random() < 0.2) {
            const stain = document.createElement('div');
            stain.className = 'coffee-stain';
            stain.style.width = '50px';
            stain.style.height = '40px';
            stain.style.top = `${Math.random() * 70}%`;
            stain.style.right = `${Math.random() * 70}%`;
            stain.style.setProperty('--rotation', `${Math.random() * 90 - 45}deg`);
            stain.style.opacity = '0.3'; // More subtle on cards
            card.appendChild(stain);
          }
          
          // Add subtle random rotation to each card if not already set
          if (!card.style.transform || card.style.transform === 'none') {
            const isEven = Array.from(card.parentNode.children).indexOf(card) % 2 === 0;
            const baseRotation = isEven ? 0.5 : -0.5;
            const randomRotation = baseRotation + (Math.random() * 0.4 - 0.2);
            card.style.transform = `rotate(${randomRotation}deg)`;
            card.style.setProperty('--base-rotation', `${randomRotation}deg`);
          }
        }
      });
    }
  
    // Add scroll-triggered animations
    function handleScrollAnimations() {
      const elements = document.querySelectorAll('.notebook-page, .recipe-card, .skill-item');
      
      elements.forEach(element => {
        // Check if element is in viewport
        const rect = element.getBoundingClientRect();
        const isInViewport = (
          rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.9 &&
          rect.bottom >= 0
        );
        
        if (isInViewport && !element.classList.contains('animated-in')) {
          element.classList.add('animated-in');
        }
      });
    }
    
    // Mobile optimization - detect touch devices
    function setupMobileInteractions() {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      if (isTouchDevice) {
        document.body.classList.add('touch-device');
        
        // Make hover effects work with touch on mobile
        document.querySelectorAll('.notebook-page, .recipe-card').forEach(element => {
          element.addEventListener('touchstart', function() {
            // Remove active class from all elements
            document.querySelectorAll('.touch-active').forEach(el => {
              if (el !== element) el.classList.remove('touch-active');
            });
            
            // Toggle active class on current element
            element.classList.toggle('touch-active');
          });
        });
      }
    }
    
    // Initialize all effects
    window.addEventListener('load', function() {
      addNotebookEffects();
      handleScrollAnimations();
      setupMobileInteractions();
      
      // Listen for scroll events for animations
      window.addEventListener('scroll', handleScrollAnimations, { passive: true });
    });
  });