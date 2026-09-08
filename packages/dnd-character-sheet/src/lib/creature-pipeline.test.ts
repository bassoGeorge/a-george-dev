import { describe, expect, it } from 'vitest';
import { calculateStats } from './calculate-derived-stats';
import { computeResources } from './calculate-resources';
import { Ability } from './models/abilities';
import type { Character } from './models/character';
import { CharacterClass } from './models/character-classes';
import { enrichCharacterData } from './text-enrichment';

const baseCharacter: Character = {
  name: 'Creature Keeper',
  species: 'Human',
  background: 'Guide',
  classes: [{ name: CharacterClass.Druid, level: 3 }],
  abilities: {
    [Ability.Strength]: 10,
    [Ability.Dexterity]: 10,
    [Ability.Constitution]: 10,
    [Ability.Intelligence]: 10,
    [Ability.Wisdom]: 16,
    [Ability.Charisma]: 10,
  },
  savingThrowProficiencies: [],
  skillProficiencies: [],
  skillExpertise: [],
  armorProficiencies: [],
  weaponProficiencies: [],
  toolProficiencies: [],
  languages: [],
  baseArmorClass: 12,
  speed: 30,
  hitPoints: { maximum: 20 },
  attacks: [],
  features: [],
  equipment: [],
};

describe('creature calculation isolation', () => {
  it('does not change derived stats or resources', () => {
    const creatureCharacter: Character = {
      ...baseCharacter,
      creatures: [
        {
          name: 'Unusually Mighty Bear',
          abilities: { [Ability.Strength]: 30 },
          proficiencyBonus: 6,
        },
      ],
    };
    const baseStats = calculateStats(baseCharacter);
    const creatureStats = calculateStats(creatureCharacter);

    expect(creatureStats).toEqual(baseStats);
    expect(computeResources(creatureCharacter, creatureStats)).toEqual(
      computeResources(baseCharacter, baseStats)
    );
  });

  it('does not enrich creature descriptions as character templates', () => {
    const character: Character = {
      ...baseCharacter,
      creatures: [
        {
          name: 'Literal Creature',
          actions: [
            {
              name: 'Literal Action',
              description: 'Keep <%= level.total %> unchanged.',
            },
          ],
        },
      ],
    };

    const result = enrichCharacterData(character, calculateStats(character));
    expect(result.creatures?.[0].actions?.[0].description).toBe(
      'Keep <%= level.total %> unchanged.'
    );
  });
});
