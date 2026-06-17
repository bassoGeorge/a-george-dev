export const Ability = {
  Strength: 'STR',
  Dexterity: 'DEX',
  Constitution: 'CON',
  Intelligence: 'INT',
  Wisdom: 'WIS',
  Charisma: 'CHA',
} as const

export type Ability = (typeof Ability)[keyof typeof Ability]

export const ALL_ABILITIES: Ability[] = [
  Ability.Strength,
  Ability.Dexterity,
  Ability.Constitution,
  Ability.Intelligence,
  Ability.Wisdom,
  Ability.Charisma,
]

export const ABILITY_DETAILS: Record<
  Ability,
  { label: string; shortName: string }
> = {
  [Ability.Strength]: { label: 'Strength', shortName: 'Str.' },
  [Ability.Dexterity]: { label: 'Dexterity', shortName: 'Dex.' },
  [Ability.Constitution]: { label: 'Constitution', shortName: 'Con.' },
  [Ability.Intelligence]: { label: 'Intelligence', shortName: 'Int.' },
  [Ability.Wisdom]: { label: 'Wisdom', shortName: 'Wis.' },
  [Ability.Charisma]: { label: 'Charisma', shortName: 'Cha.' },
}
