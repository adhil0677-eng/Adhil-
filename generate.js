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
      max_tokens: 1000,
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

  const response = await fetch(url.toString());
  const text = await response.text();

  if (!response.ok) {
    throw new Error(text || `Pollinations failed with status ${response.status}`);
  }

  return text;
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    return res.status(200).json({
      ok: true,
      route: '/api/generate',
      provider: process.env.ANTHROPIC_API_KEY ? 'anthropic' : 'pollinations-free'
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body || {};

  if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
    return res.status(400).json({ error: 'No prompt provided' });
  }

  try {
    const provider = process.env.ANTHROPIC_API_KEY ? 'anthropic' : 'pollinations-free';
    const text = provider === 'anthropic'
      ? await callAnthropic(prompt)
      : await callPollinations(prompt);

    if (!text) {
      return res.status(502).json({ error: 'AI returned no output. Please try again.' });
    }

    return res.status(200).json({
      content: [{ text }],
      provider
    });
  } catch (err) {
    return res.status(500).json({
      error: 'AI call failed',
      details: err.message
    });
  }
};
