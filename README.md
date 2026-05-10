# WriteAI

Vercel-ready AI content writing toolkit.

## Files

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

## AI Provider

This project works without a paid key by using free Pollinations AI from the backend.

Optional: add this in Vercel Project Settings → Environment Variables to use Claude instead:

```text
ANTHROPIC_API_KEY=your_anthropic_api_key
```

Then redeploy the project.

## Test

After deployment, open:

```text
https://your-vercel-domain.vercel.app/api/generate
```

You should see JSON with `ok: true` and a provider name.
