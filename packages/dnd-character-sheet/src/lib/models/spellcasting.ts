import type { AbilityName } from './abilities'

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

export interface Spellcasting {
  ability: AbilityName
  slots?: Partial<Record<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9, number>>
  pactMagic?: { level: number; slots: number }
  spells: Spell[]
}
