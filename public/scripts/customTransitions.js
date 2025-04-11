// Custom page transitions for notepad tear-off effect
document.addEventListener('DOMContentLoaded', () => {
  // Initialize the custom transition system
  initCustomTransitions();
  
  // Apply stored theme immediately to prevent flash
  applyStoredTheme();
});

// This function will be called on page load to set the correct theme
function applyStoredTheme() {
  // First try to get from localStorage (persistent theme preference)
  let theme = localStorage.getItem('theme');
  
  // If no theme is set in localStorage, check for OS preference
  if (!theme) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    theme = prefersDark ? 'dark' : 'light';
  }
  
  // If we're mid-transition, get from sessionStorage instead (takes precedence)
  const transitionTheme = sessionStorage.getItem('transitionTheme');
  if (transitionTheme) {
    theme = transitionTheme;
  }
  
  // Apply the theme immediately
  document.documentElement.classList.remove('light', 'dark');
  document.documentElement.classList.add(theme);
  document.documentElement.dataset.theme = theme;
  
  // Ensure we update the localStorage for consistency
  localStorage.setItem('theme', theme);
}

function initCustomTransitions() {
  // Add a transition overlay to the body to help with the animation timing
  const overlay = document.createElement('div');
  overlay.id = 'transition-overlay';
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: transparent;
    z-index: 9999;
    pointer-events: none;
    opacity: 0;
    display: none;
  `;
  document.body.appendChild(overlay);
  
  // Apply initial styles
  document.body.classList.add('page-transition-complete');
  
  // Track if a transition is currently happening
  window.isTransitioning = false;
  
  // We'll use this to store the current URL for comparison
  let currentUrl = window.location.href;
  
  // Fix for back/forward navigation - handle popstate events properly
  window.addEventListener('popstate', (event) => {
    if (!window.isTransitioning) {
      // When user presses back/forward button
      const targetUrl = window.location.href;
      navigateWithTransition(targetUrl, true);
      
      // Prevent default navigation
      event.preventDefault();
    }
  });
  
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

function navigateWithTransition(url, isHistoryNavigation = false) {
  // Set transitioning flag
  window.isTransitioning = true;
  
  // Get the current theme - make sure to use documentElement class, 
  // NOT just the dataset attribute which might be stale
  const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  
  // Show the overlay to prevent content flash
  const overlay = document.getElementById('transition-overlay');
  if (overlay) {
    overlay.style.display = 'block';
  }
  
  // Special handling for pagination links to ensure query params are preserved
  const urlObj = new URL(url);
  const pageParam = urlObj.searchParams.get('page');
  
  // Store all this data for the next page
  localStorage.setItem('theme', currentTheme); // Ensure persistent storage
  sessionStorage.setItem('transitionTheme', currentTheme);
  sessionStorage.setItem('fromUrl', window.location.href);
  sessionStorage.setItem('isTransitioning', 'true');
  if (pageParam) {
    sessionStorage.setItem('pageParam', pageParam);
  }
  
  // Store navigation type in session
  sessionStorage.setItem('isHistoryNavigation', isHistoryNavigation ? 'true' : 'false');
  
  // Start tear-off animation
  document.body.classList.remove('page-transition-complete');
  document.body.classList.add('page-transition-start');
  
  // Delay actual navigation to allow animation to complete - using much faster timing
  setTimeout(() => {
    // Navigate to new page
    if (isHistoryNavigation) {
      // For back/forward navigation, we replace the current history entry
      window.location.replace(url);
    } else {
      // For normal navigation, we add a new history entry
      // Use history API to properly track state for back button
      history.pushState({ source: 'customTransition' }, '', url);
      window.location.href = url;
    }
  }, 250); // Match this timing with CSS animation duration (much faster)
}

// When page loads, handle incoming transitions
window.addEventListener('load', () => {
  // Apply stored theme from the transition
  applyStoredTheme();
  
  // Special handling for pagination
  const pageParam = sessionStorage.getItem('pageParam');
  const currentUrl = new URL(window.location.href);
  const isHistoryNavigation = sessionStorage.getItem('isHistoryNavigation') === 'true';
  
  if (pageParam && !currentUrl.searchParams.has('page') && currentUrl.pathname === '/blog') {
    // If we're on the blog page and should have a page parameter but don't,
    // this is likely due to a navigation issue - add it now
    currentUrl.searchParams.set('page', pageParam);
    
    // Redirect without animation
    window.isTransitioning = true;
    window.location.replace(currentUrl.toString());
    sessionStorage.removeItem('pageParam');
    sessionStorage.removeItem('isHistoryNavigation');
    return;
  } else if (pageParam) {
    // We successfully navigated with the page param
    sessionStorage.removeItem('pageParam');
  }
  
  // Add a slight initial delay to ensure content is hidden during transition in
  if (sessionStorage.getItem('isTransitioning') === 'true') {
    // Hide content initially
    document.body.style.opacity = '0';
    
    // Delay showing content - much shorter delay for faster appearance
    setTimeout(() => {
      // Now fade in content quickly
      document.body.style.opacity = '1';
      document.body.style.transition = 'opacity 150ms ease-in';
      
      // Play the incoming transition after content is visible
      document.body.classList.remove('page-transition-start');
      document.body.classList.add('page-transition-complete');
      
      // Remove transitioning flag
      window.isTransitioning = false;
      sessionStorage.removeItem('isTransitioning');
      sessionStorage.removeItem('fromUrl');
      sessionStorage.removeItem('isHistoryNavigation');
      
      // Force theme application again to ensure consistency
      applyStoredTheme();
    }, 20);
  } else {
    // Direct page load (no transition)
    document.body.classList.remove('page-transition-start');
    document.body.classList.add('page-transition-complete');
    window.isTransitioning = false;
  }
  
  // Hide the overlay if present
  const overlay = document.getElementById('transition-overlay');
  if (overlay) {
    setTimeout(() => {
      overlay.style.display = 'none';
    }, 300); // After all transitions complete
  }
});
