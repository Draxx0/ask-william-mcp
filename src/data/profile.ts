import profileJson from './profile.json';
import { ProfileSchema } from './schema';

export const profile = ProfileSchema.parse(profileJson);
