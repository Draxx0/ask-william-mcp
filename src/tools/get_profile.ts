import type { McpServer } from '@modelcontextprotocol/server';
import { profile } from '../data/profile.js';

export const registerGetProfile = (server: McpServer) => {
  server.registerTool(
    'get_profile',
    {
      title: 'Get profile',
      description:
        "Returns William Fort's professional profile: name, headline, the kind of role William is looking for, location, and contact details (email, LinkedIn, GitHub, website). " +
        'Use it when the user asks who William is, what William does, what William is looking for, or how to contact William.',
      annotations: { readOnlyHint: true },
    },
    async () => ({
      content: [{ type: 'text', text: JSON.stringify(profile, null, 2) }],
    }),
  );
};
