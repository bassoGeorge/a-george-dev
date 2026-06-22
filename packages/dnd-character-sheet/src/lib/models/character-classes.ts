export const CharacterClass = {
  Artificer: 'Artificer',
  Barbarian: 'Barbarian',
  Bard: 'Bard',
  Cleric: 'Cleric',
  Druid: 'Druid',
  Fighter: 'Fighter',
  Monk: 'Monk',
  Paladin: 'Paladin',
  Ranger: 'Ranger',
  Rogue: 'Rogue',
  Sorcerer: 'Sorcerer',
  Warlock: 'Warlock',
  Wizard: 'Wizard',
} as const;

export type CharacterClass =
  (typeof CharacterClass)[keyof typeof CharacterClass];
