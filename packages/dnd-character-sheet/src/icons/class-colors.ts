import {
  ColorCombinations,
  type ColorWaySections,
} from '@ageorgedev/design-system/color-utils';
import { CharacterClass } from '../lib/models/character-classes';

export const DndClassColors: Record<CharacterClass, ColorWaySections> = {
  // Martial — weapon-based, no innate magic
  [CharacterClass.Fighter]: ColorCombinations.dataRed,
  [CharacterClass.Rogue]: ColorCombinations.dataRed,
  [CharacterClass.Barbarian]: ColorCombinations.dataOrange,
  [CharacterClass.Monk]: ColorCombinations.dataOrange,

  // Divine — radiant, granted by a deity or oath
  [CharacterClass.Cleric]: ColorCombinations.dataYellow,
  [CharacterClass.Paladin]: ColorCombinations.dataYellow,

  // Primal — nature-bound
  [CharacterClass.Druid]: ColorCombinations.dataGreen,
  [CharacterClass.Ranger]: ColorCombinations.dataGreen,

  // Arcane — studied or innate spellcasting
  [CharacterClass.Artificer]: ColorCombinations.dataCyan,
  [CharacterClass.Wizard]: ColorCombinations.dataBlue,
  [CharacterClass.Sorcerer]: ColorCombinations.dataPurple,
  [CharacterClass.Warlock]: ColorCombinations.dataMagenta,

  // Performance — charisma-driven, standalone
  [CharacterClass.Bard]: ColorCombinations.dataPink,
};
