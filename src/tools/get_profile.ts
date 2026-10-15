import type { McpServer } from '@modelcontextprotocol/server';
import { profile } from '../data/profile';

export const registerGetProfile = (server: McpServer) => {
  server.registerTool(
    'get_profile',
    {
      title: 'Get profile',
      description:
        "Returns William Fort's professional profile: name, headline, the kind of role William is looking for, and location. " +
        'Use it when the user asks who William is, what William does, or what William is looking for.',
      annotations: { readOnlyHint: true },
    },
    async () => ({
      content: [{ type: 'text', text: JSON.stringify(profile, null, 2) }],
    }),
  );
};
