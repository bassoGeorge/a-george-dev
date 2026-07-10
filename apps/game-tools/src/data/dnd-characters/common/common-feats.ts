import type { Feature } from '@ageorgedev/dnd-character-sheet';

export const ALERT: Feature = {
  name: 'Alert',
  description:
    '<ol><li>Your proficiency bonus is added to your Initiative roll</li><li>You may swap your initiative with any willing ally after rolling</li></ol>',
  statMod: {
    kind: 'generic-derived',
    mod: (stat) => ({
      ...stat,
      initiative: stat.initiative + stat.proficiencyBonus,
    }),
  },
};

export const SAVAGE_ATTACKER: Feature = {
  name: 'Savage attacker',
  description:
    "Once per turn, you may roll a weapon's damage dice twice and use either rolls.",
};
