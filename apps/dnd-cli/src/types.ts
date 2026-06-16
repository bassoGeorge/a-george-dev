import type { Ability } from '@ageorgedev/dnd-character-sheet'

export type HitDiceType = 'd6' | 'd8' | 'd10' | 'd12'

export interface WizardState {
  name: string
  characterClass: string
  subclass: string
  level: number
  species: string
  background: string
  experiencePoints: number
  abilities: AbilityValues
  armorClass: number
  speed: number
  hitPointsMax: number
  hitDiceType: HitDiceType
  savingThrowProficiencies: string[]
  skillProficiencies: string[]
  filename: string
}

export type AbilityValues = {
  [key in Ability]: number
}
