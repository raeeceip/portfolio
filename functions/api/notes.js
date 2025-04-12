// Recipe Notes API
// Allows visitors to add their own notes to posts - like writing in a cookbook margin
// Maintains the cookbook aesthetic while adding interactive functionality

export async function onRequest({ request, env }) {
  // Handle preflight CORS
  if (request.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
      }
    });
  }
  
  // Parse the URL and query parameters
  const url = new URL(request.url);
  const postSlug = url.searchParams.get('slug');
  
  // All endpoints require a post slug
  if (!postSlug) {
    return new Response(JSON.stringify({ error: "Post slug is required" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
  
  try {
    // GET - Retrieve notes for a post
    if (request.method === "GET") {
      const userId = url.searchParams.get('user_id');
      
      // If user_id is provided, get notes for that specific user
      // Otherwise get all approved public notes
      let query, params;
      
      if (userId) {
        query = `
          SELECT id, user_id, note_content, created_at, updated_at
          FROM user_notes
          WHERE post_slug = ? AND user_id = ?
          ORDER BY created_at DESC
        `;
        params = [postSlug, userId];
      } else {
        // Only return public notes (private notes feature can be added later)
        query = `
          SELECT id, user_id, note_content, created_at, updated_at
          FROM user_notes
          WHERE post_slug = ? AND is_public = TRUE
          ORDER BY created_at DESC
          LIMIT 50
        `;
        params = [postSlug];
      }
      
      const { results } = await env.DB.prepare(query).bind(...params).all();
      
      return new Response(JSON.stringify({ 
        notes: results,
        count: results.length,
        post: postSlug
      }), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "public, max-age=60" // Cache for 1 minute
        }
      });
    }
    
    // POST - Add a new note
    else if (request.method === "POST") {
      // Parse request body
      const body = await request.json();
      
      // Validate required fields
      if (!body.user_id || !body.note_content) {
        return new Response(JSON.stringify({ error: "User ID and note content are required" }), {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        });
      }
      
      // Clean and validate the content (basic security)
      const cleanContent = body.note_content.slice(0, 1000).trim(); // Limit to 1000 chars
      if (!cleanContent) {
        return new Response(JSON.stringify({ error: "Note content cannot be empty" }), {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        });
      }
      
      // Determine if this is public or private
      const isPublic = body.is_public === true;
      
      // Insert the note
      const result = await env.DB.prepare(`
        INSERT INTO user_notes (post_slug, user_id, note_content, is_public, created_at, updated_at)
        VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        RETURNING id
      `).bind(postSlug, body.user_id, cleanContent, isPublic).all();
      
      // Get the inserted ID
      const noteId = result.results[0].id;
      
      return new Response(JSON.stringify({ 
        success: true,
        id: noteId,
        message: "Note added successfully"
      }), {
        status: 201, // Created
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }
    
    // DELETE - Remove a note
    else if (request.method === "DELETE") {
      const noteId = url.searchParams.get('id');
      const userId = url.searchParams.get('user_id');
      
      if (!noteId || !userId) {
        return new Response(JSON.stringify({ error: "Note ID and user ID are required" }), {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        });
      }
      
      // Only allow users to delete their own notes
      const result = await env.DB.prepare(`
        DELETE FROM user_notes 
        WHERE id = ? AND user_id = ? AND post_slug = ?
        RETURNING id
      `).bind(noteId, userId, postSlug).all();
      
      // Check if anything was deleted
      if (result.results.length === 0) {
        return new Response(JSON.stringify({ 
          error: "Note not found or you don't have permission to delete it"
        }), {
          status: 404,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        });
      }
      
      return new Response(JSON.stringify({ 
        success: true,
        message: "Note deleted successfully"
      }), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }
    
    // If not GET, POST, or DELETE, return method not allowed
    return new Response("Method not allowed", { 
      status: 405,
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    });
  } catch (error) {
    console.error("Notes API error:", error);
    return new Response(JSON.stringify({ error: "Server error" }), { 
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
}
