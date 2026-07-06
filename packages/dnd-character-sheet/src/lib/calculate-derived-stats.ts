import { groupBy, map, mapObjIndexed, pipe, reduce, toPairs } from 'ramda';
import { HIT_DICE_TABLE } from './character-class-constants';
import { Ability, ALL_ABILITIES } from './models/abilities';
import type { Character } from './models/character';
import type { DerivedStats } from './models/derived-stats';
import type { Feature } from './models/feature';
import { AbilitySkillGrouping, Skill } from './models/skills';

export function abilityModifier(score: number): number {
  return Math.floor((score - 10) / 2);
}

export function proficiencyBonus(level: number): number {
  if (level <= 4) return 2;
  if (level <= 8) return 3;
  if (level <= 12) return 4;
  if (level <= 16) return 5;
  return 6;
}

export function calculateStats(character: Character): DerivedStats {
  const level = character.classes.reduce(
    (acc, cls) => {
      acc[cls.name] = cls.level;
      acc.total += cls.level;
      return acc;
    },
    { total: 0 } as { total: number } & Record<string, number>
  );
  const profBonus = proficiencyBonus(level.total);

  const abilityModifiers = Object.fromEntries(
    ALL_ABILITIES.map((name) => [
      name,
      abilityModifier(character.abilities[name]),
    ])
  ) as DerivedStats['abilityModifiers'];

  const abilitySaveDCs = mapObjIndexed(
    (mod) => mod + profBonus + 8,
    abilityModifiers
  );

  const savingThrows = Object.fromEntries(
    ALL_ABILITIES.map((name) => {
      const isProficient = character.savingThrowProficiencies.includes(name);
      return [name, abilityModifiers[name] + (isProficient ? profBonus : 0)];
    })
  ) as DerivedStats['savingThrows'];

  const allMods = gatherAllMods(character);

  const skills = Object.fromEntries(
    Object.entries(AbilitySkillGrouping).flatMap(([ability, skills]) => {
      return skills.map((skill) => {
        const isProficient = character.skillProficiencies.includes(skill);
        const hasExpertise = character.skillExpertise.includes(skill);
        const bonus =
          abilityModifiers[ability as Ability] +
          (isProficient ? profBonus : 0) +
          (hasExpertise ? profBonus : 0);

        const finalBonus = finaliseSkillBonus({
          skill,
          isProficient,
          hasExpertise,
          currentBonus: bonus,
          allSkillMods: allMods,
        });

        const state = {
          modifier: finalBonus,
          quality: hasExpertise
            ? 'expert'
            : isProficient
              ? 'proficient'
              : 'normal',
        } as const;

        return [skill, state] as const;
      });
    })
  ) as DerivedStats['skills'];

  const initiative = abilityModifiers[Ability.Dexterity];

  const passivePerception = 10 + skills[Skill.Perception].modifier;

  const spellcasting = character.spellcasting
    ? {
        spellSaveDC: abilitySaveDCs[character.spellcasting.ability],
        spellAttackBonus:
          profBonus + abilityModifiers[character.spellcasting.ability],
      }
    : {};

  const hitDice = computeHitDice(character.classes);

  const stats = {
    abilityModifiers,
    abilitySaveDCs,
    proficiencyBonus: profBonus,
    savingThrows,
    skills,
    initiative,
    passivePerception,
    level,
    hitDice,
    ...spellcasting,
  };

  return allMods.reduce((acc: DerivedStats, cur): DerivedStats => {
    if (cur.kind === 'generic-derived') {
      return cur.mod(acc);
    }
    return acc;
  }, stats);
}

// function hitDice(charClasses: Character['classes']) {
//   return charClasses.map(({ name, level }) => ({
//     count: level,
//     dice: HIT_DICE_TABLE[name]
//   }))
// }

const computeHitDice = pipe(
  map((config: Character['classes'][number]) => ({
    count: config.level,
    dice: HIT_DICE_TABLE[config.name],
  })),
  groupBy(({ dice }) => dice),
  mapObjIndexed(reduce((acc, { count }) => count + acc, 0)),
  toPairs<number>,
  map(([dice, count]) => ({ dice, count }))
);

function gatherAllMods(character: Character) {
  return [
    ...character.features,
    ...(character.speciesTraits ?? []),
    ...(character.feats ?? []),
  ]
    .map((f) => f.statMod)
    .filter(Boolean) as NonNullable<Feature['statMod']>[];
}

function finaliseSkillBonus(options: {
  skill: Skill;
  isProficient: boolean;
  hasExpertise: boolean;
  currentBonus: number;
  allSkillMods: NonNullable<Feature['statMod']>[];
}) {
  return reduce(
    (current, mod) => {
      if (mod.kind === 'static-skill-additions') {
        const foundItem = mod.mods.find((m) => m.skill === options.skill);
        if (foundItem) {
          return current + foundItem.modifier;
        }
      } else if (mod.kind === 'skill-function') {
        return mod.mod(options);
      }
      return current;
    },
    options.currentBonus,
    options.allSkillMods
  );
}
