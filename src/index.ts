import { createMcpHonoApp } from '@modelcontextprotocol/hono';
import { createMcpHandler } from '@modelcontextprotocol/server';
import type { Context } from 'hono';
import { createServer } from './server';

const handler = createMcpHandler(createServer);

const app = createMcpHonoApp();
app.all('/mcp', (c: Context) =>
  handler.fetch(c.req.raw, { parsedBody: c.get('parsedBody') }),
);

export default app;
