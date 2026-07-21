import {
  CharacterClass,
  DndClassColors,
} from '@ageorgedev/dnd-character-sheet';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { CharacterRosterCard } from './CharacterRosterCard';

vi.mock('@tanstack/react-router', () => ({
  Link: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => <div className={className}>{children}</div>,
}));

describe('CharacterRosterCard', () => {
  it('renders name, description, and one badge per class', () => {
    render(
      <CharacterRosterCard
        slug="claw"
        level={3}
        name="Claw"
        species="Shifter"
        classes={[CharacterClass.Rogue]}
        primaryClass={CharacterClass.Rogue}
        description="Shifter · Arcane Trickster"
      />
    );

    expect(screen.getByText('Claw')).toBeInTheDocument();
    expect(screen.getByText('Shifter · Arcane Trickster')).toBeInTheDocument();
    expect(screen.getByText('Rogue')).toBeInTheDocument();
  });

  it('renders the primary class icon colored by DndClassColors, not the other class', () => {
    const { container } = render(
      <CharacterRosterCard
        slug="omarin-kenate"
        level={5}
        name="Omarin Kenate"
        species="Drow Elf"
        classes={[CharacterClass.Monk, CharacterClass.Fighter]}
        primaryClass={CharacterClass.Fighter}
      />
    );

    const svgs = container.querySelectorAll('svg[aria-hidden="true"]');
    expect(svgs).toHaveLength(1);
    expect(svgs[0]).toHaveClass(DndClassColors[CharacterClass.Fighter].text);
    expect(svgs[0]).not.toHaveClass(DndClassColors[CharacterClass.Monk].text);
  });

  it('renders each class badge colored by its own DndClassColors entry', () => {
    render(
      <CharacterRosterCard
        slug="omarin-kenate"
        level={5}
        name="Omarin Kenate"
        species="Drow Elf"
        classes={[CharacterClass.Monk, CharacterClass.Fighter]}
        primaryClass={CharacterClass.Fighter}
      />
    );

    const monkBadge = screen.getByText('Monk');
    const fighterBadge = screen.getByText('Fighter');
    expect(monkBadge).toHaveClass(DndClassColors[CharacterClass.Monk].surface);
    expect(monkBadge).toHaveClass(
      DndClassColors[CharacterClass.Monk].onSurfaceText
    );
    expect(fighterBadge).toHaveClass(
      DndClassColors[CharacterClass.Fighter].surface
    );
    expect(fighterBadge).toHaveClass(
      DndClassColors[CharacterClass.Fighter].onSurfaceText
    );
  });
});
