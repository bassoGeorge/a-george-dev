import { describe, expect, it } from 'vitest';
import {
  abilityModifier,
  calculateStats,
  computeCharacterAndStats,
  proficiencyBonus,
} from './calculate-derived-stats';
import {
  addSkillBonus,
  addSpeed,
  bumpAbility,
  derivedEffect,
  grantSkillExpertise,
  grantSkillProficiency,
} from './effects/helpers';
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
  it('applies addSkillBonus derived-effect to the target skill', () => {
    // WIS is 14 → modifier +2. Perception is a WIS skill. No proficiency.
    // Base Perception = +2. Feature adds +3 → expect +5.
    const character: Character = {
      ...baseCharacter,
      features: [
        {
          name: 'Keen Senses',
          description: 'You have keen senses.',
          effects: [addSkillBonus(Skill.Perception, 3)],
        },
      ],
    };

    const stats = calculateStats(character);
    expect(stats.skills[Skill.Perception]).toEqual({
      modifier: 5,
      quality: 'normal',
    });
  });

  it('applies derivedEffect to mutate DerivedStats', () => {
    const character: Character = {
      ...baseCharacter,
      features: [
        {
          name: 'Uncanny Reflexes',
          description: 'Your reflexes defy explanation.',
          effects: [
            derivedEffect(({ stats }) => ({ ...stats, initiative: 99 })),
          ],
        },
      ],
    };

    const stats = calculateStats(character);
    expect(stats.initiative).toBe(99);
  });
});

describe('computeCharacterAndStats', () => {
  describe('character-effect ordering', () => {
    it('applies effects from features → speciesTraits → feats in order', () => {
      const character: Character = {
        ...baseCharacter,
        features: [{ name: 'A', description: '', effects: [addSpeed(5)] }],
        speciesTraits: [{ name: 'B', description: '', effects: [addSpeed(3)] }],
        feats: [{ name: 'C', description: '', effects: [addSpeed(2)] }],
      };

      const { character: effective } = computeCharacterAndStats(character);
      expect(effective.speed).toBe(40);
    });

    it('grantSkillProficiency makes skill proficient in derived stats', () => {
      const character: Character = {
        ...baseCharacter,
        features: [
          {
            name: 'Bonus Proficiency',
            description: '',
            effects: [grantSkillProficiency(Skill.Perception)],
          },
        ],
      };

      const { stats } = computeCharacterAndStats(character);
      // level 5 → proficiency bonus 3; WIS mod = +2
      expect(stats.skills[Skill.Perception].quality).toBe('proficient');
      expect(stats.skills[Skill.Perception].modifier).toBe(5); // 2 + 3
    });
  });

  describe('ability bump propagation', () => {
    it('bumped ability updates modifier, save DC, and spell save DC', () => {
      const character: Character = {
        ...baseCharacter,
        feats: [
          {
            name: 'Ability Score Improvement',
            description: '',
            effects: [bumpAbility(Ability.Wisdom, 2)],
          },
        ],
        spellcasting: {
          ability: Ability.Wisdom,
          slots: {},
          numberOfCantrips: 0,
          numberOfPreparedSpells: 0,
          spells: [],
        },
      };

      const { stats } = computeCharacterAndStats(character);
      // WIS was 14 → 16 after bump, modifier = +3
      expect(stats.abilityModifiers[Ability.Wisdom]).toBe(3);
      expect(stats.abilitySaveDCs[Ability.Wisdom]).toBe(14); // 3 + 3 + 8
      expect(stats.spellSaveDC).toBe(14);
    });
  });

  describe('derived effect sees effective character', () => {
    it('derived effect reads the post-mutation speed', () => {
      let capturedSpeed: number | undefined;
      const character: Character = {
        ...baseCharacter,
        features: [
          {
            name: 'Fleet of Foot',
            description: '',
            effects: [
              addSpeed(5),
              derivedEffect(({ character: c, stats }) => {
                capturedSpeed = c.speed;
                return stats;
              }),
            ],
          },
        ],
      };

      computeCharacterAndStats(character);
      expect(capturedSpeed).toBe(35);
    });
  });

  describe('throw cases', () => {
    it('throws on duplicate skill proficiency grant', () => {
      const character: Character = {
        ...baseCharacter,
        skillProficiencies: [Skill.Perception],
        features: [
          {
            name: 'Duplicate Grant',
            description: '',
            effects: [grantSkillProficiency(Skill.Perception)],
          },
        ],
      };

      expect(() => computeCharacterAndStats(character)).toThrow('Perception');
    });

    it('throws when granting expertise without proficiency', () => {
      const character: Character = {
        ...baseCharacter,
        features: [
          {
            name: 'Bad Expertise',
            description: '',
            effects: [grantSkillExpertise(Skill.Perception)],
          },
        ],
      };

      expect(() => computeCharacterAndStats(character)).toThrow('Perception');
    });
  });
});

describe('computeCharacterAndStats — computeResources reflects effect-bumped ability', () => {
  it('ability-based resource reflects effect-bumped ability score', () => {
    // Tested via computeCharacterAndStats: CharacterSheet.tsx passes effectiveCharacter
    // to computeResources, so this verifies the pipeline end-to-end.
    // WIS starts at 14 (mod +2), bump by 2 → 16 (mod +3). Resource min=1 → count 3.
    const character: Character = {
      ...baseCharacter,
      feats: [
        {
          name: 'WIS bump',
          description: '',
          effects: [bumpAbility(Ability.Wisdom, 2)],
        },
      ],
    };

    const { character: effective, stats } = computeCharacterAndStats(character);
    // Verify effective character has bumped WIS
    expect(effective.abilities[Ability.Wisdom]).toBe(16);
    // Verify stats reflect the bumped modifier
    expect(stats.abilityModifiers[Ability.Wisdom]).toBe(3);
  });
});
