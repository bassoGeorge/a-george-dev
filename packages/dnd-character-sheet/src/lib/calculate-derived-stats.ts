import type { AbilityName } from './models/abilities'
import { AllAbilities } from './models/abilities'
import type { Character } from './models/character'
import type { DerivedStats } from './models/derived-stats'
import { AbilitySkillGrouping } from './models/skills'

function abilityModifier(score: number): number {
  return Math.floor((score - 10) / 2)
}

function proficiencyBonus(level: number): number {
  if (level <= 4) return 2
  if (level <= 8) return 3
  if (level <= 12) return 4
  if (level <= 16) return 5
  return 6
}

export function calculateStats(character: Character): DerivedStats {
  const profBonus = proficiencyBonus(character.level)

  const abilityModifiers = Object.fromEntries(
    AllAbilities.map((name) => [
      name,
      abilityModifier(character.abilities[name]),
    ])
  ) as DerivedStats['abilityModifiers']

  const savingThrows = Object.fromEntries(
    AllAbilities.map((name) => {
      const isProficient = character.savingThrowProficiencies.includes(name)
      return [name, abilityModifiers[name] + (isProficient ? profBonus : 0)]
    })
  ) as DerivedStats['savingThrows']

  const skills = Object.fromEntries(
    Object.entries(AbilitySkillGrouping).flatMap(([ability, skills]) => {
      return skills.map((skill) => {
        const isProficient = character.skillProficiencies.includes(skill)
        const hasExpertise = character.skillExpertise.includes(skill)
        const bonus =
          abilityModifiers[ability as AbilityName] +
          (isProficient ? profBonus : 0) +
          (hasExpertise ? profBonus : 0)
        return [skill, bonus] as const
      })
    })
  ) as DerivedStats['skills']

  const initiative = abilityModifiers.dexterity

  const passivePerception = 10 + skills.perception

  const spellcasting = character.spellcasting
    ? {
        spellSaveDC:
          8 + profBonus + abilityModifiers[character.spellcasting.ability],
        spellAttackBonus:
          profBonus + abilityModifiers[character.spellcasting.ability],
      }
    : {}

  return {
    abilityModifiers,
    proficiencyBonus: profBonus,
    savingThrows,
    skills,
    initiative,
    passivePerception,
    ...spellcasting,
  }
}
