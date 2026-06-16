import { Ability } from './abilities'

export const Skill = {
  Acrobatics: 'Acrobatics',
  AnimalHandling: 'Animal Handling',
  Arcana: 'Arcana',
  Athletics: 'Athletics',
  Deception: 'Deception',
  History: 'History',
  Insight: 'Insight',
  Intimidation: 'Intimidation',
  Investigation: 'Investigation',
  Medicine: 'Medicine',
  Nature: 'Nature',
  Perception: 'Perception',
  Performance: 'Performance',
  Persuasion: 'Persuasion',
  Religion: 'Religion',
  SleightOfHand: 'Sleight of Hand',
  Stealth: 'Stealth',
  Survival: 'Survival',
} as const

export type Skill = (typeof Skill)[keyof typeof Skill]

export const AbilitySkillGrouping: Record<Ability, Skill[]> = {
  [Ability.Strength]: [Skill.Athletics],
  [Ability.Dexterity]: [Skill.Acrobatics, Skill.SleightOfHand, Skill.Stealth],
  [Ability.Constitution]: [],
  [Ability.Intelligence]: [
    Skill.Arcana,
    Skill.History,
    Skill.Investigation,
    Skill.Nature,
    Skill.Religion,
  ],
  [Ability.Wisdom]: [
    Skill.AnimalHandling,
    Skill.Insight,
    Skill.Medicine,
    Skill.Perception,
    Skill.Survival,
  ],
  [Ability.Charisma]: [
    Skill.Deception,
    Skill.Intimidation,
    Skill.Performance,
    Skill.Persuasion,
  ],
}
