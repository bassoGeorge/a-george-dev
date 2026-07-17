import { CharacterClass } from '../lib/models/character-classes';

export const CLASS_COLORS: Record<CharacterClass, string> = {
  [CharacterClass.Artificer]: 'text-info-foreground',
  [CharacterClass.Barbarian]: 'text-destructive-foreground',
  [CharacterClass.Bard]: 'text-data-plum-foreground',
  [CharacterClass.Cleric]: 'text-warning-foreground',
  [CharacterClass.Druid]: 'text-primary-foreground',
  [CharacterClass.Fighter]: 'text-secondary-foreground',
  [CharacterClass.Monk]: 'text-data-sea-foreground',
  [CharacterClass.Paladin]: 'text-warning-foreground-2',
  [CharacterClass.Ranger]: 'text-data-royal-foreground',
  [CharacterClass.Rogue]: 'text-secondary-foreground-2',
  [CharacterClass.Sorcerer]: 'text-info-foreground-2',
  [CharacterClass.Warlock]: 'text-destructive-foreground-2',
  [CharacterClass.Wizard]: 'text-primary-foreground-2',
};
