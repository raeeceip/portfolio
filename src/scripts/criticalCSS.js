// Critical CSS Extraction Script
// This helps improve page performance by inlining critical styles
// and deferring non-critical CSS

document.addEventListener('DOMContentLoaded', function() {
  // Check if we've already processed this page in this session
  // to avoid running on every page load in development
  if (sessionStorage.getItem('criticalCssLoaded')) {
    return;
  }

  // Add flag to session storage
  sessionStorage.setItem('criticalCssLoaded', 'true');

  // Get all stylesheets
  const stylesheets = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
  
  // For each stylesheet, convert to preload and load properly
  stylesheets.forEach(link => {
    // Skip if this is marked as critical
    if (link.hasAttribute('data-critical')) {
      return;
    }
    
    // Store href for later
    const href = link.getAttribute('href');
    
    // Change to preload
    link.setAttribute('rel', 'preload');
    link.setAttribute('as', 'style');
    link.setAttribute('onload', `this.onload=null;this.rel='stylesheet'`);
    
    // Create noscript fallback
    const noscript = document.createElement('noscript');
    const fallbackLink = document.createElement('link');
    fallbackLink.setAttribute('rel', 'stylesheet');
    fallbackLink.setAttribute('href', href);
    noscript.appendChild(fallbackLink);
    
    // Insert noscript right after the preload
    link.parentNode.insertBefore(noscript, link.nextSibling);
  });
  
  // Load critical CSS for specific page types
  const pageUrl = window.location.pathname;
  
  if (pageUrl === '/' || pageUrl === '') {
    // Home page - specific optimizations
    prefetchPopularPages();
  } else if (pageUrl.startsWith('/blog/') || pageUrl.startsWith('/posts/')) {
    // Blog post pages
    prefetchNextPrevPosts();
  }
});

// Prefetch popular/likely next pages for better performance
function prefetchPopularPages() {
  // Common navigation paths based on analytics
  const popularPages = [
    '/blog',
    '/about',
    '/projects'
  ];
  
  // Prefetch these pages
  popularPages.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    document.head.appendChild(link);
  });
}

// For blog posts, prefetch next and previous posts
function prefetchNextPrevPosts() {
  // Find next/prev links in pagination
  const nextLink = document.querySelector('a.pagination-next');
  const prevLink = document.querySelector('a.pagination-prev');
  
  // Prefetch if found
  if (nextLink) {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = nextLink.href;
    document.head.appendChild(link);
  }
  
  if (prevLink) {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = prevLink.href;
    document.head.appendChild(link);
  }
}
