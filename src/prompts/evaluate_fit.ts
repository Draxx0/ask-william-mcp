import type { McpServer } from '@modelcontextprotocol/server';
import * as z from 'zod/v4';
import { profile } from '../data/profile';
import { projects } from '../data/projects';

export const registerEvaluateFit = (server: McpServer) => {
  server.registerPrompt(
    'evaluate_fit',
    {
      title: 'Evaluate fit for a job',
      description: "Compare a job description with William's profile and projects.",
      argsSchema: z.object({
        job_description: z.string().describe('The full text of the job description'),
      }),
    },
    ({ job_description }) => ({
      messages: [
        {
          role: 'user' as const,
          content: {
            type: 'text' as const,
            text: [
              "Evaluate how well William Fort's profile fits the job description below.",
              '',
              '1. List the key requirements of the job.',
              '2. For each requirement, say whether it is met, partially met or not covered, citing the project that shows it.',
              '3. End with a short overall verdict.',
              '',
              'Rely only on the profile and projects provided here. If something is not covered, say so instead of guessing.',
              'Answer in the language of the job description.',
              '',
              '## Job description',
              job_description,
              '',
              '## Profile',
              JSON.stringify(profile, null, 2),
              '',
              '## Projects',
              JSON.stringify(projects, null, 2),
            ].join('\n'),
          },
        },
      ],
    }),
  );
};
