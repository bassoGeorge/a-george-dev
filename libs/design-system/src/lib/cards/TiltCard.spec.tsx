import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { TiltCard } from './TiltCard';
import styles from './TiltCard.module.css';

describe('TiltCard', () => {
  it('renders with default styles', () => {
    render(<TiltCard>Card content</TiltCard>);
    const card = screen.getByText('Card content');
    expect(card).toBeInTheDocument();
    expect(card.parentElement?.parentElement).toHaveClass('elv-raised-md');
    expect(card.parentElement?.parentElement).toHaveClass(
      styles['skew-medium']
    );
  });

  it('applies custom className', () => {
    render(<TiltCard className="custom-class">Card content</TiltCard>);
    const card = screen.getByText('Card content');
    expect(card).toHaveClass('custom-class');
  });

  it('applies outerClassName', () => {
    render(<TiltCard outerClassName="outer-class">Card content</TiltCard>);
    const card = screen.getByText('Card content');
    expect(card.parentElement?.parentElement).toHaveClass('outer-class');
  });

  it('applies different shapes', () => {
    const { rerender } = render(
      <TiltCard shape="trapRight">Card content</TiltCard>
    );
    expect(
      screen.getByText('Card content').parentElement?.parentElement
    ).toHaveClass(styles.trapRight);

    rerender(<TiltCard shape="trapLeft">Card content</TiltCard>);
    expect(
      screen.getByText('Card content').parentElement?.parentElement
    ).toHaveClass(styles.trapLeft);

    rerender(<TiltCard shape="triUpperRight">Card content</TiltCard>);
    expect(
      screen.getByText('Card content').parentElement?.parentElement
    ).toHaveClass(styles.triUpperRight);

    rerender(<TiltCard shape="triUpperLeft">Card content</TiltCard>);
    expect(
      screen.getByText('Card content').parentElement?.parentElement
    ).toHaveClass(styles.triUpperLeft);
  });

  it('applies different skew strengths', () => {
    const { rerender } = render(
      <TiltCard skewStrength="small">Card content</TiltCard>
    );
    expect(
      screen.getByText('Card content').parentElement?.parentElement
    ).toHaveClass(styles['skew-small']);

    rerender(<TiltCard skewStrength="medium">Card content</TiltCard>);
    expect(
      screen.getByText('Card content').parentElement?.parentElement
    ).toHaveClass(styles['skew-medium']);

    rerender(<TiltCard skewStrength="large">Card content</TiltCard>);
    expect(
      screen.getByText('Card content').parentElement?.parentElement
    ).toHaveClass(styles['skew-large']);
  });

  it('applies interactive styles when interactive is true', () => {
    render(<TiltCard interactive>Card content</TiltCard>);
    expect(
      screen.getByText('Card content').parentElement?.parentElement
    ).toHaveClass('hover:elv-raised-lg');
  });

  it('applies different border styles', () => {
    const { rerender } = render(<TiltCard border="all">Card content</TiltCard>);
    expect(screen.getByText('Card content').parentElement).toHaveClass(
      'p-thick-line'
    );

    rerender(<TiltCard border="bottom">Card content</TiltCard>);
    expect(screen.getByText('Card content').parentElement).toHaveClass(
      'pb-thick-line'
    );

    rerender(<TiltCard border="none">Card content</TiltCard>);
    expect(screen.getByText('Card content').parentElement).not.toHaveClass(
      'p-thick-line'
    );
    expect(screen.getByText('Card content').parentElement).not.toHaveClass(
      'pb-thick-line'
    );
  });

  it('forwards HTML props', () => {
    render(
      <TiltCard data-testid="test-card" aria-label="Test Card">
        Card content
      </TiltCard>
    );
    const card = screen.getByTestId('test-card');
    expect(card).toHaveAttribute('aria-label', 'Test Card');
  });
});
