import type { Ability } from './abilities';
import type { Skill } from './skills';

export interface DerivedStats {
  proficiencyBonus: number;
  abilityModifiers: Record<Ability, number>;
  abilitySaveDCs: Record<Ability, number>;
  savingThrows: Record<Ability, number>;
  skills: Record<
    Skill,
    {
      modifier: number;
      quality: 'normal' | 'proficient' | 'expert';
    }
  >;
  passivePerception: number;
  initiative: number;
  level: { total: number } & Record<string, number>;
  hitDice: { dice: string; count: number }[];
  spellSaveDC?: number;
  spellAttackBonus?: number;
}
