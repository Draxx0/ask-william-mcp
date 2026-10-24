import profileJson from './profile.json' with { type: 'json' };
import { ProfileSchema } from './schema.js';

export const profile = ProfileSchema.parse(profileJson);
