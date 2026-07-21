import type { ReactElement } from 'react';
import { CharacterClass } from '../lib/models/character-classes';
import { ArtificerIcon } from './ArtificerIcon';
import { BarbarianIcon } from './BarbarianIcon';
import { BardIcon } from './BardIcon';
import { ClericIcon } from './ClericIcon';
import type { ClassIconProps } from './class-icon-props';
import { DruidIcon } from './DruidIcon';
import { FighterIcon } from './FighterIcon';
import { MonkIcon } from './MonkIcon';
import { PaladinIcon } from './PaladinIcon';
import { RangerIcon } from './RangerIcon';
import { RogueIcon } from './RogueIcon';
import { SorcererIcon } from './SorcererIcon';
import { WarlockIcon } from './WarlockIcon';
import { WizardIcon } from './WizardIcon';

export type ClassIconComponent = (props: ClassIconProps) => ReactElement;

export const CLASS_ICONS: Record<CharacterClass, ClassIconComponent> = {
  [CharacterClass.Artificer]: ArtificerIcon,
  [CharacterClass.Barbarian]: BarbarianIcon,
  [CharacterClass.Bard]: BardIcon,
  [CharacterClass.Cleric]: ClericIcon,
  [CharacterClass.Druid]: DruidIcon,
  [CharacterClass.Fighter]: FighterIcon,
  [CharacterClass.Monk]: MonkIcon,
  [CharacterClass.Paladin]: PaladinIcon,
  [CharacterClass.Ranger]: RangerIcon,
  [CharacterClass.Rogue]: RogueIcon,
  [CharacterClass.Sorcerer]: SorcererIcon,
  [CharacterClass.Warlock]: WarlockIcon,
  [CharacterClass.Wizard]: WizardIcon,
};
