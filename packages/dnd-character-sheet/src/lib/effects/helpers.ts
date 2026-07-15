import type { Ability } from '../models/abilities';
import type { Character } from '../models/character';
import type { DerivedStats } from '../models/derived-stats';
import type { Effect } from '../models/feature';
import type { Skill } from '../models/skills';

export function characterEffect(fn: (c: Character) => Character): Effect {
  return { kind: 'character', mod: fn };
}

export function derivedEffect(
  fn: (args: { character: Character; stats: DerivedStats }) => DerivedStats
): Effect {
  return { kind: 'derived', mod: fn };
}

export function addSpeed(amount: number): Effect {
  return characterEffect((c) => ({ ...c, speed: c.speed + amount }));
}

export function bumpAbility(ability: Ability, amount: number): Effect {
  return characterEffect((c) => ({
    ...c,
    abilities: { ...c.abilities, [ability]: c.abilities[ability] + amount },
  }));
}

// Throws if the skill is already in skillProficiencies at the time this effect runs.
// Order of application (features → speciesTraits → feats) is deterministic; if two
// effects both try to grant the same proficiency, the second will throw — flag an
// authoring bug rather than silently double-counting.
export function grantSkillProficiency(skill: Skill): Effect {
  return characterEffect((c) => {
    if (c.skillProficiencies.includes(skill)) {
      throw new Error(
        `grantSkillProficiency: "${skill}" is already in skillProficiencies`
      );
    }
    return { ...c, skillProficiencies: [...c.skillProficiencies, skill] };
  });
}

// Throws if the skill is not in skillProficiencies at the time this effect runs.
// To expertise a skill granted by an earlier effect, ensure the proficiency grant
// runs before the expertise grant (features → speciesTraits → feats ordering).
export function grantSkillExpertise(skill: Skill): Effect {
  return characterEffect((c) => {
    if (!c.skillProficiencies.includes(skill)) {
      throw new Error(
        `grantSkillExpertise: "${skill}" is not in skillProficiencies — proficiency must be granted before expertise`
      );
    }
    if (c.skillExpertise.includes(skill)) {
      throw new Error(
        `grantSkillExpertise: "${skill}" is already in skillExpertise`
      );
    }
    return { ...c, skillExpertise: [...c.skillExpertise, skill] };
  });
}

// not used as of now
export function addSkillBonus(skill: Skill, amount: number): Effect {
  return derivedEffect(({ stats }) => ({
    ...stats,
    skills: {
      ...stats.skills,
      [skill]: {
        ...stats.skills[skill],
        modifier: stats.skills[skill].modifier + amount,
      },
    },
  }));
}
