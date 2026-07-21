import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { describe, expect, it } from 'vitest';
import { CharacterClass } from '../lib/models/character-classes';
import { ArtificerIcon } from './ArtificerIcon';
import { BarbarianIcon } from './BarbarianIcon';
import { BardIcon } from './BardIcon';
import { ClericIcon } from './ClericIcon';
import { CLASS_ICONS } from './class-icons';
import { DruidIcon } from './DruidIcon';
import { FighterIcon } from './FighterIcon';
import { MonkIcon } from './MonkIcon';
import { PaladinIcon } from './PaladinIcon';
import { RangerIcon } from './RangerIcon';
import { RogueIcon } from './RogueIcon';
import { SorcererIcon } from './SorcererIcon';
import { WarlockIcon } from './WarlockIcon';
import { WizardIcon } from './WizardIcon';

describe('CLASS_ICONS', () => {
  const expected: Record<CharacterClass, (props: object) => ReactElement> = {
    [CharacterClass.Artificer]: ArtificerIcon,
    [CharacterClass.Barbarian]: BarbarianIcon,
    [CharacterClass.Bard]: BardIcon,
    [CharacterClass.Cleric]: ClericIcon,
    [CharacterClass.Druid]: DruidIcon,
    [CharacterClass.Fighter]: FighterIcon,
    [CharacterClass.Monk]: MonkIcon,
    [CharacterClass.Paladin]: PaladinIcon,
    [CharacterClass.Ranger]: RangerIcon,
    [CharacterClass.Rogue]: RogueIcon,
    [CharacterClass.Sorcerer]: SorcererIcon,
    [CharacterClass.Warlock]: WarlockIcon,
    [CharacterClass.Wizard]: WizardIcon,
  };

  it.each(
    Object.values(CharacterClass)
  )('maps %s to its icon component', (characterClass) => {
    expect(CLASS_ICONS[characterClass]).toBe(expected[characterClass]);
  });

  it('each icon renders an svg with currentColor fill', () => {
    for (const characterClass of Object.values(CharacterClass)) {
      const Icon = CLASS_ICONS[characterClass];
      const { container } = render(<Icon className="test-class" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('test-class');
      expect(container.querySelector('path[fill="currentColor"]')).toBeTruthy();
    }
  });
});
