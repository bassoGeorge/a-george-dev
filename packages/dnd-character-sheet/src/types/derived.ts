import type { AbilityName, SkillName } from './character'

export interface DerivedStats {
  abilityModifiers: Record<AbilityName, number>
  proficiencyBonus: number
  savingThrows: Record<AbilityName, number>
  skills: Record<SkillName, number>
  passivePerception: number
  initiative: number
  spellSaveDC?: number
  spellAttackBonus?: number
}
