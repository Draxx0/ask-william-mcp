import { McpServer } from '@modelcontextprotocol/server';
import { registerEvaluateFit } from './prompts/evaluate_fit.js';
import { registerGetProfile } from './tools/get_profile.js';
import { registerGetProject } from './tools/get_project.js';
import { registerSearchProjects } from './tools/search_projects.js';

export function createServer(): McpServer {
  const server = new McpServer({
    name: 'william-fort-portfolio',
    title: 'Ask William',
    version: '0.1.0',
  });

  registerGetProfile(server);
  registerSearchProjects(server);
  registerGetProject(server);
  registerEvaluateFit(server);

  return server;
}
