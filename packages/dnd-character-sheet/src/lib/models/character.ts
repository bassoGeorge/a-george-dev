import type { Ability } from './abilities';
import type { ArmorProficiency } from './armor-proficiency';
import type { Attack } from './attacks';
import type { CharacterClass } from './character-classes';
import type { Feature } from './feature';
import type { Size } from './size';
import type { Skill } from './skills';
import type { Spellcasting } from './spellcasting';

export interface Character {
  // Identity
  name: string;
  species: string;
  background: string;
  customDescription?: string;
  // Size
  size?: Size;
  creatureType?: string;

  classes: {
    name: CharacterClass;
    subclass?: string;
    level: number;
  }[];

  alignment?: string;
  experiencePoints?: number;

  // Ability scores
  abilities: Record<Ability, number>;

  // Proficiencies
  savingThrowProficiencies: Ability[];
  skillProficiencies: Skill[];
  skillExpertise: Skill[];

  // Equipment training & Proficiencies
  armorProficiencies: ArmorProficiency[];
  weaponProficiencies: string[];
  toolProficiencies: string[];
  languages: string[];

  // Combat
  baseArmorClass: number;
  isWieldingShield?: boolean;
  speed: number;
  hitPoints: {
    maximum: number;
    current?: number;
    temporary?: number;
  };

  // Attacks
  attacks: Attack[];

  // Features
  features: Feature[];
  speciesTraits?: Feature[];
  feats?: Feature[];

  // Spellcasting
  spellcasting?: Spellcasting;

  // Freeform
  backstory?: string;
  appearance?: string;

  // Equipment
  equipment: string[];
}
