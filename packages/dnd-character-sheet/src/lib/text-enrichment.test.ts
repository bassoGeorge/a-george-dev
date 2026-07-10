import { describe, expect, it } from 'vitest';
import type { ComputedResource } from './calculate-resources';
import { Ability } from './models/abilities';
import type { Character } from './models/character';
import { CharacterClass } from './models/character-classes';
import type { DerivedStats } from './models/derived-stats';
import { Skill } from './models/skills';
import { enrichCharacterData } from './text-enrichment';

const baseCharacter: Character = {
  name: 'Kira',
  species: 'Halfling',
  background: 'Criminal',
  classes: [{ name: CharacterClass.Rogue, level: 4 }],
  abilities: {
    [Ability.Strength]: 10,
    [Ability.Dexterity]: 16,
    [Ability.Constitution]: 12,
    [Ability.Intelligence]: 10,
    [Ability.Wisdom]: 10,
    [Ability.Charisma]: 10,
  },
  savingThrowProficiencies: [],
  skillProficiencies: [],
  skillExpertise: [],
  baseArmorClass: 13,
  speed: 25,
  hitPoints: { maximum: 25 },
  attacks: [],
  equipment: [],
  features: [],
  armorProficiencies: [],
  weaponProficiencies: [],
  toolProficiencies: [],
  languages: [],
};

const stubStats: DerivedStats = {
  abilityModifiers: {
    [Ability.Strength]: 0,
    [Ability.Dexterity]: 3,
    [Ability.Constitution]: 1,
    [Ability.Intelligence]: 0,
    [Ability.Wisdom]: 0,
    [Ability.Charisma]: 0,
  },
  abilitySaveDCs: {
    [Ability.Strength]: 10,
    [Ability.Dexterity]: 13,
    [Ability.Constitution]: 11,
    [Ability.Intelligence]: 10,
    [Ability.Wisdom]: 10,
    [Ability.Charisma]: 10,
  },
  proficiencyBonus: 2,
  savingThrows: {
    [Ability.Strength]: 0,
    [Ability.Dexterity]: 5,
    [Ability.Constitution]: 1,
    [Ability.Intelligence]: 0,
    [Ability.Wisdom]: 0,
    [Ability.Charisma]: 0,
  },
  skills: Object.fromEntries(
    Object.values(Skill).map((s) => [s, { modifier: 0, quality: 'normal' }])
  ) as DerivedStats['skills'],
  initiative: 3,
  passivePerception: 10,
  level: { total: 4 },
  hitDice: [{ dice: 'd8', count: 4 }],
};

describe('enrichCharacterData', () => {
  it('interpolates EJS tokens in feature descriptions using derived stats', () => {
    const character: Character = {
      ...baseCharacter,
      features: [
        {
          name: 'Cunning Action',
          description: 'Your proficiency bonus is <%= proficiencyBonus %>.',
        },
      ],
    };

    const result = enrichCharacterData(character, stubStats);
    expect(result.features[0].description).toBe('Your proficiency bonus is 2.');
  });

  it('does not mutate non-template character fields', () => {
    const character: Character = {
      ...baseCharacter,
      features: [{ name: 'Sneak Attack', description: 'Static description.' }],
    };

    const result = enrichCharacterData(character, stubStats);
    expect(result.name).toBe('Kira');
    expect(result.abilities[Ability.Dexterity]).toBe(16);
    expect(result.features[0].description).toBe('Static description.');
  });

  it('interpolates resource count via resources.<id>.count', () => {
    const resources: ComputedResource[] = [
      {
        id: 'superiorityDice',
        name: 'Superiority Dice',
        count: 5,
        display: 'dots',
        refresh: { kind: 'short-rest' },
      },
    ];
    const character: Character = {
      ...baseCharacter,
      features: [
        {
          name: 'Battle Master',
          description:
            'You have <%= resources.superiorityDice.count %> superiority dice.',
        },
      ],
    };

    const result = enrichCharacterData(character, stubStats, resources);
    expect(result.features[0].description).toBe('You have 5 superiority dice.');
  });

  it('interpolates resource die via resources.<id>.die', () => {
    const resources: ComputedResource[] = [
      {
        id: 'bardicInspiration',
        name: 'Bardic Inspiration',
        count: 3,
        die: 'd10',
        display: 'dots',
        refresh: { kind: 'long-rest' },
      },
    ];
    const character: Character = {
      ...baseCharacter,
      features: [
        {
          name: 'Bardic Inspiration',
          description:
            'Roll a <%= resources.bardicInspiration.die %> when you use this.',
        },
      ],
    };

    const result = enrichCharacterData(character, stubStats, resources);
    expect(result.features[0].description).toBe(
      'Roll a d10 when you use this.'
    );
  });

  it('exposes per-turn resources in the EJS resources lookup', () => {
    const resources: ComputedResource[] = [
      {
        id: 'sneakAttack',
        name: 'Sneak Attack',
        count: 2,
        die: 'd6',
        display: 'dots',
        refresh: { kind: 'per-turn' },
      },
    ];
    const character: Character = {
      ...baseCharacter,
      features: [
        {
          name: 'Sneak Attack',
          description:
            'You deal an extra <%= resources.sneakAttack.count %><%= resources.sneakAttack.die %> damage.',
        },
      ],
    };

    const result = enrichCharacterData(character, stubStats, resources);
    expect(result.features[0].description).toBe(
      'You deal an extra 2d6 damage.'
    );
  });

  it('renders empty string for unknown resource id', () => {
    const character: Character = {
      ...baseCharacter,
      features: [
        {
          name: 'Mystery Feature',
          description: '<%= resources.nonexistent %>',
        },
      ],
    };

    const result = enrichCharacterData(character, stubStats, []);
    expect(result.features[0].description).toBe('');
  });

  it('resolves DerivedStats locals alongside resources', () => {
    const resources: ComputedResource[] = [
      {
        id: 'someResource',
        name: 'Some Resource',
        count: 3,
        display: 'dots',
        refresh: { kind: 'long-rest' },
      },
    ];
    const character: Character = {
      ...baseCharacter,
      features: [
        {
          name: 'Mixed Feature',
          description:
            'PB: <%= proficiencyBonus %>, Count: <%= resources.someResource.count %>',
        },
      ],
    };

    const result = enrichCharacterData(character, stubStats, resources);
    expect(result.features[0].description).toBe('PB: 2, Count: 3');
  });
});
