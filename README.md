# WriteAI

Vercel-ready AI content writing toolkit.

## Required GitHub/Vercel Structure

Upload these files at the root of your GitHub repository:

```text
index.html
package.json
vercel.json
api/
  generate.js
```

Do not upload the zip file itself. Do not put these files inside another folder in GitHub unless you set that folder as the Vercel Root Directory.

## Vercel Environment Variable

In Vercel project settings, add:

```text
ANTHROPIC_API_KEY=your_anthropic_api_key
```

Then redeploy.

## API Test

After deploy, open:

```text
https://your-site.vercel.app/api/generate
```

You should see JSON with:

```json
{
  "ok": true,
  "route": "/api/generate",
  "message": "WriteAI API route is working",
  "hasApiKey": true
}
```
