// Custom page transitions for notepad tear-off effect
document.addEventListener('DOMContentLoaded', () => {
  // Initialize the custom transition system
  initCustomTransitions();
});

function initCustomTransitions() {
  // Apply initial styles
  document.body.classList.add('page-transition-complete');
  
  // Track if a transition is currently happening
  window.isTransitioning = false;
  
  // We'll use this to store the current URL for comparison
  let currentUrl = window.location.href;
  
  // Store the current theme for persistence through transitions
  const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  document.documentElement.dataset.theme = currentTheme;
  
  // Intercept all link clicks
  document.addEventListener('click', (event) => {
    // Check if a link was clicked
    const link = event.target.closest('a');
    if (!link) return;
    
    // Don't handle external links or links with modifiers
    if (
      link.target === '_blank' || 
      link.hasAttribute('download') || 
      link.href.startsWith('mailto:') || 
      link.href.startsWith('tel:') ||
      event.ctrlKey || 
      event.metaKey || 
      event.shiftKey
    ) {
      return;
    }
    
    // Make sure it's a local link
    try {
      const url = new URL(link.href);
      if (url.origin !== window.location.origin) return;
      
      // Don't transition to the same page
      if (url.href === currentUrl) {
        event.preventDefault();
        return;
      }
      
      // Prevent default navigation
      event.preventDefault();
      
      // Start custom transition if not already transitioning
      if (!window.isTransitioning) {
        navigateWithTransition(url.href);
      }
    } catch (e) {
      // Invalid URL, let browser handle it
      console.error("Navigation error:", e);
    }
  });
}

function navigateWithTransition(url) {
  // Set transitioning flag
  window.isTransitioning = true;
  
  // Store current theme and scroll position
  const currentTheme = document.documentElement.dataset.theme || 
                      (document.documentElement.classList.contains('dark') ? 'dark' : 'light');
  const scrollPosition = window.scrollY;
  
  // Store this data for the next page
  sessionStorage.setItem('transitionTheme', currentTheme);
  sessionStorage.setItem('fromUrl', window.location.href);
  
  // Start tear-off animation
  document.body.classList.remove('page-transition-complete');
  document.body.classList.add('page-transition-start');
  
  // Delay actual navigation to allow animation to complete
  setTimeout(() => {
    // Navigate to new page
    window.location.href = url;
  }, 600); // Match this timing with CSS animation duration
}

// When page loads, handle incoming transitions
window.addEventListener('load', () => {
  // Apply stored theme if coming from a transition
  const transitionTheme = sessionStorage.getItem('transitionTheme');
  if (transitionTheme) {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(transitionTheme);
    document.documentElement.dataset.theme = transitionTheme;
    
    // Clear storage after using
    setTimeout(() => {
      sessionStorage.removeItem('transitionTheme');
    }, 100);
  }
  
  // Play the incoming transition
  if (sessionStorage.getItem('fromUrl')) {
    // We came from another page through our system
    document.body.classList.remove('page-transition-start');
    
    // Delay showing completion animation to ensure page content is loaded
    setTimeout(() => {
      document.body.classList.add('page-transition-complete');
      window.isTransitioning = false;
      
      // Clear the fromUrl marker
      sessionStorage.removeItem('fromUrl');
    }, 50);
  } else {
    // Direct page load (no transition)
    document.body.classList.remove('page-transition-start');
    document.body.classList.add('page-transition-complete');
    window.isTransitioning = false;
  }
});
