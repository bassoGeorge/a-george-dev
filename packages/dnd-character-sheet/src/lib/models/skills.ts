import { Ability } from './abilities'

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

export const AbilitySkillGrouping: Record<Ability, SkillName[]> = {
  [Ability.Strength]: ['athletics'],
  [Ability.Dexterity]: ['acrobatics', 'sleightOfHand', 'stealth'],
  [Ability.Constitution]: [],
  [Ability.Intelligence]: [
    'arcana',
    'history',
    'investigation',
    'nature',
    'religion',
  ],
  [Ability.Wisdom]: [
    'animalHandling',
    'insight',
    'medicine',
    'perception',
    'survival',
  ],
  [Ability.Charisma]: [
    'deception',
    'intimidation',
    'performance',
    'persuasion',
  ],
}
