import type { Ability } from './abilities'
import type { SkillName } from './skills'

export interface DerivedStats {
  abilityModifiers: Record<Ability, number>
  proficiencyBonus: number
  savingThrows: Record<Ability, number>
  skills: Record<SkillName, number>
  passivePerception: number
  initiative: number
  spellSaveDC?: number
  spellAttackBonus?: number
}
