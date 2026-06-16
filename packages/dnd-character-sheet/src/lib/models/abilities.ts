export const AllAbilities = [
  'strength',
  'dexterity',
  'constitution',
  'intelligence',
  'wisdom',
  'charisma',
] as const

export type Dep_AbilityName = (typeof AllAbilities)[number]

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
