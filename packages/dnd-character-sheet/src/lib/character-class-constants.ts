import type { Character } from './models/character';
import { CharacterClass } from './models/character-classes';

export const HIT_DICE_TABLE: Record<CharacterClass, string> = {
  [CharacterClass.Artificer]: 'd8',
  [CharacterClass.Barbarian]: 'd12',
  [CharacterClass.Bard]: 'd8',
  [CharacterClass.Cleric]: 'd8',
  [CharacterClass.Druid]: 'd8',
  [CharacterClass.Fighter]: 'd10',
  [CharacterClass.Monk]: 'd8',
  [CharacterClass.Paladin]: 'd10',
  [CharacterClass.Ranger]: 'd10',
  [CharacterClass.Rogue]: 'd8',
  [CharacterClass.Sorcerer]: 'd6',
  [CharacterClass.Warlock]: 'd8',
  [CharacterClass.Wizard]: 'd6',
};

export const WEAPON_MASTERY_CLASSES: CharacterClass[] = [
  CharacterClass.Barbarian,
  CharacterClass.Fighter,
  CharacterClass.Paladin,
  CharacterClass.Ranger,
  CharacterClass.Rogue,
];

export const WEAPON_MASTER_FEAT_NAME = 'Weapon Master';

export function hasWeaponMastery(character: Character): boolean {
  return (
    character.classes.some(({ name }) =>
      WEAPON_MASTERY_CLASSES.includes(name)
    ) ||
    (character.feats?.some(({ name }) => name === WEAPON_MASTER_FEAT_NAME) ??
      false)
  );
}
