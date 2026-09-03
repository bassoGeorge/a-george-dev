import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CreatureSheet } from './CreatureSheet';

describe('CreatureSheet', () => {
  it('renders nothing for an empty creature list', () => {
    const { container } = render(<CreatureSheet creatures={[]} />);

    expect(container).toBeEmptyDOMElement();
  });

  it('renders multiple creatures in authored order', () => {
    render(
      <CreatureSheet
        creatures={[{ name: 'First Creature' }, { name: 'Second Creature' }]}
      />
    );

    expect(
      screen
        .getAllByTestId('creature-stat-block')
        .map((block) => block.textContent)
    ).toEqual(['First Creature', 'Second Creature']);
  });
});
