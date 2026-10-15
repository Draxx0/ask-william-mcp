export interface Contact {
  email: string;
  linkedin: string;
  github: string;
  website: string;
}

export interface Profile {
  firstName: string;
  lastName: string;
  headline: string;
  lookingFor: string;
  location: string;
  contact: Contact;
}

export const profile: Profile = {
  firstName: 'William',
  lastName: 'FORT',
  headline: 'AI Applied Engineer',
  lookingFor:
    "Un poste d'ingénieur IA au sein d'une équipe qui conçoit, déploie et maintient des systèmes d'IA en production.",
  location: 'Paris et alentours',
  contact: {
    email: 'williamfort.work@gmail.com',
    linkedin: 'https://www.linkedin.com/in/william-fort/',
    github: 'https://github.com/Draxx0',
    website: 'https://william-fort.fr',
  },
};
