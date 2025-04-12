// Chiso's Cookbook - Cover Page Animation
// This script ensures the dramatic 2.5s cover page animation plays correctly for first-time visitors

document.addEventListener('DOMContentLoaded', function() {
  // Get cover page elements
  const coverPage = document.getElementById('notebook-cover');
  const spine = document.getElementById('notebook-spine');
  
  // Check if this is the first visit
  const hasVisitedBefore = localStorage.getItem('chisos_cookbook_visited');
  
  if (!hasVisitedBefore) {
    // First-time visitor - show the dramatic 2.5s animation
    console.log('First visit - showing cookbook cover animation');
    
    // Delay slightly to ensure everything is loaded
    setTimeout(() => {
      // Add the open class to trigger the animation
      coverPage.classList.add('open');
      
      // After animation completes, hide the cover completely
      setTimeout(() => {
        coverPage.style.display = 'none';
        spine.style.display = 'none';
        
        // Mark as visited for future visits
        localStorage.setItem('chisos_cookbook_visited', 'true');
      }, 2500); // Match this to the animation duration
    }, 100);
  } else {
    // Returning visitor - hide the cover immediately
    console.log('Return visitor - skipping cookbook cover animation');
    coverPage.style.display = 'none';
    spine.style.display = 'none';
  }
});
