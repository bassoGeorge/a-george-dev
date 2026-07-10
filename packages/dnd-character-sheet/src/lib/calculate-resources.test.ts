import { describe, expect, it, vi } from 'vitest';
import { computeResources } from './calculate-resources';
import { Ability } from './models/abilities';
import type { Character } from './models/character';
import { CharacterClass } from './models/character-classes';
import type { DerivedStats } from './models/derived-stats';
import { Skill } from './models/skills';

const baseCharacter: Character = {
  name: 'Test Character',
  species: 'Human',
  background: 'Soldier',
  classes: [{ name: CharacterClass.Fighter, level: 5 }],
  abilities: {
    [Ability.Strength]: 16,
    [Ability.Dexterity]: 10,
    [Ability.Constitution]: 14,
    [Ability.Intelligence]: 10,
    [Ability.Wisdom]: 10,
    [Ability.Charisma]: 10,
  },
  savingThrowProficiencies: [],
  skillProficiencies: [],
  skillExpertise: [],
  baseArmorClass: 16,
  speed: 30,
  hitPoints: { maximum: 44 },
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
    [Ability.Strength]: 3,
    [Ability.Dexterity]: 0,
    [Ability.Constitution]: 2,
    [Ability.Intelligence]: 0,
    [Ability.Wisdom]: 0,
    [Ability.Charisma]: 0,
  },
  abilitySaveDCs: {
    [Ability.Strength]: 13,
    [Ability.Dexterity]: 10,
    [Ability.Constitution]: 12,
    [Ability.Intelligence]: 10,
    [Ability.Wisdom]: 10,
    [Ability.Charisma]: 10,
  },
  proficiencyBonus: 3,
  savingThrows: {
    [Ability.Strength]: 6,
    [Ability.Dexterity]: 0,
    [Ability.Constitution]: 5,
    [Ability.Intelligence]: 0,
    [Ability.Wisdom]: 0,
    [Ability.Charisma]: 0,
  },
  skills: Object.fromEntries(
    Object.values(Skill).map((s) => [s, { modifier: 0, quality: 'normal' }])
  ) as DerivedStats['skills'],
  initiative: 0,
  passivePerception: 10,
  level: { total: 5 },
  hitDice: [{ dice: 'd10', count: 5 }],
};

describe('computeResources', () => {
  describe('fixed count', () => {
    it('returns the fixed value', () => {
      const character: Character = {
        ...baseCharacter,
        features: [
          {
            name: 'Second Wind',
            description: '',
            resource: {
              id: 'secondWind',
              name: 'Second Wind',
              count: { kind: 'fixed', value: 1 },
              refresh: { kind: 'short-rest' },
            },
          },
        ],
      };
      const [result] = computeResources(character, stubStats);
      expect(result.count).toBe(1);
      expect(result.name).toBe('Second Wind');
    });
  });

  describe('character-level count', () => {
    it('scales by total character level', () => {
      const character: Character = {
        ...baseCharacter,
        features: [
          {
            name: 'Rage',
            description: '',
            resource: {
              id: 'rage',
              name: 'Rage',
              count: { kind: 'character-level', multiplier: 1 },
              refresh: { kind: 'long-rest' },
            },
          },
        ],
      };
      const [result] = computeResources(character, stubStats);
      expect(result.count).toBe(5);
    });

    it('applies multiplier', () => {
      const character: Character = {
        ...baseCharacter,
        features: [
          {
            name: 'Points',
            description: '',
            resource: {
              id: 'points',
              name: 'Points',
              count: { kind: 'character-level', multiplier: 2 },
              refresh: { kind: 'long-rest' },
            },
          },
        ],
      };
      const [result] = computeResources(character, stubStats);
      expect(result.count).toBe(10);
    });

    it('defaults multiplier to 1 when omitted', () => {
      const character: Character = {
        ...baseCharacter,
        features: [
          {
            name: 'Points',
            description: '',
            resource: {
              id: 'points',
              name: 'Points',
              count: { kind: 'character-level' },
              refresh: { kind: 'long-rest' },
            },
          },
        ],
      };
      const [result] = computeResources(character, stubStats);
      expect(result.count).toBe(5);
    });
  });

  describe('class-level count', () => {
    it('scales by the relevant class level', () => {
      const character: Character = {
        ...baseCharacter,
        features: [
          {
            name: 'Fighter Points',
            description: '',
            resource: {
              id: 'fighterPoints',
              name: 'Fighter Points',
              count: { kind: 'class-level', class: 'Fighter' },
              refresh: { kind: 'short-rest' },
            },
          },
        ],
      };
      const [result] = computeResources(character, stubStats);
      expect(result.count).toBe(5);
    });

    it('applies multiplier to class level', () => {
      const character: Character = {
        ...baseCharacter,
        features: [
          {
            name: 'Fighter Points',
            description: '',
            resource: {
              id: 'fighterPoints',
              name: 'Fighter Points',
              count: { kind: 'class-level', class: 'Fighter', multiplier: 3 },
              refresh: { kind: 'short-rest' },
            },
          },
        ],
      };
      const [result] = computeResources(character, stubStats);
      expect(result.count).toBe(15);
    });

    it('warns and filters when class not on character', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const character: Character = {
        ...baseCharacter,
        features: [
          {
            name: 'Bardic Inspiration',
            description: '',
            resource: {
              id: 'bardicInspiration',
              name: 'Bardic Inspiration',
              count: { kind: 'class-level', class: 'Bard' },
              refresh: { kind: 'long-rest' },
            },
          },
        ],
      };
      const result = computeResources(character, stubStats);
      expect(result).toHaveLength(0);
      expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('Bard'));
      warnSpy.mockRestore();
    });
  });

  describe('class-level-steps count', () => {
    it('resolves exact key match', () => {
      const character: Character = {
        ...baseCharacter,
        features: [
          {
            name: 'Superiority Dice',
            description: '',
            resource: {
              id: 'superiorityDice',
              name: 'Superiority Dice',
              count: {
                kind: 'class-level-steps',
                class: 'Fighter',
                steps: { 3: 4, 7: 5, 15: 6 },
              },
              refresh: { kind: 'short-rest' },
            },
          },
        ],
      };
      const [result] = computeResources(character, stubStats);
      expect(result.count).toBe(4);
    });

    it('resolves between keys (uses highest key ≤ level)', () => {
      const character: Character = {
        ...baseCharacter,
        classes: [{ name: CharacterClass.Fighter, level: 10 }],
        features: [
          {
            name: 'Superiority Dice',
            description: '',
            resource: {
              id: 'superiorityDice',
              name: 'Superiority Dice',
              count: {
                kind: 'class-level-steps',
                class: 'Fighter',
                steps: { 3: 4, 7: 5, 15: 6 },
              },
              refresh: { kind: 'short-rest' },
            },
          },
        ],
      };
      const [result] = computeResources(character, {
        ...stubStats,
        level: { total: 10 },
      });
      expect(result.count).toBe(5);
    });

    it('resolves above highest key', () => {
      const character: Character = {
        ...baseCharacter,
        classes: [{ name: CharacterClass.Fighter, level: 20 }],
        features: [
          {
            name: 'Superiority Dice',
            description: '',
            resource: {
              id: 'superiorityDice',
              name: 'Superiority Dice',
              count: {
                kind: 'class-level-steps',
                class: 'Fighter',
                steps: { 3: 4, 7: 5, 15: 6 },
              },
              refresh: { kind: 'short-rest' },
            },
          },
        ],
      };
      const [result] = computeResources(character, {
        ...stubStats,
        level: { total: 20 },
      });
      expect(result.count).toBe(6);
    });

    it('warns and filters when below lowest key', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const character: Character = {
        ...baseCharacter,
        classes: [{ name: CharacterClass.Fighter, level: 1 }],
        features: [
          {
            name: 'Superiority Dice',
            description: '',
            resource: {
              id: 'superiorityDice',
              name: 'Superiority Dice',
              count: {
                kind: 'class-level-steps',
                class: 'Fighter',
                steps: { 3: 4, 7: 5, 15: 6 },
              },
              refresh: { kind: 'short-rest' },
            },
          },
        ],
      };
      const result = computeResources(character, {
        ...stubStats,
        level: { total: 1 },
      });
      expect(result).toHaveLength(0);
      expect(warnSpy).toHaveBeenCalled();
      warnSpy.mockRestore();
    });

    it('resolves out-of-order step keys correctly', () => {
      const character: Character = {
        ...baseCharacter,
        classes: [{ name: CharacterClass.Fighter, level: 8 }],
        features: [
          {
            name: 'Superiority Dice',
            description: '',
            resource: {
              id: 'superiorityDice',
              name: 'Superiority Dice',
              count: {
                kind: 'class-level-steps',
                class: 'Fighter',
                steps: { 15: 6, 3: 4, 7: 5 },
              },
              refresh: { kind: 'short-rest' },
            },
          },
        ],
      };
      const [result] = computeResources(character, {
        ...stubStats,
        level: { total: 8 },
      });
      expect(result.count).toBe(5);
    });

    it('warns and filters when class not on character', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const character: Character = {
        ...baseCharacter,
        features: [
          {
            name: 'Bardic Inspiration',
            description: '',
            resource: {
              id: 'bardicInspiration',
              name: 'Bardic Inspiration',
              count: {
                kind: 'class-level-steps',
                class: 'Bard',
                steps: { 1: 4 },
              },
              refresh: { kind: 'long-rest' },
            },
          },
        ],
      };
      const result = computeResources(character, stubStats);
      expect(result).toHaveLength(0);
      expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('Bard'));
      warnSpy.mockRestore();
    });
  });

  describe('die resolution', () => {
    it('returns fixed die value', () => {
      const character: Character = {
        ...baseCharacter,
        features: [
          {
            name: 'Resource',
            description: '',
            resource: {
              id: 'resource',
              name: 'Resource',
              count: { kind: 'fixed', value: 4 },
              refresh: { kind: 'short-rest' },
              die: { kind: 'fixed', value: 'd8' },
            },
          },
        ],
      };
      const [result] = computeResources(character, stubStats);
      expect(result.die).toBe('d8');
    });

    it('resolves class-level-steps die at character level', () => {
      const character: Character = {
        ...baseCharacter,
        classes: [{ name: CharacterClass.Fighter, level: 10 }],
        features: [
          {
            name: 'Superiority Dice',
            description: '',
            resource: {
              id: 'superiorityDice',
              name: 'Superiority Dice',
              count: { kind: 'fixed', value: 5 },
              refresh: { kind: 'short-rest' },
              die: {
                kind: 'class-level-steps',
                class: 'Fighter',
                steps: { 3: 'd8', 10: 'd10', 18: 'd12' },
              },
            },
          },
        ],
      };
      const [result] = computeResources(character, {
        ...stubStats,
        level: { total: 10 },
      });
      expect(result.die).toBe('d10');
    });

    it('warns and filters when die class-level-steps is unresolvable (below lowest step)', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const character: Character = {
        ...baseCharacter,
        classes: [{ name: CharacterClass.Fighter, level: 1 }],
        features: [
          {
            name: 'Superiority Dice',
            description: '',
            resource: {
              id: 'superiorityDice',
              name: 'Superiority Dice',
              count: { kind: 'fixed', value: 1 },
              refresh: { kind: 'short-rest' },
              die: {
                kind: 'class-level-steps',
                class: 'Fighter',
                steps: { 3: 'd8' },
              },
            },
          },
        ],
      };
      const result = computeResources(character, {
        ...stubStats,
        level: { total: 1 },
      });
      expect(result).toHaveLength(0);
      expect(warnSpy).toHaveBeenCalled();
      warnSpy.mockRestore();
    });

    it('warns and filters when die class not on character', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const character: Character = {
        ...baseCharacter,
        features: [
          {
            name: 'Bardic Inspiration',
            description: '',
            resource: {
              id: 'bardicInspiration',
              name: 'Bardic Inspiration',
              count: { kind: 'fixed', value: 1 },
              refresh: { kind: 'long-rest' },
              die: {
                kind: 'class-level-steps',
                class: 'Bard',
                steps: { 1: 'd6' },
              },
            },
          },
        ],
      };
      const result = computeResources(character, stubStats);
      expect(result).toHaveLength(0);
      expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('Bard'));
      warnSpy.mockRestore();
    });

    it('leaves die undefined when not specified on resource', () => {
      const character: Character = {
        ...baseCharacter,
        features: [
          {
            name: 'Resource',
            description: '',
            resource: {
              id: 'resource',
              name: 'Resource',
              count: { kind: 'fixed', value: 3 },
              refresh: { kind: 'long-rest' },
            },
          },
        ],
      };
      const [result] = computeResources(character, stubStats);
      expect(result.die).toBeUndefined();
    });
  });

  describe('ability count', () => {
    it('uses ability modifier', () => {
      const character: Character = {
        ...baseCharacter,
        features: [
          {
            name: 'Wild Shape',
            description: '',
            resource: {
              id: 'wildShape',
              name: 'Wild Shape',
              count: { kind: 'ability', ability: Ability.Strength },
              refresh: { kind: 'short-rest' },
            },
          },
        ],
      };
      const [result] = computeResources(character, stubStats);
      expect(result.count).toBe(3);
    });

    it('applies min floor', () => {
      const character: Character = {
        ...baseCharacter,
        features: [
          {
            name: 'Heal',
            description: '',
            resource: {
              id: 'heal',
              name: 'Heal',
              count: { kind: 'ability', ability: Ability.Wisdom, min: 1 },
              refresh: { kind: 'long-rest' },
            },
          },
        ],
      };
      const [result] = computeResources(character, stubStats);
      expect(result.count).toBe(1);
    });

    it('applies multiplier', () => {
      const character: Character = {
        ...baseCharacter,
        features: [
          {
            name: 'Points',
            description: '',
            resource: {
              id: 'points',
              name: 'Points',
              count: {
                kind: 'ability',
                ability: Ability.Strength,
                multiplier: 2,
              },
              refresh: { kind: 'long-rest' },
            },
          },
        ],
      };
      const [result] = computeResources(character, stubStats);
      expect(result.count).toBe(6);
    });
  });

  describe('aggregation', () => {
    it('collects resources from features, speciesTraits, and feats', () => {
      const character: Character = {
        ...baseCharacter,
        features: [
          {
            name: 'Feature Resource',
            description: '',
            resource: {
              id: 'featureResource',
              name: 'Feature Resource',
              count: { kind: 'fixed', value: 1 },
              refresh: { kind: 'long-rest' },
            },
          },
        ],
        speciesTraits: [
          {
            name: 'Species Resource',
            description: '',
            resource: {
              id: 'speciesResource',
              name: 'Species Resource',
              count: { kind: 'fixed', value: 2 },
              refresh: { kind: 'long-rest' },
            },
          },
        ],
        feats: [
          {
            name: 'Feat Resource',
            description: '',
            resource: {
              id: 'featResource',
              name: 'Feat Resource',
              count: { kind: 'fixed', value: 3 },
              refresh: { kind: 'long-rest' },
            },
          },
        ],
      };
      const result = computeResources(character, stubStats);
      expect(result).toHaveLength(3);
      expect(result.map((r) => r.name)).toEqual([
        'Feature Resource',
        'Species Resource',
        'Feat Resource',
      ]);
    });

    it('skips features without resources', () => {
      const character: Character = {
        ...baseCharacter,
        features: [
          { name: 'No Resource Feature', description: '' },
          {
            name: 'Has Resource',
            description: '',
            resource: {
              id: 'hasResource',
              name: 'Has Resource',
              count: { kind: 'fixed', value: 1 },
              refresh: { kind: 'short-rest' },
            },
          },
        ],
      };
      const result = computeResources(character, stubStats);
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Has Resource');
    });
  });

  describe('per-turn resources', () => {
    it('includes per-turn resource with class-level-steps count in output', () => {
      const character: Character = {
        ...baseCharacter,
        classes: [{ name: CharacterClass.Fighter, level: 3 }],
        features: [
          {
            name: 'Sneak Attack',
            description: '',
            resource: {
              id: 'sneakAttack',
              name: 'Sneak Attack',
              count: {
                kind: 'class-level-steps',
                class: 'Fighter',
                steps: { 1: 1, 3: 2, 5: 3 },
              },
              refresh: { kind: 'per-turn' },
              die: { kind: 'fixed', value: 'd6' },
            },
          },
        ],
      };
      const result = computeResources(character, {
        ...stubStats,
        level: { total: 3 },
      });
      expect(result).toHaveLength(1);
      expect(result[0].count).toBe(2);
      expect(result[0].die).toBe('d6');
      expect(result[0].refresh).toEqual({ kind: 'per-turn' });
    });

    it('includes per-turn resource with class-level-steps die in output', () => {
      const character: Character = {
        ...baseCharacter,
        classes: [{ name: CharacterClass.Fighter, level: 5 }],
        features: [
          {
            name: 'Martial Arts',
            description: '',
            resource: {
              id: 'martialArts',
              name: 'Martial Arts',
              count: { kind: 'fixed', value: 1 },
              refresh: { kind: 'per-turn' },
              die: {
                kind: 'class-level-steps',
                class: 'Fighter',
                steps: { 1: 'd6', 5: 'd8', 11: 'd10', 17: 'd12' },
              },
            },
          },
        ],
      };
      const result = computeResources(character, {
        ...stubStats,
        level: { total: 5 },
      });
      expect(result).toHaveLength(1);
      expect(result[0].die).toBe('d8');
      expect(result[0].refresh).toEqual({ kind: 'per-turn' });
    });

    it('warns and filters per-turn resource when class not on character', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const character: Character = {
        ...baseCharacter,
        features: [
          {
            name: 'Sneak Attack',
            description: '',
            resource: {
              id: 'sneakAttack',
              name: 'Sneak Attack',
              count: {
                kind: 'class-level-steps',
                class: 'Rogue',
                steps: { 1: 1 },
              },
              refresh: { kind: 'per-turn' },
            },
          },
        ],
      };
      const result = computeResources(character, stubStats);
      expect(result).toHaveLength(0);
      expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('Rogue'));
      warnSpy.mockRestore();
    });
  });

  describe('display and refresh', () => {
    it('defaults display to dots', () => {
      const character: Character = {
        ...baseCharacter,
        features: [
          {
            name: 'Resource',
            description: '',
            resource: {
              id: 'resource',
              name: 'Resource',
              count: { kind: 'fixed', value: 3 },
              refresh: { kind: 'long-rest' },
            },
          },
        ],
      };
      const [result] = computeResources(character, stubStats);
      expect(result.display).toBe('dots');
    });

    it('respects numeric display', () => {
      const character: Character = {
        ...baseCharacter,
        features: [
          {
            name: 'Resource',
            description: '',
            resource: {
              id: 'resource',
              name: 'Resource',
              count: { kind: 'fixed', value: 10, display: 'numeric' },
              refresh: { kind: 'long-rest' },
            },
          },
        ],
      };
      const [result] = computeResources(character, stubStats);
      expect(result.display).toBe('numeric');
    });

    it('returns raw refresh descriptor', () => {
      const character: Character = {
        ...baseCharacter,
        features: [
          {
            name: 'Resource',
            description: '',
            resource: {
              id: 'resource',
              name: 'Resource',
              count: { kind: 'fixed', value: 1 },
              refresh: {
                kind: 'short-and-long-rest',
                numberOfRefreshesOnShortRest: 2,
              },
            },
          },
        ],
      };
      const [result] = computeResources(character, stubStats);
      expect(result.refresh).toEqual({
        kind: 'short-and-long-rest',
        numberOfRefreshesOnShortRest: 2,
      });
    });
  });
});
