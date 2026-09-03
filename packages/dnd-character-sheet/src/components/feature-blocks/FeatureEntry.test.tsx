import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { Feature } from '../../lib/models/feature';
import { FeatureEntry } from './FeatureEntry';

function makeFeature(overrides: Partial<Feature> = {}): Feature {
  return {
    name: 'Second Wind',
    description: 'Regain hit points as a bonus action.',
    ...overrides,
  };
}

describe('FeatureEntry', () => {
  it('renders the name and description', () => {
    render(<FeatureEntry data={makeFeature()} />);

    expect(screen.getByText('Second Wind.')).toBeInTheDocument();
    expect(
      screen.getByText('Regain hit points as a bonus action.')
    ).toBeInTheDocument();
  });

  it('renders rich text in the description as markup, not escaped text', () => {
    render(
      <FeatureEntry
        data={makeFeature({ description: 'Gain <em>Advantage</em> on saves.' })}
      />
    );

    expect(screen.getByText('Advantage').tagName).toBe('EM');
  });

  describe('notes line', () => {
    it('shows casting time on its own', () => {
      render(<FeatureEntry data={makeFeature({ castingTime: 'Action' })} />);

      expect(screen.getByText('(Action)')).toBeInTheDocument();
    });

    it('shows duration on its own', () => {
      render(<FeatureEntry data={makeFeature({ duration: '1 minute' })} />);

      expect(screen.getByText('(1 minute)')).toBeInTheDocument();
    });

    it('labels the cost', () => {
      render(<FeatureEntry data={makeFeature({ cost: '1 charge' })} />);

      expect(screen.getByText('(Cost: 1 charge)')).toBeInTheDocument();
    });

    it('joins every note with a comma, in order', () => {
      render(
        <FeatureEntry
          data={makeFeature({
            castingTime: 'Action',
            duration: '1 minute',
            cost: '1 charge',
          })}
        />
      );

      expect(
        screen.getByText('(Action, 1 minute, Cost: 1 charge)')
      ).toBeInTheDocument();
    });

    it('omits the notes entirely when the feature has none', () => {
      const { container } = render(<FeatureEntry data={makeFeature()} />);

      expect(container.querySelector('em')).toBeNull();
    });
  });

  describe('font size', () => {
    it('uses the base size by default', () => {
      const { container } = render(<FeatureEntry data={makeFeature()} />);

      expect(container.firstElementChild).toHaveClass('text-base');
    });

    it('shrinks the text when smallFont is set', () => {
      const { container } = render(
        <FeatureEntry data={makeFeature()} smallFont />
      );

      expect(container.firstElementChild).toHaveClass('text-sm');
      expect(container.firstElementChild).not.toHaveClass('text-base');
    });
  });
});
