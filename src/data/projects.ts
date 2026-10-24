import projectsJson from './projects.json' with { type: 'json' };
import { ProjectsSchema } from './schema.js';

export const projects = ProjectsSchema.parse(projectsJson);
