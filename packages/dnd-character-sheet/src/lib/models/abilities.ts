export const AllAbilities = [
  'strength',
  'dexterity',
  'constitution',
  'intelligence',
  'wisdom',
  'charisma',
] as const

export type AbilityName = (typeof AllAbilities)[number]
