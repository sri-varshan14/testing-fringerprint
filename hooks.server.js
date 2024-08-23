// src/hooks.server.js

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  // Handle preflight (OPTIONS) requests
  if (event.request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        // Add other headers if necessary
      }
    });
  }

  const response = await resolve(event);

  // Set CORS headers on the response
  response.headers.set('Access-Control-Allow-Origin', '*');
  // If you need to allow credentials, set 'Access-Control-Allow-Credentials' to 'true'
  // Note: When allowing credentials, 'Access-Control-Allow-Origin' cannot be '*'
  // response.headers.set('Access-Control-Allow-Credentials', 'true');

  // Optionally, you can set other CORS headers as needed
  // response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  // response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  return response;
}
