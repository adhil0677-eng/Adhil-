# WriteAI

This is the final Vercel-ready project.

## Files

```text
index.html
package.json
vercel.json
api/
  generate.js
```

## Deploy

1. Upload the contents of this folder to the root of your GitHub repository.
2. Import the GitHub repository in Vercel.
3. Add this Environment Variable in Vercel:

```text
ANTHROPIC_API_KEY=your_anthropic_api_key
```

4. Redeploy.

## Test

Open:

```text
https://your-vercel-domain.vercel.app/api/generate
```

You should see JSON. If `hasApiKey` is `false`, the Vercel environment variable is missing.
