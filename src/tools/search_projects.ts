import type { McpServer } from '@modelcontextprotocol/server';
import * as z from 'zod/v4';
import { projects } from '../data/projects.js';

export const registerSearchProjects = (server: McpServer) => {
  server.registerTool(
    'search_projects',
    {
      title: 'Search projects',
      description:
        "Lists William's projects as short summaries (slug, name, summary, status, stack, skills). " +
        'Filter by a topic, either a technology or an AI skill, to answer questions like ' +
        '"has William built agents?", "any experience with tool calling?" or "which projects use Mastra?". ' +
        'Call get_project with a slug from the results to get the full details of one project.',
      inputSchema: z.object({
        topic: z
          .string()
          .optional()
          .describe(
            'Technology or AI skill to filter on, case-insensitive partial match (e.g. "agent", "memory", "Mastra", "TypeScript"). Omit to list every project.',
          ),
      }),
      annotations: { readOnlyHint: true },
    },
    async ({ topic }) => {
      const needle = topic?.trim().toLowerCase();
      const matches = needle
        ? projects.filter((p) =>
            [...p.stack, ...p.skills].some((term) => term.toLowerCase().includes(needle)),
          )
        : projects;

      if (matches.length === 0) {
        const known = [...new Set(projects.flatMap((p) => [...p.stack, ...p.skills]))].join(', ');
        return {
          content: [
            {
              type: 'text',
              text: `No project matches "${topic}". Known technologies and skills: ${known}.`,
            },
          ],
        };
      }

      const summaries = matches.map(({ slug, name, summary, status, stack, skills }) => ({
        slug,
        name,
        summary,
        status,
        stack,
        skills,
      }));
      return {
        content: [{ type: 'text', text: JSON.stringify(summaries, null, 2) }],
      };
    },
  );
};
