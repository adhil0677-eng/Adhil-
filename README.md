# WriteAI Real AI Version

This version generates new content using a real AI API.

## AI Provider

- If `ANTHROPIC_API_KEY` is added in Vercel, it uses Claude.
- If no key is added, it uses free Pollinations AI through the backend.

The frontend never calls AI providers directly. It only calls:

```text
/api/generate
```

## Required Files

Upload these files at the root of your GitHub repository:

```text
.gitignore
index.html
package.json
README.md
vercel.json
api/
  generate.js
```

## Deploy On Vercel

1. Upload the contents of this folder to GitHub root.
2. Import the repo in Vercel.
3. Deploy.

Optional Claude setup:

```text
ANTHROPIC_API_KEY=your_anthropic_key
```

If you do not add this key, the app will still use Pollinations AI.

## Test API

Open:

```text
https://your-vercel-domain.vercel.app/api/generate
```

You should see JSON with `ok: true` and provider info.
