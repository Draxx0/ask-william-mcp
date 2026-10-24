import type { McpServer } from '@modelcontextprotocol/server';
import * as z from 'zod/v4';
import { projects } from '../data/projects.js';

export const registerGetProject = (server: McpServer) => {
  server.registerTool(
    'get_project',
    {
      title: 'Get project',
      description:
        'Returns the full details of one of William\'s projects: summary, status, stack and highlights of what was built. ' +
        'Use a slug returned by search_projects.',
      inputSchema: z.object({
        slug: z.string().describe('Project slug, e.g. "menon". Get valid slugs from search_projects.'),
      }),
      annotations: { readOnlyHint: true },
    },
    async ({ slug }) => {
      const project = projects.find((p) => p.slug === slug.trim().toLowerCase());

      if (!project) {
        const known = projects.map((p) => p.slug).join(', ');
        return {
          content: [{ type: 'text', text: `No project with slug "${slug}". Valid slugs: ${known}.` }],
          isError: true,
        };
      }

      return {
        content: [{ type: 'text', text: JSON.stringify(project, null, 2) }],
      };
    },
  );
};
