// DEPLOYMENT STEPS:
// 1. Push this entire project folder to a GitHub repo
// 2. Go to vercel.com and import the GitHub repo
// 3. Optional: In Vercel project settings → Environment Variables → add:
//    Key: ANTHROPIC_API_KEY
//    Value: your Anthropic API key from console.anthropic.com
// 4. Deploy — without ANTHROPIC_API_KEY, the app uses free Pollinations AI

async function callAnthropic(prompt) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1200,
      messages: [{ role: 'user', content: prompt }]
    })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || data.message || `Anthropic failed with status ${response.status}`);
  }

  return data.content?.[0]?.text || '';
}

async function callPollinations(prompt) {
  const systemPrompt = 'You are WriteAI, a practical marketing and content writing assistant. Write original, useful, ready-to-use content. Do not mention that you are an AI model.';
  const url = new URL(`https://text.pollinations.ai/${encodeURIComponent(prompt)}`);
  url.searchParams.set('model', 'openai');
  url.searchParams.set('system', systemPrompt);
  url.searchParams.set('temperature', '0.8');
  url.searchParams.set('private', 'true');

  const response = await fetch(url.toString(), {
    method: 'GET'
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(text || `Pollinations failed with status ${response.status}`);
  }

  return text;
}

module.exports = async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'GET') {
    return res.status(200).json({
      ok: true,
      route: '/api/generate',
      message: 'WriteAI real AI API route is working',
      provider: process.env.ANTHROPIC_API_KEY ? 'anthropic' : 'pollinations-free',
      hasAnthropicKey: Boolean(process.env.ANTHROPIC_API_KEY)
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: `Method ${req.method} not allowed. Use POST.` });
  }

  const { prompt } = req.body || {};

  if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
    return res.status(400).json({ error: 'No prompt provided' });
  }

  try {
    const text = process.env.ANTHROPIC_API_KEY
      ? await callAnthropic(prompt)
      : await callPollinations(prompt);

    if (!text) {
      return res.status(502).json({ error: 'AI provider returned no output. Please try again.' });
    }

    return res.status(200).json({
      content: [{ text }],
      provider: process.env.ANTHROPIC_API_KEY ? 'anthropic' : 'pollinations-free'
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message || 'Error connecting to AI provider'
    });
  }
};
