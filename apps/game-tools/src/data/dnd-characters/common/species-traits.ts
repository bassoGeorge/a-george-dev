import type { Feature } from '@ageorgedev/dnd-character-sheet';

export const WarforgedTraits: Feature[] = [
  {
    name: 'Construct resilience',
    description:
      'You have Resistance to Poison damage. You also have Advantage on saving throws you make to avoid or end the <em>Poisoned</em> condition.',
  },
  {
    name: 'Integrated Protection',
    description:
      "You have +1 AC (already considered in this sheet). Your armour can't be removed against your will",
  },
  {
    name: "Sentry's Rest",
    description:
      "You don't need to sleep, and magic can't put you to sleep. You can finish a Long Rest in 6hrs if you spend that time inactive and motionless. You appear inert but are still conscious.",
  },
  {
    name: 'Specialized Design',
    description:
      'You gain one skill proficiency and one tool proficiency of your choice (already considered in this sheet)',
  },
  {
    name: 'Tireless',
    description:
      "You don't need to consume water, food, and don't need to breathe",
  },
];
