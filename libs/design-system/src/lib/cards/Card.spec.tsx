import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Card', () => {
  it('renders with default styles', () => {
    render(<Card>Card content</Card>);
    const card = screen.getByText('Card content');
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass('shadow-normal');
    expect(card).toHaveClass('border-line');
    expect(card).toHaveClass('border-2');
    expect(card).toHaveClass('mb-4');
  });

  it('applies custom className', () => {
    render(<Card className="custom-class">Card content</Card>);
    const card = screen.getByText('Card content');
    expect(card).toHaveClass('custom-class');
  });

  it('forwards HTML props', () => {
    render(
      <Card data-testid="test-card" aria-label="Test Card">
        Card content
      </Card>
    );
    const card = screen.getByTestId('test-card');
    expect(card).toHaveAttribute('aria-label', 'Test Card');
  });
});
