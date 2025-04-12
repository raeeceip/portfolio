/**
 * Chiso's Cookbook Theme Management
 * Handles theme toggling, persistence, and transitions
 */

(function() {
  // Theme constants
  const THEMES = {
    LIGHT: 'light',
    DARK: 'dark'
  };
  
  // DOM elements for theme toggles
  let themeToggleButtons;
  
  // Initialize theme system
  function initTheme() {
    // Get all theme toggle buttons
    themeToggleButtons = document.querySelectorAll('#theme-toggle, #mobile-theme-toggle');
    
    // Apply the current theme
    applyTheme();
    
    // Set up event listeners for theme toggles
    setupEventListeners();
  }
  
  // Apply the current theme based on localStorage or system preference
  function applyTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme === THEMES.DARK || (!savedTheme && prefersDark);
    
    // Apply the theme to the document
    document.documentElement.classList.remove(THEMES.LIGHT, THEMES.DARK);
    document.documentElement.classList.add(isDark ? THEMES.DARK : THEMES.LIGHT);
    
    // Update the theme-color meta tag for browser chrome
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) {
      themeColor.setAttribute('content', isDark ? '#4a5568' : '#51733F');
    }
    
    // Update button aria-pressed state if buttons exist
    if (themeToggleButtons) {
      themeToggleButtons.forEach(button => {
        button.setAttribute('aria-pressed', isDark ? 'true' : 'false');
      });
    }
  }
  
  // Set up event listeners
  function setupEventListeners() {
    // Toggle theme when buttons are clicked
    themeToggleButtons.forEach(button => {
      button.addEventListener('click', toggleTheme);
    });
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
      // Only change theme if no saved preference exists
      if (!localStorage.getItem('theme')) {
        document.documentElement.classList.remove(THEMES.LIGHT, THEMES.DARK);
        document.documentElement.classList.add(e.matches ? THEMES.DARK : THEMES.LIGHT);
      }
    });
  }
  
  // Toggle between light and dark themes
  function toggleTheme() {
    const isDark = document.documentElement.classList.contains(THEMES.DARK);
    const newTheme = isDark ? THEMES.LIGHT : THEMES.DARK;
    
    // Update document classes
    document.documentElement.classList.remove(THEMES.LIGHT, THEMES.DARK);
    document.documentElement.classList.add(newTheme);
    
    // Save preference
    localStorage.setItem('theme', newTheme);
    
    // Update theme color
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) {
      themeColor.setAttribute('content', newTheme === THEMES.DARK ? '#4a5568' : '#51733F');
    }
    
    // Update button states
    themeToggleButtons.forEach(button => {
      button.setAttribute('aria-pressed', newTheme === THEMES.DARK ? 'true' : 'false');
    });
  }
  
  // Start when DOM is fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
  } else {
    initTheme();
  }
})();
