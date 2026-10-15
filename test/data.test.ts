import { describe, expect, it } from 'vitest';
import profileJson from '../src/data/profile.json';
import projectsJson from '../src/data/projects.json';
import { ProfileSchema, ProjectsSchema } from '../src/data/schema';

describe('data', () => {
  it('profile.json matches the schema', () => {
    expect(() => ProfileSchema.parse(profileJson)).not.toThrow();
  });

  it('projects.json matches the schema', () => {
    expect(() => ProjectsSchema.parse(projectsJson)).not.toThrow();
  });

  it('rejects duplicate project slugs', () => {
    const [first] = ProjectsSchema.parse(projectsJson);
    expect(ProjectsSchema.safeParse([first, first]).success).toBe(false);
  });
});
