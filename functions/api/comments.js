/**
 * Cloudflare Pages Function for handling blog post comments
 * Uses Cloudflare KV to store comment data with two storage patterns:
 * 1. Individual comments: {commentId} → Comment
 * 2. Comment lists by post: post_comments:{slug} → string[] (array of comment IDs)
 */

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const path = url.pathname;
  
  // Set CORS headers for all responses
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*', // Consider restricting this to your domain in production
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  // Log request info for debugging
  console.log(`Handling ${request.method} request to ${path}`);
  console.log(`KV_COMMENTS exists: ${!!env.KV_COMMENTS}`);

  // Route requests based on path and method
  try {
    // Debug endpoint
    if (path === '/api/comments/debug' && request.method === 'GET') {
      return handleDebugKV(request, env.KV_COMMENTS, corsHeaders);
    }
    // Like a comment
    else if (path.match(/\/api\/comments\/[^\/]+\/like$/) && request.method === 'POST') {
      return handleLikeComment(request, env.KV_COMMENTS, corsHeaders);
    }
    // Get comments
    else if (path === '/api/comments' && request.method === 'GET') {
      return handleGetComments(request, env.KV_COMMENTS, corsHeaders);
    } 
    // Add a comment
    else if (path === '/api/comments' && request.method === 'POST') {
      return handleAddComment(request, env.KV_COMMENTS, corsHeaders);
    } 
    // Delete a comment
    else if (path.match(/\/api\/comments\/[^\/]+$/) && request.method === 'DELETE') {
      return handleDeleteComment(request, env.KV_COMMENTS, corsHeaders);
    } 
    // Not found
    else {
      return new Response(`Not Found: ${path}`, {
        status: 404,
        headers: corsHeaders,
      });
    }
  } catch (error) {
    console.error(`Error processing request: ${error.message}`);
    return new Response(JSON.stringify({
      error: error.message,
      stack: error.stack,
      path: path,
      method: request.method
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  }
}

/**
 * Handle GET /api/comments?post={slug}
 * Retrieves all comments for a specific blog post
 */
async function handleGetComments(request, KV_COMMENTS, corsHeaders) {
  const url = new URL(request.url);
  const postSlug = url.searchParams.get('post');
  
  if (!postSlug) {
    return new Response('Missing post parameter', {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  }

  // Get the list of comment IDs for this post
  const commentIdsKey = `post_comments:${postSlug}`;
  const commentIdsJson = await KV_COMMENTS.get(commentIdsKey);
  
  if (!commentIdsJson) {
    // No comments found for this post
    return new Response(JSON.stringify([]), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  }

  const commentIds = JSON.parse(commentIdsJson);
  
  // Fetch all comments by their IDs
  const commentPromises = commentIds.map(id => KV_COMMENTS.get(id).then(data => {
    if (!data) return null;
    return JSON.parse(data);
  }));
  
  const comments = await Promise.all(commentPromises);
  
  // Filter out any null values from deleted comments
  const validComments = comments.filter(comment => comment !== null);

  return new Response(JSON.stringify(validComments), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
    },
  });
}

/**
 * Handle POST /api/comments
 * Adds a new comment to a blog post
 */
async function handleAddComment(request, KV_COMMENTS, corsHeaders) {
  // Parse the request body
  const body = await request.json();
  
  // Validate required fields
  if (!body.postSlug || !body.author || !body.content) {
    return new Response('Missing required fields: postSlug, author, content', {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  }

  // Create the comment object
  const comment = {
    id: crypto.randomUUID(),
    postSlug: body.postSlug,
    author: body.author,
    content: body.content,
    createdAt: new Date().toISOString(),
    avatar: body.avatar || null,
    likes: 0, // Initialize likes count
  };

  // Store the comment by its ID
  await KV_COMMENTS.put(comment.id, JSON.stringify(comment));

  // Update the list of comment IDs for this post
  const commentIdsKey = `post_comments:${body.postSlug}`;
  const existingIdsJson = await KV_COMMENTS.get(commentIdsKey);
  
  let commentIds = [];
  if (existingIdsJson) {
    commentIds = JSON.parse(existingIdsJson);
  }
  
  commentIds.push(comment.id);
  
  await KV_COMMENTS.put(commentIdsKey, JSON.stringify(commentIds));

  return new Response(JSON.stringify(comment), {
    status: 201,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
    },
  });
}

/**
 * Handle POST /api/comments/:id/like
 * Adds a like to a specific comment
 */
async function handleLikeComment(request, KV_COMMENTS, corsHeaders) {
  // Extract the comment ID from the URL
  const url = new URL(request.url);
  const parts = url.pathname.split('/');
  const commentId = parts[parts.length - 2]; // Format: /api/comments/ID/like
  
  // Get the comment
  const commentJson = await KV_COMMENTS.get(commentId);
  if (!commentJson) {
    return new Response('Comment not found', {
      status: 404,
      headers: corsHeaders,
    });
  }
  
  // Update likes count
  const comment = JSON.parse(commentJson);
  comment.likes = (comment.likes || 0) + 1;
  
  // Store the updated comment
  await KV_COMMENTS.put(commentId, JSON.stringify(comment));
  
  return new Response(JSON.stringify(comment), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
    },
  });
}

/**
 * Handle DELETE /api/comments/{id}
 * Deletes a specific comment (admin only)
 */
async function handleDeleteComment(request, KV_COMMENTS, corsHeaders) {
  // Extract the comment ID from the URL
  const url = new URL(request.url);
  const commentId = url.pathname.split('/').pop();

  // Validate authentication (basic implementation, should be improved)
  // For production, use proper authentication with Cloudflare Access, JWT, etc.
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new Response('Unauthorized', {
      status: 401,
      headers: corsHeaders,
    });
  }

  const token = authHeader.substring(7); // Remove 'Bearer ' prefix
  
  // In production, implement proper token validation
  // This is a placeholder for demonstration
  if (token !== 'your-admin-token') {
    return new Response('Forbidden', {
      status: 403,
      headers: corsHeaders,
    });
  }

  // Get the comment to find its post slug
  const commentJson = await KV_COMMENTS.get(commentId);
  if (!commentJson) {
    return new Response('Comment not found', {
      status: 404,
      headers: corsHeaders,
    });
  }

  const comment = JSON.parse(commentJson);
  
  // Delete the comment
  await KV_COMMENTS.delete(commentId);

  // Update the list of comment IDs for this post
  const commentIdsKey = `post_comments:${comment.postSlug}`;
  const existingIdsJson = await KV_COMMENTS.get(commentIdsKey);
  
  if (existingIdsJson) {
    const commentIds = JSON.parse(existingIdsJson);
    const updatedIds = commentIds.filter(id => id !== commentId);
    await KV_COMMENTS.put(commentIdsKey, JSON.stringify(updatedIds));
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
    },
  });
}

/**
 * Debug endpoint to check if KV is working
 */
async function handleDebugKV(request, KV_COMMENTS, corsHeaders) {
  try {
    // Write a test value
    const testKey = 'debug-test-key';
    const testValue = { timestamp: new Date().toISOString(), value: 'test-value' };
    await KV_COMMENTS.put(testKey, JSON.stringify(testValue));
    
    // Read it back
    const readValue = await KV_COMMENTS.get(testKey);
    
    return new Response(JSON.stringify({
      success: true,
      written: testValue,
      read: readValue ? JSON.parse(readValue) : null,
      kvExists: !!KV_COMMENTS,
      kvMethods: Object.keys(KV_COMMENTS || {})
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: error.message,
      stack: error.stack
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  }
}
