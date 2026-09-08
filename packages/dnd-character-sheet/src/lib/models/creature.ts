import type { Ability } from './abilities';
import type { Size } from './size';
import type { Skill } from './skills';

export interface CreatureEntry {
  name: string;
  description: string;
}

export interface CreatureDetail {
  label: string;
  value: string;
}

export interface Creature {
  name: string;
  description?: string;
  size?: Size;
  creatureType?: string;
  alignment?: string;
  armorClass?: number | string;
  initiative?: number;
  speed?: string;
  hitPoints?: {
    maximum: number;
    dice?: string;
  };
  abilities?: Partial<Record<Ability, number>>;
  savingThrows?: Partial<Record<Ability, number>>;
  skills?: Partial<Record<Skill, number>>;
  senses?: string[];
  languages?: string[];
  challengeRating?: string;
  experiencePoints?: number;
  proficiencyBonus?: number;
  details?: CreatureDetail[];
  traits?: CreatureEntry[];
  actions?: CreatureEntry[];
  bonusActions?: CreatureEntry[];
  reactions?: CreatureEntry[];
}
