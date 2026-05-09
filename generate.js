// DEPLOYMENT STEPS:
// 1. Push this entire project folder to a GitHub repo
// 2. Go to vercel.com and import the GitHub repo
// 3. In Vercel project settings → Environment Variables → add:
//    Key: ANTHROPIC_API_KEY
//    Value: your Anthropic API key from console.anthropic.com
// 4. Deploy — your site will be live with API key safely hidden

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { prompt } = req.body || {};
  if (!prompt) return res.status(400).json({ error: 'No prompt provided' });
  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY is not configured' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({
        error: data.error?.message || data.message || `Anthropic API request failed with status ${response.status}`
      });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Error connecting to Anthropic API' });
  }
}
