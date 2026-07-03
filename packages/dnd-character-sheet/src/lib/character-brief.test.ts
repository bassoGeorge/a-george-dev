import { describe, expect, it } from 'vitest';
import { getCharacterBrief } from './character-brief';
import { Ability } from './models/abilities';
import type { Character } from './models/character';
import { CharacterClass } from './models/character-classes';

const baseCharacter: Character = {
  name: 'Aria',
  species: 'Elf',
  background: 'Sage',
  classes: [{ name: CharacterClass.Wizard, level: 5 }],
  abilities: {
    [Ability.Strength]: 8,
    [Ability.Dexterity]: 14,
    [Ability.Constitution]: 12,
    [Ability.Intelligence]: 18,
    [Ability.Wisdom]: 13,
    [Ability.Charisma]: 10,
  },
  savingThrowProficiencies: [],
  skillProficiencies: [],
  skillExpertise: [],
  baseArmorClass: 12,
  speed: 30,
  hitPoints: { maximum: 30 },
  attacks: [],
  equipment: [],
  features: [],
  armorProficiencies: [],
  weaponProficiencies: [],
  toolProficiencies: [],
  languages: [],
};

describe('getCharacterBrief', () => {
  it('returns correct name and summed level for single-class and multi-class characters', () => {
    const singleClass = getCharacterBrief(baseCharacter);
    expect(singleClass.name).toBe('Aria');
    expect(singleClass.level).toBe(5);

    const multiClass = getCharacterBrief({
      ...baseCharacter,
      classes: [
        { name: CharacterClass.Wizard, level: 4 },
        { name: CharacterClass.Sorcerer, level: 3 },
      ],
    });
    expect(multiClass.name).toBe('Aria');
    expect(multiClass.level).toBe(7);
  });
});
