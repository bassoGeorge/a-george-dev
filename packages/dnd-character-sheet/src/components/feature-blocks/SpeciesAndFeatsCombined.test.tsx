import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Ability } from '../../lib/models/abilities';
import type { Character } from '../../lib/models/character';
import { CharacterClass } from '../../lib/models/character-classes';
import { CharacterSheet } from '../CharacterSheet';
import {
  DEFAULT_VISUAL_ADUSTMENTS,
  type VisualAdjustments,
  VisualAdjustmentsContext,
} from '../VisualAdjustmentsContext';
import { SpeciesAndFeatsCombined } from './SpeciesAndFeatsCombined';

function makeCharacter(overrides: Partial<Character> = {}): Character {
  return {
    name: 'Test',
    species: 'Elf',
    background: 'Acolyte',
    classes: [{ name: CharacterClass.Wizard, level: 1 }],
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
    hitPoints: { maximum: 8 },
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

function renderPanel(
  characterOverrides: Partial<Character> = {},
  adjustments: VisualAdjustments = {}
) {
  return render(
    <CharacterSheet data={makeCharacter(characterOverrides)}>
      <VisualAdjustmentsContext.Provider
        value={{ ...DEFAULT_VISUAL_ADUSTMENTS, ...adjustments }}
      >
        <SpeciesAndFeatsCombined />
      </VisualAdjustmentsContext.Provider>
    </CharacterSheet>
  );
}

const feyAncestry = { name: 'Fey Ancestry', description: 'Charm advantage.' };
const alert = { name: 'Alert', description: 'Add proficiency to initiative.' };

describe('SpeciesAndFeatsCombined', () => {
  it('titles the panel for both kinds of entry', () => {
    renderPanel();

    expect(screen.getByText('Species Traits & Feats')).toBeInTheDocument();
  });

  describe('combining the two lists', () => {
    it('shows species traits and feats together', () => {
      renderPanel({ speciesTraits: [feyAncestry], feats: [alert] });

      expect(screen.getByText('Fey Ancestry.')).toBeInTheDocument();
      expect(screen.getByText('Alert.')).toBeInTheDocument();
    });

    it('puts species traits before feats', () => {
      const { container } = renderPanel({
        speciesTraits: [feyAncestry],
        feats: [alert],
      });
      // Scoped to the entry name spans; the panel title is bold too
      const names = Array.from(
        container.querySelectorAll('.text-base > .font-bold')
      ).map((el) => el.textContent);

      expect(names).toEqual(['Fey Ancestry.', 'Alert.']);
    });

    it('works with only species traits', () => {
      renderPanel({ speciesTraits: [feyAncestry] });

      expect(screen.getByText('Fey Ancestry.')).toBeInTheDocument();
      expect(screen.queryByText('No features')).not.toBeInTheDocument();
    });

    it('works with only feats', () => {
      renderPanel({ feats: [alert] });

      expect(screen.getByText('Alert.')).toBeInTheDocument();
      expect(screen.queryByText('No features')).not.toBeInTheDocument();
    });

    it('shows the empty placeholder when the character has neither', () => {
      renderPanel();

      expect(screen.getByText('No features')).toBeInTheDocument();
    });
  });

  describe('font size', () => {
    it('uses the base size by default', () => {
      const { container } = renderPanel({ feats: [alert] });

      expect(container.querySelector('.text-base')).toBeInTheDocument();
    });

    it('shrinks entries when the adjustment asks for a small font', () => {
      const { container } = renderPanel(
        { feats: [alert] },
        { speciesAndFeatsFontSize: 'small' }
      );

      expect(container.querySelector('.text-sm')).toBeInTheDocument();
    });
  });
});
