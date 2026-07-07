import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Ability } from '../../lib/models/abilities';
import type { Character } from '../../lib/models/character';
import { CharacterClass } from '../../lib/models/character-classes';
import { Skill } from '../../lib/models/skills';
import { CharacterSheet } from '../CharacterSheet';
import { AbilityBox } from './AbilityBox';

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

function renderAbilityBox(ability: Ability, character: Character) {
  return render(
    <CharacterSheet data={character}>
      <AbilityBox ability={ability} />
    </CharacterSheet>
  );
}

/** Navigate from a label text to its preceding CircleCheck span.
 * SkillRow renders: CircleCheck | modifier span | label span */
function getCheckboxForLabel(labelText: string): Element {
  const labelEl = screen.getByText(labelText);
  // label text may be directly in the span or inside a <b> child
  const labelSpan = labelEl.tagName === 'B' ? labelEl.parentElement : labelEl;
  if (!labelSpan) throw new Error(`No parent element for "${labelText}"`);
  const modifierSpan = labelSpan.previousElementSibling;
  if (!modifierSpan) throw new Error(`No modifier sibling for "${labelText}"`);
  const checkbox = modifierSpan.previousElementSibling;
  if (!checkbox) throw new Error(`No checkbox sibling for "${labelText}"`);
  return checkbox;
}

describe('AbilityBox', () => {
  it('displays the raw ability score', () => {
    renderAbilityBox(
      Ability.Strength,
      makeCharacter({
        abilities: { ...makeCharacter().abilities, [Ability.Strength]: 16 },
      })
    );
    expect(screen.getByText('16')).toBeInTheDocument();
  });

  it('displays the formatted ability modifier', () => {
    // STR 16 → mod +3
    renderAbilityBox(
      Ability.Strength,
      makeCharacter({
        abilities: { ...makeCharacter().abilities, [Ability.Strength]: 16 },
      })
    );
    expect(screen.getByText('+3')).toBeInTheDocument();
  });

  it('saving throw checkbox is checked when ability is in savingThrowProficiencies', () => {
    const character = makeCharacter({
      savingThrowProficiencies: [Ability.Strength],
    });
    renderAbilityBox(Ability.Strength, character);
    const checkbox = getCheckboxForLabel('Saving Throw');
    expect(checkbox).toHaveClass('bg-primary-surface-2');
  });

  it('saving throw checkbox is unchecked when ability is not in savingThrowProficiencies', () => {
    renderAbilityBox(Ability.Strength, makeCharacter());
    const checkbox = getCheckboxForLabel('Saving Throw');
    expect(checkbox).not.toHaveClass('bg-primary-surface-2');
  });

  it('skill checkbox is checked when skill is in skillProficiencies', () => {
    // STR ability → Athletics skill
    const character = makeCharacter({ skillProficiencies: [Skill.Athletics] });
    renderAbilityBox(Ability.Strength, character);
    const checkbox = getCheckboxForLabel('Athletics');
    expect(checkbox).toHaveClass('bg-primary-surface-2');
  });

  it('skill checkbox is in special state when skill is in skillExpertise', () => {
    // DEX ability → Acrobatics skill
    const character = makeCharacter({ skillExpertise: [Skill.Acrobatics] });
    renderAbilityBox(Ability.Dexterity, character);
    const checkbox = getCheckboxForLabel('Acrobatics');
    expect(checkbox).toHaveClass('bg-secondary-surface-2');
  });

  it('modifier column shows whitespace when skill total equals ability modifier', () => {
    // STR 10 → mod 0, Athletics not proficient → total 0 = abilityMod → non-breaking space shown
    renderAbilityBox(Ability.Strength, makeCharacter());
    const athleticsSpan = screen.getByText('Athletics');
    // modifier span is the immediate previous sibling of the label span
    expect(athleticsSpan.previousElementSibling?.textContent).toBe(' ');
  });
});
