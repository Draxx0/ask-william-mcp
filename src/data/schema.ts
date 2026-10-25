import * as z from 'zod/v4';

const text = z.string().trim().min(1);

export const ProfileSchema = z.strictObject({
  firstName: text,
  lastName: text,
  headline: text,
  about: text,
  openTo: text,
  location: text,
  contact: z.strictObject({
    email: z.email(),
    linkedin: z.url(),
    github: z.url(),
    website: z.url(),
  }),
});

export const ProjectSchema = z.strictObject({
  slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'slug must be lowercase kebab-case'),
  name: text,
  summary: text,
  status: z.enum(['in_progress', 'in_production']),
  stack: z.array(text).min(1),
  skills: z.array(text).min(1),
  highlights: z.array(text).min(1),
});

export const ProjectsSchema = z
  .array(ProjectSchema)
  .min(1)
  .refine((projects) => new Set(projects.map((p) => p.slug)).size === projects.length, {
    message: 'project slugs must be unique',
  });

export type Profile = z.infer<typeof ProfileSchema>;
export type Project = z.infer<typeof ProjectSchema>;
