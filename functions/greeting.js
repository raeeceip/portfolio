// Cloudflare Worker for personalized greetings
// This adds a personalized touch to the cookbook experience

export default {
  async fetch(request, env, ctx) {
    // Get original response
    const response = await fetch(request);
    
    // Only process HTML responses
    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('text/html')) {
      return response;
    }
    
    // Get user information from Cloudflare
    const userCountry = request.cf?.country || 'unknown country';
    const userCity = request.cf?.city || 'your city';
    const userTimezone = request.cf?.timezone || 'UTC';
    
    // Get time in user's timezone
    const date = new Date();
    let userTime;
    try {
      userTime = date.toLocaleTimeString('en-US', { timeZone: userTimezone });
    } catch (e) {
      userTime = date.toLocaleTimeString('en-US');
    }
    
    // Determine time of day for greeting
    const hour = new Date(userTime).getHours();
    let greeting = 'Welcome to';
    
    if (hour >= 5 && hour < 12) {
      greeting = 'Good morning! Welcome to';
    } else if (hour >= 12 && hour < 18) {
      greeting = 'Good afternoon! Welcome to';
    } else {
      greeting = 'Good evening! Welcome to';
    }
    
    // Create personalized message
    let locationInfo = '';
    if (userCity !== 'your city') {
      locationInfo = ` from ${userCity}`;
    }
    
    const personalizedGreeting = `${greeting} Chiso's Cookbook${locationInfo}!`;
    
    // Modify HTML to include personalized greeting
    let html = await response.text();
    
    // Look for greeting placeholder or insert after notebook-content opening div
    if (html.includes('{{GREETING_PLACEHOLDER}}')) {
      html = html.replace('{{GREETING_PLACEHOLDER}}', personalizedGreeting);
    } else {
      html = html.replace(
        '<div class="notebook-content" id="notebook-content">',
        '<div class="notebook-content" id="notebook-content">' +
        `<div class="personal-greeting">${personalizedGreeting}</div>`
      );
    }
    
    // Return modified response
    return new Response(html, {
      headers: response.headers
    });
  }
}
