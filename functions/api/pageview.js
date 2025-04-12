// Page View Counter API
// Records and retrieves page view statistics using D1 database

export async function onRequest({ request, env }) {
  // Get path from URL
  const url = new URL(request.url);
  const path = url.pathname;
  
  // Handle CORS for browser requests
  if (request.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
      }
    });
  }
  
  try {
    // Increment page view
    if (request.method === "POST") {
      // Track the page view
      await env.DB.prepare(
        `INSERT INTO page_views (path, count, last_viewed) 
         VALUES (?, 1, CURRENT_TIMESTAMP)
         ON CONFLICT(path) DO UPDATE 
         SET count = count + 1, last_viewed = CURRENT_TIMESTAMP`
      ).bind(path).run();
      
      return new Response(JSON.stringify({ success: true }), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });
    } 
    // Get page view count
    else if (request.method === "GET") {
      const { results } = await env.DB.prepare(
        `SELECT count FROM page_views WHERE path = ?`
      ).bind(path).all();
      
      const count = results.length > 0 ? results[0].count : 0;
      
      return new Response(JSON.stringify({ 
        path, 
        count,
        formatted: formatViewCount(count)
      }), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "public, max-age=60" // Cache for 1 minute
        }
      });
    }
    
    // If not GET or POST, return method not allowed
    return new Response("Method not allowed", { status: 405 });
  } catch (error) {
    console.error("Page view API error:", error);
    return new Response(JSON.stringify({ error: "Server error" }), { 
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
}

// Format view count in a human-readable way
function formatViewCount(count) {
  if (count === 0) return "No views yet";
  if (count === 1) return "1 view";
  
  if (count < 1000) return `${count} views`;
  if (count < 1000000) return `${(count / 1000).toFixed(1)}k views`;
  
  return `${(count / 1000000).toFixed(1)}M views`;
}
