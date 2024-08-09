export async function handle({ event, resolve }) {
  const response = await resolve(event);

  // Set CORS headers
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // If it's an OPTIONS request, respond immediately
  if (event.request.method === 'OPTIONS') {
    return new Response(null, { headers: response.headers });
  }

  return response;
}
