import { createMcpHonoApp } from '@modelcontextprotocol/hono';
import { createMcpHandler } from '@modelcontextprotocol/server';
import type { Context } from 'hono';
import { cors } from 'hono/cors';
import { createServer } from './server.js';

const handler = createMcpHandler(createServer);

// Public, read-only data: any browser origin may call the server. Host
// validation still blocks DNS rebinding. A non-localhost `host` is what turns
// off the default localhost-only Origin check.
const app = createMcpHonoApp({
  host: '0.0.0.0',
  allowedHosts: ['mcp.william-fort.fr', 'localhost'],
});
app.use('*', cors());
app.all('/', (c: Context) =>
  handler.fetch(c.req.raw, { parsedBody: c.get('parsedBody') }),
);

export default app;
