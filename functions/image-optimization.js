// Cloudflare Worker for optimizing images
// This worker intercepts image requests and serves optimized versions

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Only process image requests
    if (!url.pathname.match(/\.(jpe?g|png|gif|webp)$/i)) {
      return fetch(request);
    }
    
    // Check for query parameters that indicate this is an already optimized image
    if (url.searchParams.has('width') || url.searchParams.has('optimize')) {
      return fetch(request);
    }
    
    // Get client hints
    const viewportWidth = request.headers.get('Viewport-Width') || '1920';
    const dpr = request.headers.get('DPR') || '1';
    
    // Get client user agent for adaptive serving
    const userAgent = request.headers.get('User-Agent') || '';
    const isMobile = /Mobile|Android|iPhone|iPad|iPod/i.test(userAgent);
    
    // Choose appropriate image size based on viewport and device
    let imageWidth;
    if (isMobile) {
      imageWidth = Math.min(parseInt(viewportWidth), 768);
    } else {
      imageWidth = Math.min(parseInt(viewportWidth), 1920);
    }
    
    // Account for high DPR (retina) displays
    imageWidth = Math.round(imageWidth * parseFloat(dpr));
    
    // Create a new URL for the optimized image
    const optimizedUrl = new URL(request.url);
    optimizedUrl.searchParams.set('width', imageWidth.toString());
    optimizedUrl.searchParams.set('optimize', 'true');
    
    // Use Cloudflare's image resizing if available, otherwise use original
    // In production, this would use Cloudflare's image optimization service
    // https://developers.cloudflare.com/images/
    
    // For testing purposes, wrap this in a try-catch since we don't have CF Images yet
    try {
      // Format that would be used with Cloudflare Images
      // const response = await fetch(`https://imagedelivery.net/${env.CF_ACCOUNT_HASH}/${imagePath}/w=${imageWidth},q=75`);
      
      // For local development, just fetch the original
      const response = await fetch(optimizedUrl.toString());
      
      // Create a new response with appropriate cache headers
      return new Response(response.body, {
        headers: {
          'Content-Type': response.headers.get('Content-Type'),
          'Cache-Control': 'public, max-age=31536000', // Cache for 1 year
          'X-Image-Optimized': 'true'
        }
      });
    } catch (err) {
      console.error('Image optimization error:', err);
      // Fallback to original image
      return fetch(request);
    }
  }
}
