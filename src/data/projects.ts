import projectsJson from './projects.json';
import { ProjectsSchema } from './schema';

export const projects = ProjectsSchema.parse(projectsJson);
