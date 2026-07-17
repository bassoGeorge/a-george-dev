import {
  ColorCombinations,
  type ColorWaySections,
} from '@ageorgedev/design-system/color-utils';
import { CharacterClass } from '../lib/models/character-classes';

export const DndClassColors: Record<CharacterClass, ColorWaySections> = {
  [CharacterClass.Artificer]: ColorCombinations.info,
  [CharacterClass.Barbarian]: ColorCombinations.destructive,
  [CharacterClass.Bard]: ColorCombinations.dataPlum,
  [CharacterClass.Cleric]: ColorCombinations.warning,
  [CharacterClass.Druid]: ColorCombinations.primary,
  [CharacterClass.Fighter]: ColorCombinations.secondary,
  [CharacterClass.Monk]: ColorCombinations.dataSea,
  [CharacterClass.Paladin]: ColorCombinations.warning,
  [CharacterClass.Ranger]: ColorCombinations.dataRoyal,
  [CharacterClass.Rogue]: ColorCombinations.secondary,
  [CharacterClass.Sorcerer]: ColorCombinations.info,
  [CharacterClass.Warlock]: ColorCombinations.destructive,
  [CharacterClass.Wizard]: ColorCombinations.primary,
};
