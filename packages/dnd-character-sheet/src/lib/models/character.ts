import type { Ability } from './abilities';
import type { Attack } from './attacks';
import type { CharacterClass } from './character-classes';
import type { Feature } from './feature';
import type { Skill } from './skills';
import type { Spellcasting } from './spellcasting';

export interface Character {
  // Identity
  name: string;
  species: string;
  background: string;

  classes: {
    name: CharacterClass;
    subclass?: string;
    level: number;
  }[];

  alignment?: string;
  experiencePoints: number;

  // Ability scores
  abilities: Record<Ability, number>;

  // Proficiencies
  savingThrowProficiencies: Ability[];
  skillProficiencies: Skill[];
  skillExpertise: Skill[];

  // Combat
  armorClass: number;
  speed: number;
  hitPoints: {
    maximum: number;
    current?: number;
    temporary?: number;
  };

  // Attacks
  attacks: Attack[];

  // Equipment
  equipment: string[];
  currency: {
    cp: number;
    sp: number;
    ep: number;
    gp: number;
    pp: number;
  };

  // Features
  features: Feature[];
  speciesTraits?: Feature[];
  feats?: Feature[];

  // Size
  size?: string;

  // Proficiency text lists
  armorProficiencies: string[];
  weaponProficiencies: string[];
  toolProficiencies: string[];
  languages: string[];

  // Freeform
  backstory?: string;
  appearance?: string;

  // Spellcasting
  spellcasting?: Spellcasting;
}
