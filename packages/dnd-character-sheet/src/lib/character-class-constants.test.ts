import { describe, expect, it } from 'vitest';
import {
  hasWeaponMastery,
  WEAPON_MASTER_FEAT_NAME,
  WEAPON_MASTERY_CLASSES,
} from './character-class-constants';
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

function makeCharacter(overrides: Partial<Character> = {}): Character {
  return { ...baseCharacter, ...overrides };
}

describe('WEAPON_MASTERY_CLASSES', () => {
  it('contains exactly the five weapon mastery classes', () => {
    expect(WEAPON_MASTERY_CLASSES).toEqual([
      CharacterClass.Barbarian,
      CharacterClass.Fighter,
      CharacterClass.Paladin,
      CharacterClass.Ranger,
      CharacterClass.Rogue,
    ]);
  });
});

describe('hasWeaponMastery', () => {
  it.each(
    WEAPON_MASTERY_CLASSES
  )('returns true for a single-class %s', (name) => {
    expect(
      hasWeaponMastery(makeCharacter({ classes: [{ name, level: 5 }] }))
    ).toBe(true);
  });

  it('returns false for an ineligible class with no feats', () => {
    expect(hasWeaponMastery(makeCharacter())).toBe(false);
  });

  it('returns true for a single level in an eligible class', () => {
    expect(
      hasWeaponMastery(
        makeCharacter({ classes: [{ name: CharacterClass.Ranger, level: 1 }] })
      )
    ).toBe(true);
  });

  it('returns true for a Monk/Fighter multiclass', () => {
    expect(
      hasWeaponMastery(
        makeCharacter({
          classes: [
            { name: CharacterClass.Monk, level: 2 },
            { name: CharacterClass.Fighter, level: 3 },
          ],
        })
      )
    ).toBe(true);
  });

  it('returns false for a Sorcerer/Warlock multiclass', () => {
    expect(
      hasWeaponMastery(
        makeCharacter({
          classes: [
            { name: CharacterClass.Sorcerer, level: 4 },
            { name: CharacterClass.Warlock, level: 3 },
          ],
        })
      )
    ).toBe(false);
  });

  it('returns true for an exact Weapon Master feat on an ineligible class', () => {
    expect(
      hasWeaponMastery(
        makeCharacter({
          feats: [{ name: WEAPON_MASTER_FEAT_NAME, description: 'Mastery' }],
        })
      )
    ).toBe(true);
  });

  it('returns false for a differently-cased feat name', () => {
    expect(
      hasWeaponMastery(
        makeCharacter({
          feats: [{ name: 'Weapon master', description: 'Mastery' }],
        })
      )
    ).toBe(false);
  });

  it('returns false for unrelated feats', () => {
    expect(
      hasWeaponMastery(
        makeCharacter({
          feats: [
            { name: 'Alert', description: 'Bonus to initiative' },
            { name: 'Skilled', description: 'Extra proficiencies' },
          ],
        })
      )
    ).toBe(false);
  });

  it('returns false without throwing when feats is undefined', () => {
    expect(hasWeaponMastery(makeCharacter({ feats: undefined }))).toBe(false);
  });

  it('ignores masteryProperty annotations on attacks', () => {
    expect(
      hasWeaponMastery(
        makeCharacter({
          classes: [{ name: CharacterClass.Sorcerer, level: 5 }],
          attacks: [
            {
              kind: 'weapon',
              name: 'Quarterstaff',
              ability: Ability.Strength,
              damage: [{ dice: '1d6', type: 'Bludgeoning' }],
              masteryProperty: 'Slow',
            },
          ],
        })
      )
    ).toBe(false);
  });
});
