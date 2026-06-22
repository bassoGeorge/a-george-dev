import type { Ability } from './abilities';
import type { Skill } from './skills';

export interface DerivedStats {
  abilityModifiers: Record<Ability, number>;
  proficiencyBonus: number;
  savingThrows: Record<Ability, number>;
  skills: Record<Skill, number>;
  passivePerception: number;
  initiative: number;
  characterLevel: number;
  hitDice: { dice: string; count: number }[];
  spellSaveDC?: number;
  spellAttackBonus?: number;
}
