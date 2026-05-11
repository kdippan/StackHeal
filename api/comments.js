/**
 * /api/comments.js
 * Vercel Serverless Function to handle fetching and posting developer logs.
 * Zero-dependency: Uses native fetch for Cloudflare Turnstile and Supabase REST API.
 */

export default async function handler(req, res) {
  // Load environment variables securely injected by Vercel
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY; 
  const TURNSTILE_SECRET = process.env.TURNSTILE_SECRET_KEY;

  // Set basic CORS headers if your API is accessed cross-origin
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // ---------------------------------------------------------
  // [GET] Fetch comments for a specific post
  // ---------------------------------------------------------
  if (req.method === 'GET') {
    const { slug } = req.query;
    
    if (!slug) {
      return res.status(400).json({ error: 'Post slug is required.' });
    }

    try {
      // Direct REST call to Supabase to fetch comments, ordered by newest first
      const dbResponse = await fetch(
        `${SUPABASE_URL}/rest/v1/stackheal_comments?post_slug=eq.${slug}&select=*&order=created_at.desc`, 
        {
          method: 'GET',
          headers: {
            'apikey': SUPABASE_SERVICE_KEY,
            'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!dbResponse.ok) throw new Error('Database fetch failed');
      
      const comments = await dbResponse.json();
      return res.status(200).json(comments);

    } catch (error) {
      console.error('StackHeal API Error (GET):', error);
      return res.status(500).json({ error: 'Failed to retrieve logs.' });
    }
  }

  // ---------------------------------------------------------
  // [POST] Verify Turnstile and Insert new comment
  // ---------------------------------------------------------
  if (req.method === 'POST') {
    const { slug, name, content, turnstileToken } = req.body;

    if (!slug || !name || !content || !turnstileToken) {
      return res.status(400).json({ error: 'Missing required fields or bot token.' });
    }

    try {
      // 1. Verify the Turnstile Token with Cloudflare
      const formData = new URLSearchParams();
      formData.append('secret', TURNSTILE_SECRET);
      formData.append('response', turnstileToken);

      const turnstileVerify = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        body: formData
      });
      
      const turnstileOutcome = await turnstileVerify.json();

      if (!turnstileOutcome.success) {
        return res.status(403).json({ error: 'Bot verification failed. Turnstile rejected the payload.' });
      }

      // 2. Insert the secure payload into Supabase via REST API
      const insertPayload = {
        post_slug: slug,
        author_name: name,
        content: content
      };

      const dbInsert = await fetch(`${SUPABASE_URL}/rest/v1/stackheal_comments`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_SERVICE_KEY,
          'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal' // Optimizes payload size, we don't need the inserted row back
        },
        body: JSON.stringify(insertPayload)
      });

      if (!dbInsert.ok) {
        const errorText = await dbInsert.text();
        throw new Error(`Database insert failed: ${errorText}`);
      }

      return res.status(200).json({ success: true, message: 'Log submitted successfully.' });

    } catch (error) {
      console.error('StackHeal API Error (POST):', error);
      return res.status(500).json({ error: 'Internal server error during submission.' });
    }
  }

  // Fallback for unsupported methods
  return res.status(405).json({ error: 'Method Not Allowed' });
}