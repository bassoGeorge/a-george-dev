import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Ability } from '../../lib/models/abilities';
import type { Character } from '../../lib/models/character';
import { CharacterClass } from '../../lib/models/character-classes';
import type { Spell } from '../../lib/models/spellcasting';
import { CharacterSheet } from '../CharacterSheet';
import { GroupedSpellList } from './GroupedSpellList';

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

function renderGroupedSpellList(
  spells: Spell[],
  characterOverrides: Partial<Character> = {}
) {
  const character = makeCharacter({
    ...characterOverrides,
    spellcasting: { ability: Ability.Intelligence, spells },
  });
  return render(
    <CharacterSheet data={character}>
      <GroupedSpellList />
    </CharacterSheet>
  );
}

/** Group headings in DOM order — the component's whole job is bucketing by level.
 * The panel's own "Spells" title is an h3 too, so it is filtered out. */
function groupHeadings() {
  return screen
    .getAllByRole('heading', { level: 3 })
    .map((h) => h.textContent ?? '')
    .filter((text) => text !== 'Spells');
}

/** Spell names, in DOM order, inside the group whose heading matches `heading`.
 * Reads the name span of each cell rather than all `.text-xs` text, which would
 * also pick up the heading and the "AP" marker. */
function spellsUnder(heading: string) {
  const h3 = screen
    .getAllByRole('heading', { level: 3 })
    .find((el) => el.textContent === heading);
  const cells = h3?.nextElementSibling?.children ?? [];
  return Array.from(cells).map(
    (cell) => cell.querySelector('.flex-1 > div > span')?.textContent ?? ''
  );
}

describe('GroupedSpellList', () => {
  describe('grouping', () => {
    it('labels level 0 as Cantrips and other levels by number', () => {
      renderGroupedSpellList([
        { name: 'Mage Hand', level: 0 },
        { name: 'Magic Missile', level: 1 },
        { name: 'Fireball', level: 3 },
      ]);

      expect(groupHeadings()).toEqual(['Cantrips', 'Level 1', 'Level 3']);
    });

    it('orders groups by ascending level regardless of input order', () => {
      renderGroupedSpellList([
        { name: 'Fireball', level: 3 },
        { name: 'Mage Hand', level: 0 },
        { name: 'Magic Missile', level: 1 },
      ]);

      expect(groupHeadings()).toEqual(['Cantrips', 'Level 1', 'Level 3']);
    });

    it('omits levels that have no spells', () => {
      renderGroupedSpellList([
        { name: 'Mage Hand', level: 0 },
        { name: 'Fireball', level: 3 },
      ]);

      expect(groupHeadings()).toEqual(['Cantrips', 'Level 3']);
      expect(screen.queryByText('Level 1')).not.toBeInTheDocument();
    });

    it('puts every spell of a level in that level group', () => {
      renderGroupedSpellList([
        { name: 'Magic Missile', level: 1 },
        { name: 'Shield', level: 1 },
      ]);

      expect(spellsUnder('Level 1')).toEqual(
        expect.arrayContaining(['Magic Missile', 'Shield'])
      );
    });

    it('renders no groups when the character has no spells', () => {
      renderGroupedSpellList([]);

      expect(groupHeadings()).toEqual([]);
      expect(screen.getByText('Spells')).toBeInTheDocument();
    });

    it('renders no groups when the character cannot cast at all', () => {
      render(
        <CharacterSheet data={makeCharacter({ spellcasting: undefined })}>
          <GroupedSpellList />
        </CharacterSheet>
      );

      expect(groupHeadings()).toEqual([]);
    });
  });

  describe('ordering within a group', () => {
    it('puts alwaysPrepared spells before the rest', () => {
      renderGroupedSpellList([
        { name: 'Magic Missile', level: 1 },
        { name: 'Shield', level: 1, alwaysPrepared: true },
      ]);

      expect(spellsUnder('Level 1')).toEqual(['Shield', 'Magic Missile']);
    });

    it('sorts alphabetically within the same prep status', () => {
      renderGroupedSpellList([
        { name: 'Thunderwave', level: 1 },
        { name: 'Burning Hands', level: 1 },
      ]);

      expect(spellsUnder('Level 1')).toEqual(['Burning Hands', 'Thunderwave']);
    });
  });

  describe('prep marker', () => {
    it('shows "AP" for an alwaysPrepared spell', () => {
      renderGroupedSpellList([
        { name: 'Shield', level: 1, alwaysPrepared: true },
      ]);

      expect(screen.getByText('AP')).toBeInTheDocument();
    });

    it('shows a checkable circle for a regular spell', () => {
      renderGroupedSpellList([{ name: 'Magic Missile', level: 1 }]);

      expect(screen.queryByText('AP')).not.toBeInTheDocument();
      expect(document.querySelector('.rounded-full')).toBeInTheDocument();
    });

    it('shows neither for a cantrip, which is always available', () => {
      renderGroupedSpellList([{ name: 'Mage Hand', level: 0 }]);

      expect(screen.queryByText('AP')).not.toBeInTheDocument();
      expect(document.querySelector('.rounded-full')).toBeNull();
    });
  });

  describe('spell annotations', () => {
    it('marks concentration, ritual and consumed-material as C, R, M', () => {
      renderGroupedSpellList([
        {
          name: 'Find Familiar',
          level: 1,
          concentration: true,
          ritual: true,
          components: { materialConsumed: true },
        },
      ]);

      expect(screen.getByText('C, R, M')).toBeInTheDocument();
    });

    it('lists only the flags that are set', () => {
      renderGroupedSpellList([{ name: 'Hex', level: 1, concentration: true }]);

      expect(screen.getByText('C')).toBeInTheDocument();
    });

    it('shows nothing when no flags are set', () => {
      renderGroupedSpellList([{ name: 'Magic Missile', level: 1 }]);

      expect(screen.queryByText(/^C(, R)?(, M)?$/)).not.toBeInTheDocument();
    });

    it('shows a free-use count with that many checkboxes', () => {
      renderGroupedSpellList([{ name: 'Misty Step', level: 2, freeUses: 3 }]);

      expect(screen.getByText('free x3')).toBeInTheDocument();
    });

    it('shows spell notes', () => {
      renderGroupedSpellList([
        { name: 'Magic Missile', level: 1, notes: 'Never misses' },
      ]);

      expect(screen.getByText('Never misses')).toBeInTheDocument();
    });
  });

  describe('alternate casting ability', () => {
    it('shows short name, to-hit and DC derived from that ability', () => {
      // STR 16 → mod +3, level 1 → profBonus +2 → toHit +5, DC 3 + 2 + 8 = 13
      renderGroupedSpellList(
        [
          {
            name: 'Shillelagh',
            level: 0,
            alternativeAbility: Ability.Strength,
          },
        ],
        { abilities: { ...makeCharacter().abilities, [Ability.Strength]: 16 } }
      );

      expect(
        screen.getByText('Str. spell, +5 to Hit, DC 13')
      ).toBeInTheDocument();
    });

    it('separates notes from the alternate-ability text with a middot', () => {
      renderGroupedSpellList(
        [
          {
            name: 'Shillelagh',
            level: 0,
            notes: 'Club only',
            alternativeAbility: Ability.Strength,
          },
        ],
        { abilities: { ...makeCharacter().abilities, [Ability.Strength]: 16 } }
      );

      expect(screen.getByText('Club only')).toBeInTheDocument();
      expect(screen.getByText('·')).toBeInTheDocument();
    });

    it('omits the alternate-ability text when the spell uses the default ability', () => {
      renderGroupedSpellList([{ name: 'Magic Missile', level: 1 }]);

      expect(screen.queryByText(/to Hit, DC/)).not.toBeInTheDocument();
    });
  });
});
