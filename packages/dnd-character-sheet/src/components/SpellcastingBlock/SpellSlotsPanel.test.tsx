import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Ability } from '../../lib/models/abilities';
import type { Character } from '../../lib/models/character';
import { CharacterClass } from '../../lib/models/character-classes';
import type { Spellcasting } from '../../lib/models/spellcasting';
import { CharacterSheet } from '../CharacterSheet';
import { SpellSlotsPanel } from './SpellSlotsPanel';

function makeCharacter(overrides: Partial<Character> = {}): Character {
  return {
    name: 'Test',
    species: 'Human',
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
    spellcasting: { ability: Ability.Intelligence, spells: [] },
    ...overrides,
  };
}

function renderPanel(spellcasting: Spellcasting | undefined) {
  return render(
    <CharacterSheet data={makeCharacter({ spellcasting })}>
      <SpellSlotsPanel />
    </CharacterSheet>
  );
}

const baseSpellcasting = { ability: Ability.Intelligence, spells: [] };

/** Slot row labels in DOM order — the ordering of pact magic vs levelled slots
 * is the main thing this panel decides. */
function slotLabels() {
  return Array.from(document.querySelectorAll('.text-xs.text-neutral-subdued'))
    .map((el) => el.textContent ?? '')
    .filter((text) => /^(Level \d+|Pact Magic level \d+)$/.test(text));
}

/** The checkbox count rendered for a given slot row. */
function checkboxesFor(label: string) {
  const row = Array.from(document.querySelectorAll('.flex.gap-1')).find(
    (el) => el.querySelector('span')?.textContent === label
  );
  return row?.querySelectorAll('.rounded-full').length ?? 0;
}

describe('SpellSlotsPanel', () => {
  it('renders nothing for a character who cannot cast', () => {
    const { container } = renderPanel(undefined);
    expect(container).toBeEmptyDOMElement();
  });

  describe('levelled slots', () => {
    it('lists each level with as many checkboxes as slots', () => {
      renderPanel({ ...baseSpellcasting, slots: { 1: 4, 2: 3 } });

      expect(checkboxesFor('Level 1')).toBe(4);
      expect(checkboxesFor('Level 2')).toBe(3);
    });

    it('lists levels in ascending order', () => {
      renderPanel({ ...baseSpellcasting, slots: { 3: 2, 1: 4, 2: 3 } });

      expect(slotLabels()).toEqual(['Level 1', 'Level 2', 'Level 3']);
    });

    it('skips levels the character has no slots for', () => {
      renderPanel({ ...baseSpellcasting, slots: { 1: 4, 3: 2 } });

      expect(slotLabels()).toEqual(['Level 1', 'Level 3']);
    });

    it('shows "No Slots" when the caster has none', () => {
      renderPanel(baseSpellcasting);

      expect(screen.getByText('No Slots')).toBeInTheDocument();
      expect(slotLabels()).toEqual([]);
    });
  });

  describe('pact magic', () => {
    it('lists pact magic slots at their own level', () => {
      renderPanel({
        ...baseSpellcasting,
        pactMagic: { level: 3, slots: 2 },
      });

      expect(slotLabels()).toEqual(['Pact Magic level 3']);
      expect(checkboxesFor('Pact Magic level 3')).toBe(2);
    });

    it('puts pact magic before levelled slots', () => {
      renderPanel({
        ...baseSpellcasting,
        slots: { 1: 4, 2: 3 },
        pactMagic: { level: 3, slots: 2 },
      });

      expect(slotLabels()).toEqual([
        'Pact Magic level 3',
        'Level 1',
        'Level 2',
      ]);
    });
  });

  describe('prepared spell count', () => {
    it('shows the configured number', () => {
      renderPanel({ ...baseSpellcasting, numberOfPreparedSpells: 6 });

      expect(screen.getByText('6')).toBeInTheDocument();
    });

    it('falls back to 0 when unset', () => {
      renderPanel(baseSpellcasting);

      expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('shows the spell-change trait when the character has one', () => {
      renderPanel({
        ...baseSpellcasting,
        spellChangeTrait: 'On a long rest',
      });

      expect(screen.getByText('Changing spells:')).toBeInTheDocument();
      expect(screen.getByText(/On a long rest/)).toBeInTheDocument();
    });

    it('omits the spell-change trait when there is none', () => {
      renderPanel(baseSpellcasting);

      expect(screen.queryByText('Changing spells:')).not.toBeInTheDocument();
    });
  });

  describe('column layout', () => {
    // The panel picks a column count from how many slot rows there are, so that
    // short lists do not stretch and long ones stay readable.
    const columnsFor = () =>
      document.querySelector('[class*="columns-"]')?.className ?? '';

    it('uses a single column for one row', () => {
      renderPanel({ ...baseSpellcasting, slots: { 1: 4 } });
      expect(columnsFor()).not.toMatch(/\bcolumns-2\b|\bcolumns-3\b/);
    });

    const slotsForRows = (count: number) =>
      Object.fromEntries(
        Array.from({ length: count }, (_, i) => [i + 1, 1])
      ) as Spellcasting['slots'];

    it.each([2, 4])('uses two columns for %i rows', (count) => {
      renderPanel({ ...baseSpellcasting, slots: slotsForRows(count) });

      expect(columnsFor()).toMatch(/\bcolumns-2\b/);
    });

    it.each([3, 5])('uses three columns for %i rows', (count) => {
      renderPanel({ ...baseSpellcasting, slots: slotsForRows(count) });

      expect(columnsFor()).toMatch(/\bcolumns-3\b/);
    });
  });
});
