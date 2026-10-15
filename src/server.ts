import { McpServer } from '@modelcontextprotocol/server';
import { registerGetProfile } from './tools/get_profile';

export function createServer(): McpServer {
  const server = new McpServer({
    name: 'william-fort-portfolio',
    title: 'Ask William',
    version: '0.1.0',
  });

  registerGetProfile(server);

  return server;
}
