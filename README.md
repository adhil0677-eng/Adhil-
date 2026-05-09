# WriteAI

Final Vercel-ready AI content writing toolkit.

The app tries to use Claude through `/api/generate`. If the API route is not available yet, the frontend automatically uses a built-in content generator so the toolkit still works instead of showing an error.

## Files

Upload these files at the root of your GitHub repository:

```text
index.html
package.json
vercel.json
.gitignore
api/
  generate.js
```

## Vercel Setup

1. Import the GitHub repository in Vercel.
2. Add this Environment Variable in Vercel:

```text
ANTHROPIC_API_KEY=your_anthropic_api_key
```

3. Redeploy.

## API Test

Open:

```text
https://your-vercel-domain.vercel.app/api/generate
```

You should see JSON. If `hasApiKey` is `false`, the Vercel environment variable is missing.

The frontend will still generate content using the built-in fallback if the live AI route is unavailable.
