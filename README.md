# WriteAI

Vercel-ready AI content writing toolkit using Anthropic Claude through a protected serverless API route.

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

## Required Vercel Environment Variable

Add this in Vercel Project Settings → Environment Variables:

```text
ANTHROPIC_API_KEY=your_anthropic_api_key
```

Then redeploy the project.
