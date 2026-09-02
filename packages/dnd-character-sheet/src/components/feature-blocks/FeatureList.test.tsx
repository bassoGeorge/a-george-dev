import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { Feature } from '../../lib/models/feature';
import { FeatureList } from './FeatureList';

const features: Feature[] = [
  { name: 'Second Wind', description: 'Regain hit points.' },
  { name: 'Action Surge', description: 'Take an extra action.' },
];

describe('FeatureList', () => {
  it('renders an entry per feature, in order', () => {
    render(<FeatureList features={features} />);

    expect(screen.getByText('Second Wind.')).toBeInTheDocument();
    expect(screen.getByText('Action Surge.')).toBeInTheDocument();
  });

  describe('empty state', () => {
    it('shows a placeholder instead of an empty panel', () => {
      render(<FeatureList features={[]} />);

      expect(screen.getByText('No features')).toBeInTheDocument();
    });

    it('drops the list styling, so the placeholder is not laid out in columns', () => {
      const { container } = render(
        <FeatureList features={[]} className="columns-2" />
      );

      expect(container.firstElementChild).not.toHaveClass('columns-2');
    });
  });

  it('merges a caller className onto the populated list', () => {
    const { container } = render(
      <FeatureList features={features} className="columns-2" />
    );

    expect(container.firstElementChild).toHaveClass('columns-2');
  });

  it('forwards other div props', () => {
    render(<FeatureList features={features} data-testid="feature-list" />);

    expect(screen.getByTestId('feature-list')).toBeInTheDocument();
  });

  it('passes smallFont down to each entry', () => {
    const { container } = render(<FeatureList features={features} smallFont />);

    for (const entry of container.querySelectorAll('.text-sm')) {
      expect(entry).toHaveClass('text-sm');
    }
    expect(container.querySelectorAll('.text-sm')).toHaveLength(
      features.length
    );
  });

  it('leaves entries at base size when smallFont is not set', () => {
    const { container } = render(<FeatureList features={features} />);

    expect(container.querySelectorAll('.text-base')).toHaveLength(
      features.length
    );
  });
});
