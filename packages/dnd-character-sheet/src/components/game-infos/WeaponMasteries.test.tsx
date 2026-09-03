import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { WeaponMasteries } from './WeaponMasteries';

const ALL_MASTERIES = [
  'Cleave',
  'Graze',
  'Nick',
  'Push',
  'Sap',
  'Slow',
  'Topple',
  'Vex',
];

describe('WeaponMasteries', () => {
  it('renders the panel title without a CharacterSheet provider', () => {
    render(<WeaponMasteries />);
    expect(screen.getByText('Weapon Mastery Properties')).toBeInTheDocument();
  });

  it('renders all eight masteries, each with a description', () => {
    render(<WeaponMasteries />);
    for (const mastery of ALL_MASTERIES) {
      const name = screen.getByText(`${mastery}.`);
      expect(name).toBeInTheDocument();
      // the description is the sibling span within the same entry
      expect(name.nextElementSibling?.textContent?.length ?? 0).toBeGreaterThan(
        0
      );
    }
  });

  it('renders the masteries in alphabetical order', () => {
    const { container } = render(<WeaponMasteries />);
    const rendered = Array.from(
      container.querySelectorAll('span.font-bold')
    ).map((span) => span.textContent?.trim().replace(/\.$/, ''));
    expect(rendered).toEqual(ALL_MASTERIES);
  });
});
