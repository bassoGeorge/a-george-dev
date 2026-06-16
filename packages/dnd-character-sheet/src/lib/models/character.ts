import type { Ability } from './abilities'
import type { Attack } from './attacks'
import type { Feature } from './feature'
import type { SkillName } from './skills'
import type { Spellcasting } from './spellcasting'

export interface Character {
  // Identity
  name: string
  class: string
  subclass?: string
  level: number
  species: string
  background: string
  alignment?: string
  experiencePoints: number

  // Ability scores
  abilities: Record<Ability, number>

  // Proficiencies
  savingThrowProficiencies: Ability[]
  skillProficiencies: SkillName[]
  skillExpertise: SkillName[]

  // Combat
  armorClass: number
  speed: number
  hitPoints: {
    maximum: number
    current?: number
    temporary?: number
  }

  // Hit dice
  hitDice: {
    dieType: 'd6' | 'd8' | 'd10' | 'd12'
    total: number
  }

  // Attacks
  attacks: Attack[]

  // Equipment
  equipment: string[]
  currency: {
    cp: number
    sp: number
    ep: number
    gp: number
    pp: number
  }

  // Features
  features: Feature[]
  speciesTraits?: Feature[]
  feats?: Feature[]

  // Size
  size?: string

  // Proficiency text lists
  armorProficiencies: string[]
  weaponProficiencies: string[]
  toolProficiencies: string[]
  languages: string[]

  // Personality
  personality: {
    traits: string
    ideals: string
    bonds: string
    flaws: string
  }

  // Freeform
  backstory?: string
  notes?: string

  // Spellcasting
  spellcasting?: Spellcasting
}
