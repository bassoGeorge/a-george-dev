import type { Feature } from '@ageorgedev/dnd-character-sheet';

export const darkvision = (range: string): Feature => ({
  name: 'Darkvision',
  description: range,
});

// Elf (all subraces)

export const FEY_ANCESTRY: Feature = {
  name: 'Fey Ancestry',
  description:
    'You have Advantage on Saving throws you make to avoid or end the <em>Charmed</em> condition.',
};

export const KEEN_SENSES: Feature = {
  name: 'Keen Senses',
  description: 'You have proficiency in Perception skill.',
};

export const TRANCE: Feature = {
  name: 'Trance',
  description:
    "You don't need sleep. Magic can't put you to sleep. You can finish a Long Rest in 4hrs if you spend that time in a trance like meditative state.",
};
