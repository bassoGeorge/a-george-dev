import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Ability } from '../../lib/models/abilities';
import type { Creature } from '../../lib/models/creature';
import { Skill } from '../../lib/models/skills';
import { CreatureStatBlock } from './CreatureStatBlock';

describe('CreatureStatBlock', () => {
  it('renders a name-only creature without empty sections', () => {
    render(<CreatureStatBlock creature={{ name: 'Tiny Friend' }} />);

    expect(
      screen.getByRole('heading', { name: 'Tiny Friend' })
    ).toBeInTheDocument();
    expect(screen.queryByText('AC')).not.toBeInTheDocument();
    expect(screen.queryByText('Abilities')).not.toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: 'Actions' })
    ).not.toBeInTheDocument();
  });

  it('renders populated fields, flexible notation, and rich rules text', () => {
    const creature: Creature = {
      name: 'Guard Beast',
      size: 'Large',
      creatureType: 'Beast',
      alignment: 'Unaligned',
      armorClass: '15 (natural armor)',
      initiative: 2,
      speed: '30 ft., Fly 60 ft.',
      hitPoints: { maximum: 22, dice: '4d10' },
      abilities: {
        [Ability.Strength]: 17,
        [Ability.Wisdom]: 13,
      },
      savingThrows: { [Ability.Strength]: 5 },
      skills: { [Skill.Perception]: 4 },
      senses: ['Darkvision 60 ft.', 'Passive Perception 14'],
      languages: ['Common'],
      challengeRating: '1/2',
      experiencePoints: 100,
      proficiencyBonus: 2,
      details: [{ label: 'Resistances', value: 'Fire' }],
      actions: [
        {
          name: 'Rend',
          description: '<em>Melee Attack Roll:</em> +5 to hit.',
        },
      ],
      reactions: [{ name: 'Guard', description: 'Reduce damage by 2.' }],
    };

    render(<CreatureStatBlock creature={creature} />);

    expect(screen.getByText('Large Beast Unaligned')).toBeInTheDocument();
    expect(screen.getByText('15 (natural armor)')).toBeInTheDocument();
    expect(screen.getByText('+2 (12)')).toBeInTheDocument();
    expect(screen.getByText('30 ft., Fly 60 ft.')).toBeInTheDocument();
    expect(screen.getByTitle('Strength modifier')).toHaveTextContent('+3');
    expect(screen.getByTitle('Strength save')).toHaveTextContent('+5');
    expect(screen.getByText('Perception +4')).toBeInTheDocument();
    expect(screen.getByText('1/2 (XP 100; PB +2)')).toBeInTheDocument();
    expect(screen.getByText('Fire')).toBeInTheDocument();
    expect(screen.getByText('Melee Attack Roll:')).toBeInstanceOf(HTMLElement);
    expect(
      screen.queryByRole('heading', { name: 'Bonus Actions' })
    ).not.toBeInTheDocument();
  });

  it('preserves authored entry order', () => {
    render(
      <CreatureStatBlock
        creature={{
          name: 'Ordered Beast',
          actions: [
            { name: 'First', description: 'First action.' },
            { name: 'Second', description: 'Second action.' },
          ],
        }}
      />
    );

    const actions = screen.getByRole('heading', {
      name: 'Actions',
    }).parentElement;
    expect(actions).not.toBeNull();
    const entries = within(actions as HTMLElement).getAllByText(/First|Second/);
    expect(entries.map((entry) => entry.textContent)).toEqual([
      'First.',
      'First action.',
      'Second.',
      'Second action.',
    ]);
  });
});
