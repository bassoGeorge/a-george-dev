export type HitDiceType = 'd6' | 'd8' | 'd10' | 'd12'

export interface WizardState {
  name: string
  characterClass: string
  subclass: string
  level: number
  species: string
  background: string
  experiencePoints: number
  abilities: {
    strength: number
    dexterity: number
    constitution: number
    intelligence: number
    wisdom: number
    charisma: number
  }
  armorClass: number
  speed: number
  hitPointsMax: number
  hitDiceType: HitDiceType
  savingThrowProficiencies: string[]
  skillProficiencies: string[]
  filename: string
}
