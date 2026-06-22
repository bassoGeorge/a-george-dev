import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import {
  ComparisonRow,
  DeckFooter,
  SlideMediaRow,
} from './slide-layout-builders';

describe('SlideMediaRow', () => {
  it('renders children', () => {
    render(<SlideMediaRow>slide content</SlideMediaRow>);
    expect(screen.getByText('slide content')).toBeInTheDocument();
  });

  it('merges extra className with base styles', () => {
    const { container } = render(
      <SlideMediaRow className="extra-class">content</SlideMediaRow>
    );
    expect(container.firstChild).toHaveClass('extra-class');
  });
});

describe('DeckFooter', () => {
  it('renders a footer element', () => {
    render(<DeckFooter>footer text</DeckFooter>);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveTextContent('footer text');
  });
});

describe('ComparisonRow', () => {
  it('renders left and right content', () => {
    render(
      <ComparisonRow
        left={<span>Left side</span>}
        right={<span>Right side</span>}
      />
    );
    expect(screen.getByText('Left side')).toBeInTheDocument();
    expect(screen.getByText('Right side')).toBeInTheDocument();
  });

  it('merges extra className', () => {
    const { container } = render(
      <ComparisonRow className="custom-row" left={null} right={null} />
    );
    expect(container.firstChild).toHaveClass('custom-row');
  });
});
