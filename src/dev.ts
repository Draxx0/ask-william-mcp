import { serve } from '@hono/node-server';
import app from './index.js';

// Local entry point only: in production Vercel serves the default export of index.ts.
serve({ fetch: app.fetch, hostname: 'localhost', port: 8787 }, ({ port }) => {
  console.log(`MCP server listening on http://localhost:${port}`);
});
