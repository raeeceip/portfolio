// Main worker file that sets up KV bindings for all Functions
export default {
  async fetch(request, env, ctx) {
    // This forwards the request to your other Functions with KV access
    const url = new URL(request.url);
    
    // Check if this is a comments API request
    if (url.pathname.startsWith('/api/comments')) {
      return handleComments(request, env, ctx);
    }
    
    // Check if this is a recipe notes API request
    if (url.pathname.startsWith('/api/notes')) {
      return handleRecipeNotes(request, env, ctx);
    }
    
    // Return 404 for any other API requests
    if (url.pathname.startsWith('/api/')) {
      return new Response('Not Found', { status: 404 });
    }
    
    // Otherwise just return a simple response
    return new Response('Cloudflare Worker is running!');
  }
};

// Handle comments API endpoints
async function handleComments(request, env, ctx) {
  const url = new URL(request.url);
  const path = url.pathname;
  
  // CORS headers for all responses
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*', // For production, restrict to your domain
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  
  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }
  
  try {
    // Route based on HTTP method
    if (request.method === 'GET') {
      return await handleGetComments(request, env.KV_COMMENTS, corsHeaders);
    } 
    else if (request.method === 'POST') {
      return await handleAddComment(request, env.KV_COMMENTS, corsHeaders);
    } 
    else if (path.includes('/api/comments/') && request.method === 'DELETE') {
      return await handleDeleteComment(request, env.KV_COMMENTS, corsHeaders);
    } 
    else {
      return new Response('Method not allowed', {
        status: 405,
        headers: corsHeaders,
      });
    }
  } catch (error) {
    return new Response(`Error: ${error.message}`, {
      status: 500,
      headers: corsHeaders,
    });
  }
}

// GET /api/comments?post=slug
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
  
  // Get list of comment IDs for this post
  const commentIdsKey = `post_comments:${postSlug}`;
  const commentIdsJson = await KV_COMMENTS.get(commentIdsKey);
  
  if (!commentIdsJson) {
    // No comments for this post
    return new Response(JSON.stringify([]), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  }
  
  const commentIds = JSON.parse(commentIdsJson);
  
  // Fetch all comments by ID
  const commentPromises = commentIds.map(id => KV_COMMENTS.get(id).then(data => {
    if (!data) return null;
    return JSON.parse(data);
  }));
  
  const comments = await Promise.all(commentPromises);
  
  // Filter out null values from deleted comments
  const validComments = comments.filter(comment => comment !== null);
  
  return new Response(JSON.stringify(validComments), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
    },
  });
}

// POST /api/comments
async function handleAddComment(request, KV_COMMENTS, corsHeaders) {
  // Parse request body
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
  
  // Create comment object
  const comment = {
    id: crypto.randomUUID(),
    postSlug: body.postSlug,
    author: body.author,
    content: body.content,
    createdAt: new Date().toISOString(),
    avatar: body.avatar || null,
  };
  
  // Store comment by ID
  await KV_COMMENTS.put(comment.id, JSON.stringify(comment));
  
  // Update list of comment IDs for this post
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

// DELETE /api/comments/:id
async function handleDeleteComment(request, KV_COMMENTS, corsHeaders) {
  // Extract comment ID from URL
  const url = new URL(request.url);
  const commentId = url.pathname.split('/').pop();
  
  // For simplicity, skip auth in this version (you can add it later)
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

// Handle recipe notes API endpoints 
async function handleRecipeNotes(request, env, ctx) {
  const url = new URL(request.url);
  const path = url.pathname;
  
  // CORS headers for all responses
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*', // For production, restrict to your domain
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS, PUT',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  
  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }
  
  try {
    // Route based on HTTP method
    if (request.method === 'GET') {
      return await handleGetNotes(request, env.KV_RECIPE_NOTES, corsHeaders);
    } 
    else if (request.method === 'POST') {
      return await handleAddNote(request, env.KV_RECIPE_NOTES, corsHeaders);
    }
    else if (path.match(/\/api\/notes\/[^\/]+\/like$/) && request.method === 'PUT') {
      return await handleLikeNote(request, env.KV_RECIPE_NOTES, corsHeaders);
    }
    else if (path.match(/\/api\/notes\/[^\/]+$/) && request.method === 'DELETE') {
      return await handleDeleteNote(request, env.KV_RECIPE_NOTES, corsHeaders);
    }
    
    // Return 404 for unhandled routes
    return new Response('Not Found', { 
      status: 404,
      headers: corsHeaders
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  }
}

// GET /api/notes?post=slug
async function handleGetNotes(request, KV_RECIPE_NOTES, corsHeaders) {
  const url = new URL(request.url);
  const postSlug = url.searchParams.get('post');
  
  if (!postSlug) {
    return new Response(JSON.stringify({ error: 'Missing post parameter' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  }
  
  // Get list of note IDs for this post
  const noteIdsKey = `post_notes:${postSlug}`;
  const noteIdsJson = await KV_RECIPE_NOTES.get(noteIdsKey);
  
  if (!noteIdsJson) {
    // No notes for this post
    return new Response(JSON.stringify([]), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  }
  
  const noteIds = JSON.parse(noteIdsJson);
  
  // Fetch all notes by ID
  const notePromises = noteIds.map(id => KV_RECIPE_NOTES.get(id).then(data => {
    if (!data) return null;
    return JSON.parse(data);
  }));
  
  const notes = await Promise.all(notePromises);
  
  // Filter out null values from deleted notes
  const validNotes = notes.filter(note => note !== null);
  
  return new Response(JSON.stringify(validNotes), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
    },
  });
}

// POST /api/notes
async function handleAddNote(request, KV_RECIPE_NOTES, corsHeaders) {
  // Parse request body
  const body = await request.json();
  
  // Validate required fields
  if (!body.post || !body.author || !body.content) {
    return new Response(JSON.stringify({ error: 'Missing required fields: post, author, content' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  }
  
  // Create note object
  const note = {
    id: crypto.randomUUID(),
    post: body.post,
    author: body.author,
    content: body.content,
    createdAt: new Date().toISOString(),
    likes: 0
  };
  
  // Store note by ID
  await KV_RECIPE_NOTES.put(note.id, JSON.stringify(note));
  
  // Update list of note IDs for this post
  const noteIdsKey = `post_notes:${body.post}`;
  const existingIdsJson = await KV_RECIPE_NOTES.get(noteIdsKey);
  
  let noteIds = [];
  if (existingIdsJson) {
    noteIds = JSON.parse(existingIdsJson);
  }
  
  noteIds.push(note.id);
  
  await KV_RECIPE_NOTES.put(noteIdsKey, JSON.stringify(noteIds));
  
  return new Response(JSON.stringify(note), {
    status: 201,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
    },
  });
}

// PUT /api/notes/:id/like
async function handleLikeNote(request, KV_RECIPE_NOTES, corsHeaders) {
  const url = new URL(request.url);
  const path = url.pathname;
  const parts = path.split('/');
  const noteId = parts[parts.length - 2]; // Extract ID from path "/api/notes/:id/like"
  
  // Get the note
  const noteJson = await KV_RECIPE_NOTES.get(noteId);
  
  if (!noteJson) {
    return new Response(JSON.stringify({ error: 'Note not found' }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  }
  
  // Update the note
  const note = JSON.parse(noteJson);
  note.likes = (note.likes || 0) + 1;
  
  // Save the updated note
  await KV_RECIPE_NOTES.put(noteId, JSON.stringify(note));
  
  return new Response(JSON.stringify(note), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
    },
  });
}

// DELETE /api/notes/:id
async function handleDeleteNote(request, KV_RECIPE_NOTES, corsHeaders) {
  const url = new URL(request.url);
  const path = url.pathname;
  const parts = path.split('/');
  const noteId = parts[parts.length - 1]; // Extract ID from path
  const postSlug = url.searchParams.get('post');
  
  if (!postSlug) {
    return new Response(JSON.stringify({ error: 'Missing post parameter' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  }
  
  // Get the note to verify it exists
  const noteJson = await KV_RECIPE_NOTES.get(noteId);
  
  if (!noteJson) {
    return new Response(JSON.stringify({ error: 'Note not found' }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  }
  
  // Delete the note
  await KV_RECIPE_NOTES.delete(noteId);
  
  // Update the list of notes for this post
  const noteIdsKey = `post_notes:${postSlug}`;
  const noteIdsJson = await KV_RECIPE_NOTES.get(noteIdsKey);
  
  if (noteIdsJson) {
    let noteIds = JSON.parse(noteIdsJson);
    noteIds = noteIds.filter(id => id !== noteId);
    await KV_RECIPE_NOTES.put(noteIdsKey, JSON.stringify(noteIds));
  }
  
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
    },
  });
}
