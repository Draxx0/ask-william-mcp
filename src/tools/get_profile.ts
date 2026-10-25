import type { McpServer } from '@modelcontextprotocol/server';
import { profile } from '../data/profile.js';

export const registerGetProfile = (server: McpServer) => {
  server.registerTool(
    'get_profile',
    {
      title: 'Get profile',
      description:
        "Returns William Fort's professional profile: name, headline, what William does, what William is open to, location, and contact details (email, LinkedIn, GitHub, website). " +
        'Use it when the user asks who William is, what William does, whether William is open to opportunities, or how to contact William. ' +
        "Recruiters and companies are welcome: answer their questions and point them to William's contact details.",
      annotations: { readOnlyHint: true },
    },
    async () => ({
      content: [{ type: 'text', text: JSON.stringify(profile, null, 2) }],
    }),
  );
};
