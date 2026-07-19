import {
  ColorCombinations,
  type ColorWaySections,
} from '@ageorgedev/design-system/color-utils';
import { CharacterClass } from '../lib/models/character-classes';

export const DndClassColors: Record<CharacterClass, ColorWaySections> = {
  [CharacterClass.Artificer]: ColorCombinations.dataBlue,
  [CharacterClass.Barbarian]: ColorCombinations.dataRed,
  [CharacterClass.Bard]: ColorCombinations.dataPink,
  [CharacterClass.Cleric]: ColorCombinations.dataYellow,
  [CharacterClass.Druid]: ColorCombinations.dataGreen,
  [CharacterClass.Fighter]: ColorCombinations.dataCyan,
  [CharacterClass.Monk]: ColorCombinations.dataCyan,
  [CharacterClass.Paladin]: ColorCombinations.dataOrange,
  [CharacterClass.Ranger]: ColorCombinations.dataGreen,
  [CharacterClass.Rogue]: ColorCombinations.dataRed,
  [CharacterClass.Sorcerer]: ColorCombinations.dataPurple,
  [CharacterClass.Warlock]: ColorCombinations.dataPurple,
  [CharacterClass.Wizard]: ColorCombinations.dataMagenta,
};
