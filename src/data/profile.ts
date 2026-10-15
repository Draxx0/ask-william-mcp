export interface Profile {
  firstName: string;
  lastName: string;
  headline: string;
  lookingFor: string;
  location: string;
}

export const profile: Profile = {
  firstName: 'William',
  lastName: 'FORT',
  headline: 'AI Applied Engineer',
  lookingFor:
    "Un poste d'ingénieur IA au sein d'une équipe qui conçoit, déploie et maintient des systèmes d'IA en production.",
  location: 'Paris et alentours',
};
