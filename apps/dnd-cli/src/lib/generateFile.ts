import { Ability } from '@ageorgedev/dnd-character-sheet/models'
import type { WizardState } from '../types.js'

function toExportName(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((word, i) => {
      const clean = word.replace(/[^a-zA-Z0-9]/g, '')
      if (!clean) return ''
      if (i === 0) return clean.charAt(0).toLowerCase() + clean.slice(1)
      return clean.charAt(0).toUpperCase() + clean.slice(1).toLowerCase()
    })
    .join('')
}

function formatSkillArray(items: string[]): string {
  if (items.length === 0) return '[]'
  return `[${items.map((s) => `Skill.${s}`).join(', ')}]`
}
function formatAbilityArray(items: string[]): string {
  if (items.length === 0) return '[]'
  return `[${items.map((s) => `"${s}"`).join(', ')}]`
}

export function generateFile(state: WizardState): string {
  const exportName = toExportName(state.name) || 'character'
  const subclassLine = state.subclass
    ? `\n  subclass: "${state.subclass}",`
    : ''

  return `import type { Character } from '../lib/models/character';
  import type { Skill } from '../lib/models/skills';

export const ${exportName}: Character = {
  name: "${state.name}",
  class: "${state.characterClass}",${subclassLine}
  level: ${state.level},
  species: "${state.species}",
  background: "${state.background}",
  experiencePoints: ${state.experiencePoints},

  abilities: {
    [Ability.Strength]: ${state.abilities[Ability.Strength]},
    [Ability.Dexterity]: ${state.abilities[Ability.Dexterity]},
    [Ability.Constitution]: ${state.abilities[Ability.Constitution]},
    [Ability.Intelligence]: ${state.abilities[Ability.Intelligence]},
    [Ability.Wisdom]: ${state.abilities[Ability.Wisdom]},
    [Ability.Charisma]: ${state.abilities[Ability.Charisma]},
  },

  savingThrowProficiencies: ${formatAbilityArray(state.savingThrowProficiencies)},
  skillProficiencies: ${formatSkillArray(state.skillProficiencies)},
  skillExpertise: [],

  armorClass: ${state.armorClass},
  speed: ${state.speed},
  hitPoints: {
    maximum: ${state.hitPointsMax},
    current: ${state.hitPointsMax},
  },

  hitDice: {
    dieType: "${state.hitDiceType}",
    total: ${state.level},
  },

  armorProficiencies: [],
  weaponProficiencies: [],
  toolProficiencies: [],
  languages: [],

  personality: { traits: "", ideals: "", bonds: "", flaws: "" },

  // Fill in manually after generation
  attacks: [],
  equipment: [],
  currency: { cp: 0, sp: 0, ep: 0, gp: 0, pp: 0 },
  features: [],
};
`
}
