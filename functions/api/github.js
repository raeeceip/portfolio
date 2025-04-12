// GitHub API Integration for Portfolio
// Proxies requests to GitHub API with caching to avoid rate limits

export async function onRequest({ request, env, ctx }) {
  // Handle CORS preflight requests
  if (request.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
      }
    });
  }
  
  // Only allow GET requests
  if (request.method !== "GET") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
  
  // Get the requested endpoint from the URL
  const url = new URL(request.url);
  const endpoint = url.searchParams.get('endpoint');
  
  if (!endpoint) {
    return new Response(JSON.stringify({ error: "Endpoint parameter is required" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
  
  // Validate the endpoint to prevent abuse
  const validEndpoints = [
    'user',
    'repos',
    'repos/{owner}/{repo}',
    'repos/{owner}/{repo}/languages',
    'users/{username}/repos',
    'users/{username}/events'
  ];
  
  const requestedPath = endpoint.split('?')[0]; // Remove query parameters
  
  // Check if the endpoint starts with any of the valid endpoints
  const isValid = validEndpoints.some(validEndpoint => {
    const pattern = validEndpoint.replace(/{[^}]+}/g, '[^/]+');
    return new RegExp(`^${pattern}$`).test(requestedPath);
  });
  
  if (!isValid) {
    return new Response(JSON.stringify({ error: "Invalid endpoint" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
  
  // If using KV storage in production, we can check for cached data first
  let cachedData;
  const cacheKey = `github:${endpoint}`;
  
  if (env.SITE_KV) {
    try {
      cachedData = await env.SITE_KV.get(cacheKey, { type: 'json' });
      
      if (cachedData) {
        return new Response(JSON.stringify(cachedData), {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "X-Cache": "HIT",
            "Cache-Control": "public, max-age=300" // Cache in browser for 5 minutes
          }
        });
      }
    } catch (error) {
      console.error("KV error:", error);
      // Continue to GitHub API if KV fails
    }
  }
  
  try {
    // Create the GitHub API URL
    const githubUrl = `https://api.github.com/${endpoint}`;
    
    // Make request to GitHub API
    // In production, you would use a GitHub token stored in env variables
    // The token would be added as an Authorization header
    const githubToken = env.GITHUB_TOKEN || '';
    
    const headers = {
      "Accept": "application/vnd.github.v3+json",
      "User-Agent": "ChisosCookbook-CloudflareWorker"
    };
    
    if (githubToken) {
      headers["Authorization"] = `token ${githubToken}`;
    }
    
    const githubResponse = await fetch(githubUrl, { headers });
    
    if (!githubResponse.ok) {
      return new Response(
        JSON.stringify({ 
          error: "GitHub API error", 
          status: githubResponse.status,
          message: await githubResponse.text() 
        }),
        {
          status: githubResponse.status,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        }
      );
    }
    
    const data = await githubResponse.json();
    
    // Store in KV cache if available (with TTL of 1 hour)
    if (env.SITE_KV) {
      try {
        await env.SITE_KV.put(cacheKey, JSON.stringify(data), { expirationTtl: 3600 });
      } catch (error) {
        console.error("KV put error:", error);
        // Continue even if caching fails
      }
    }
    
    // Return the data
    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "X-Cache": "MISS",
        "Cache-Control": "public, max-age=300" // Cache in browser for 5 minutes
      }
    });
  } catch (error) {
    console.error("GitHub API proxy error:", error);
    
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
}
