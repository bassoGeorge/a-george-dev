import { describe, expect, it } from 'vitest';
import {
  abilityModifier,
  calculateStats,
  proficiencyBonus,
} from './calculate-derived-stats';
import { Ability } from './models/abilities';
import type { Character } from './models/character';
import { CharacterClass } from './models/character-classes';
import { Skill } from './models/skills';

const baseCharacter: Character = {
  name: 'Test Character',
  species: 'Human',
  background: 'Soldier',
  classes: [{ name: CharacterClass.Fighter, level: 5 }],
  abilities: {
    [Ability.Strength]: 10,
    [Ability.Dexterity]: 10,
    [Ability.Constitution]: 10,
    [Ability.Intelligence]: 10,
    [Ability.Wisdom]: 14,
    [Ability.Charisma]: 10,
  },
  savingThrowProficiencies: [],
  skillProficiencies: [],
  skillExpertise: [],
  baseArmorClass: 10,
  speed: 30,
  hitPoints: { maximum: 40 },
  attacks: [],
  equipment: [],
  features: [],
  armorProficiencies: [],
  weaponProficiencies: [],
  toolProficiencies: [],
  languages: [],
};

describe('abilityModifier', () => {
  it('returns correct modifier for boundary and representative scores', () => {
    expect(abilityModifier(1)).toBe(-5);
    expect(abilityModifier(3)).toBe(-4);
    expect(abilityModifier(10)).toBe(0);
    expect(abilityModifier(11)).toBe(0);
    expect(abilityModifier(15)).toBe(2);
    expect(abilityModifier(20)).toBe(5);
  });
});

describe('proficiencyBonus', () => {
  it('returns correct bonus for all five level tiers', () => {
    expect(proficiencyBonus(1)).toBe(2);
    expect(proficiencyBonus(4)).toBe(2);
    expect(proficiencyBonus(5)).toBe(3);
    expect(proficiencyBonus(8)).toBe(3);
    expect(proficiencyBonus(9)).toBe(4);
    expect(proficiencyBonus(12)).toBe(4);
    expect(proficiencyBonus(13)).toBe(5);
    expect(proficiencyBonus(16)).toBe(5);
    expect(proficiencyBonus(17)).toBe(6);
    expect(proficiencyBonus(20)).toBe(6);
  });
});

describe('calculateStats', () => {
  it('applies static-skill-additions statMod to the target skill', () => {
    // WIS is 14 → modifier +2. Perception is a WIS skill. No proficiency.
    // Base Perception = +2. Feature adds +3 → expect +5.
    const character: Character = {
      ...baseCharacter,
      features: [
        {
          name: 'Keen Senses',
          description: 'You have keen senses.',
          statMod: {
            kind: 'static-skill-additions',
            mods: [{ skill: Skill.Perception, modifier: 3 }],
          },
        },
      ],
    };

    const stats = calculateStats(character);
    expect(stats.skills[Skill.Perception]).toBe(5);
  });

  it('applies skill-function statMod to override a skill bonus', () => {
    const character: Character = {
      ...baseCharacter,
      features: [
        {
          name: 'Shadow Step',
          description: 'Your stealth is supernatural.',
          statMod: {
            kind: 'skill-function',
            mod: ({ skill, currentBonus }) =>
              skill === Skill.Stealth ? 42 : currentBonus,
          },
        },
      ],
    };

    const stats = calculateStats(character);
    expect(stats.skills[Skill.Stealth]).toBe(42);
  });

  it('applies generic-derived statMod to mutate the full DerivedStats object', () => {
    const character: Character = {
      ...baseCharacter,
      features: [
        {
          name: 'Uncanny Reflexes',
          description: 'Your reflexes defy explanation.',
          statMod: {
            kind: 'generic-derived',
            mod: (stats) => ({ ...stats, initiative: 99 }),
          },
        },
      ],
    };

    const stats = calculateStats(character);
    expect(stats.initiative).toBe(99);
  });
});
