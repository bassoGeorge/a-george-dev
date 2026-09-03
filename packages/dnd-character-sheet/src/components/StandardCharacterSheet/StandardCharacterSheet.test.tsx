import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Ability } from '../../lib/models/abilities';
import type { Character } from '../../lib/models/character';
import { CharacterClass } from '../../lib/models/character-classes';
import type { SheetUserPreferences } from '../SheetUserPreferences';
import { StandardCharacterSheet } from './StandardCharacterSheet';

function makeCharacter(overrides: Partial<Character> = {}): Character {
  return {
    name: 'Test',
    species: 'Human',
    background: 'Soldier',
    classes: [{ name: CharacterClass.Fighter, level: 1 }],
    abilities: {
      [Ability.Strength]: 10,
      [Ability.Dexterity]: 10,
      [Ability.Constitution]: 10,
      [Ability.Intelligence]: 10,
      [Ability.Wisdom]: 10,
      [Ability.Charisma]: 10,
    },
    savingThrowProficiencies: [],
    skillProficiencies: [],
    skillExpertise: [],
    baseArmorClass: 10,
    speed: 30,
    hitPoints: { maximum: 10 },
    attacks: [],
    equipment: [],
    features: [],
    armorProficiencies: [],
    weaponProficiencies: [],
    toolProficiencies: [],
    languages: [],
    ...overrides,
  };
}

function renderSheet(
  prefs: SheetUserPreferences,
  overrides: Partial<Character> = {}
) {
  return render(
    <StandardCharacterSheet
      data={makeCharacter(overrides)}
      userPreferences={prefs}
    />
  );
}

describe('StandardCharacterSheet user preferences', () => {
  describe('showNotes', () => {
    it('shows the Notes panel when true', () => {
      renderSheet({ showNotes: true });
      expect(screen.getByText('Notes')).toBeInTheDocument();
    });

    it('hides the Notes panel when false', () => {
      renderSheet({ showNotes: false });
      expect(screen.queryByText('Notes')).not.toBeInTheDocument();
    });

    it('hides the Notes panel when omitted', () => {
      renderSheet({});
      expect(screen.queryByText('Notes')).not.toBeInTheDocument();
    });
  });

  describe('showActionsInCombat', () => {
    it('shows the Actions in Combat panel when true', () => {
      renderSheet({ showActionsInCombat: true });
      expect(screen.getByText('Actions in Combat')).toBeInTheDocument();
    });

    it('hides the Actions in Combat panel when false', () => {
      renderSheet({ showActionsInCombat: false });
      expect(screen.queryByText('Actions in Combat')).not.toBeInTheDocument();
    });

    it('hides the Actions in Combat panel when omitted', () => {
      renderSheet({});
      expect(screen.queryByText('Actions in Combat')).not.toBeInTheDocument();
    });
  });

  describe('showWeaponMasteries', () => {
    // Eligibility is class-based, so the default Fighter fixture qualifies and
    // a Wizard is used to exercise the ineligible path.
    const ineligible: Partial<Character> = {
      classes: [{ name: CharacterClass.Wizard, level: 1 }],
    };

    it('shows the Weapon Mastery Properties panel for an eligible character when true', () => {
      renderSheet({ showWeaponMasteries: true });
      expect(screen.getByText('Weapon Mastery Properties')).toBeInTheDocument();
    });

    it('hides the Weapon Mastery Properties panel when false', () => {
      renderSheet({ showWeaponMasteries: false });
      expect(
        screen.queryByText('Weapon Mastery Properties')
      ).not.toBeInTheDocument();
    });

    it('hides the Weapon Mastery Properties panel when omitted', () => {
      renderSheet({});
      expect(
        screen.queryByText('Weapon Mastery Properties')
      ).not.toBeInTheDocument();
    });

    it('hides the Weapon Mastery Properties panel for an ineligible character even when true', () => {
      renderSheet({ showWeaponMasteries: true }, ineligible);
      expect(
        screen.queryByText('Weapon Mastery Properties')
      ).not.toBeInTheDocument();
    });

    it('shows the panel for an eligible character with no annotated attacks', () => {
      renderSheet(
        { showWeaponMasteries: true },
        {
          attacks: [
            {
              name: 'Longsword',
              kind: 'weapon',
              ability: Ability.Strength,
              damage: [{ dice: '1d8', type: 'Slashing' }],
            },
          ],
        }
      );
      expect(screen.getByText('Weapon Mastery Properties')).toBeInTheDocument();
    });
  });
});
