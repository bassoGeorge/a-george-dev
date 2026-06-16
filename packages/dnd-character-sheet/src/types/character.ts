export type AbilityName =
  | 'strength'
  | 'dexterity'
  | 'constitution'
  | 'intelligence'
  | 'wisdom'
  | 'charisma'

export type SkillName =
  | 'acrobatics'
  | 'animalHandling'
  | 'arcana'
  | 'athletics'
  | 'deception'
  | 'history'
  | 'insight'
  | 'intimidation'
  | 'investigation'
  | 'medicine'
  | 'nature'
  | 'perception'
  | 'performance'
  | 'persuasion'
  | 'religion'
  | 'sleightOfHand'
  | 'stealth'
  | 'survival'

export interface AttackDamage {
  dice: string
  type: string
  disableModifier?: boolean
}

export type Attack = {
  name: string
  damage: AttackDamage[]
  masteryProperty?: string
  attackBonusMod?: number
  damageMod?: number
  notProficient?: boolean
  notes?: string
} & (WeaponAttack | SpellWithAttack | SpellWithSave)

type WeaponAttack = {
  kind: 'weapon'
  ability: Extract<AbilityName, 'strength' | 'dexterity'>
}

type SpellWithAttack = {
  kind: 'spell-with-attack'
  ability?: AbilityName
}

type SpellWithSave = {
  kind: 'spell-with-save'
  ability?: AbilityName
  saveAbility: AbilityName
}

export interface Feature {
  name: string
  source: string
  description: string
}

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
  abilities: Record<AbilityName, number>

  // Proficiencies
  savingThrowProficiencies: AbilityName[]
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

type SpellSchool =
  | 'Abjuration'
  | 'Conjuration'
  | 'Divination'
  | 'Enchantment'
  | 'Evocation'
  | 'Illusion'
  | 'Necromancy'
  | 'Transmutation'

interface SpellComponents {
  verbal?: boolean
  somatic?: boolean
  materialConsumed?: boolean
}

export interface Spell {
  name: string
  level: number
  castingTime: string
  range: string
  duration: string
  school?: SpellSchool
  components?: SpellComponents
  concentration?: boolean
  ritual?: boolean
  freeUses?: number
  alwaysPrepared?: boolean
  alternativeAbility?: AbilityName
  notes?: string
}

interface Spellcasting {
  ability: AbilityName
  slots?: Partial<Record<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9, number>>
  pactMagic?: { level: number; slots: number }
  spells: Spell[]
}
