// Custom page transitions for notepad tear-off effect
document.addEventListener('DOMContentLoaded', () => {
  // Initialize the custom transition system
  initCustomTransitions();
  
  // Apply stored theme immediately to prevent flash
  applyStoredTheme();
  
  // Handle first visit cover page display
  handleCoverPageDisplay();
});

// This function handles whether to show the cover page on first visit
function handleCoverPageDisplay() {
  const isFirstVisit = !localStorage.getItem('visited');
  if (isFirstVisit) {
    document.documentElement.classList.add('first-visit');
    localStorage.setItem('visited', 'true');
    
    // Hide the cover page after user interaction
    document.addEventListener('click', function hideCover() {
      document.documentElement.classList.remove('first-visit');
      document.removeEventListener('click', hideCover);
    });
  }
}

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
  
  // Apply the theme immediately and forcefully
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
      
      // Special handling for pagination links - extract any query parameters
      const urlObj = new URL(url.href);
      const params = new URLSearchParams();
      for (const [key, value] of urlObj.searchParams.entries()) {
        // Save all query parameters to sessionStorage
        sessionStorage.setItem(`param_${key}`, value);
        params.append(key, value);
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
  
  // Special handling for pagination links - extract any query parameters
  const urlObj = new URL(url);
  const params = new URLSearchParams();
  for (const [key, value] of urlObj.searchParams.entries()) {
    // Save all query parameters to sessionStorage
    sessionStorage.setItem(`param_${key}`, value);
    params.append(key, value);
  }
  
  // Store all this data for the next page
  localStorage.setItem('theme', currentTheme); // Ensure persistent storage
  sessionStorage.setItem('transitionTheme', currentTheme);
  sessionStorage.setItem('fromUrl', window.location.href);
  sessionStorage.setItem('isTransitioning', 'true');
  sessionStorage.setItem('hasQueryParams', params.toString().length > 0 ? 'true' : 'false');
  
  // Store navigation type in session
  sessionStorage.setItem('isHistoryNavigation', isHistoryNavigation ? 'true' : 'false');
  
  // Start tear-off animation
  document.body.classList.remove('page-transition-complete');
  document.body.classList.add('page-transition-start');
  
  // Make the transition super fast (100ms) for better performance
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
  }, 100); // Even faster animation (reduced from 150ms)
}

// When page loads, handle incoming transitions
window.addEventListener('load', () => {
  // Apply stored theme from the transition immediately
  applyStoredTheme();
  
  // Handle any stored query parameters
  const hasQueryParams = sessionStorage.getItem('hasQueryParams') === 'true';
  const currentUrl = new URL(window.location.href);
  const isHistoryNavigation = sessionStorage.getItem('isHistoryNavigation') === 'true';
  
  // Process any saved query parameters 
  if (hasQueryParams && currentUrl.search === '') {
    const queryParams = new URLSearchParams();
    
    // Get all saved parameters from sessionStorage
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key && key.startsWith('param_')) {
        const paramName = key.substring(6); // Remove 'param_' prefix
        queryParams.append(paramName, sessionStorage.getItem(key));
      }
    }
    
    // If we have parameters to restore
    if (queryParams.toString().length > 0) {
      // Build the new URL with the query parameters
      currentUrl.search = queryParams.toString();
      
      // Redirect without animation
      window.isTransitioning = true;
      window.location.replace(currentUrl.toString());
      
      // Clean up the sessionStorage
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (key && key.startsWith('param_')) {
          sessionStorage.removeItem(key);
        }
      }
      sessionStorage.removeItem('hasQueryParams');
      sessionStorage.removeItem('isHistoryNavigation');
      return;
    }
  }
  
  // Handle transition-in animations
  if (sessionStorage.getItem('isTransitioning') === 'true') {
    // Hide content initially
    document.body.style.opacity = '0';
    
    // Use requestAnimationFrame for better performance
    requestAnimationFrame(() => {
      // Now fade in content very quickly
      document.body.style.opacity = '1';
      document.body.style.transition = 'opacity 80ms ease-in';
      
      // Play the incoming transition after content is visible
      document.body.classList.remove('page-transition-start');
      document.body.classList.add('page-transition-complete');
      
      // Remove transitioning flag
      window.isTransitioning = false;
      sessionStorage.removeItem('isTransitioning');
      sessionStorage.removeItem('fromUrl');
      sessionStorage.removeItem('isHistoryNavigation');
      sessionStorage.removeItem('hasQueryParams');
      
      // Clean up any param entries
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (key && key.startsWith('param_')) {
          sessionStorage.removeItem(key);
        }
      }
      
      // Force theme application again to ensure consistency
      applyStoredTheme();
    });
  } else {
    // Direct page load (no transition)
    document.body.classList.remove('page-transition-start');
    document.body.classList.add('page-transition-complete');
    window.isTransitioning = false;
  }
  
  // Hide the overlay if present - do it immediately
  const overlay = document.getElementById('transition-overlay');
  if (overlay) {
    requestAnimationFrame(() => {
      overlay.style.display = 'none';
    });
  }
});
