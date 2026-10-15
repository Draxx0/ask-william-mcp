import { McpServer } from '@modelcontextprotocol/server';
import { registerGetProfile } from './tools/get_profile';
import { registerGetProject } from './tools/get_project';
import { registerSearchProjects } from './tools/search_projects';

export function createServer(): McpServer {
  const server = new McpServer({
    name: 'william-fort-portfolio',
    title: 'Ask William',
    version: '0.1.0',
  });

  registerGetProfile(server);
  registerSearchProjects(server);
  registerGetProject(server);

  return server;
}
