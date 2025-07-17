import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { CalloutBadge } from './CalloutBadge';
import { InfoIcon } from '@phosphor-icons/react/ssr';

describe('CalloutBadge', () => {
  const defaultProps = {
    text: 'Test Badge',
    icon: InfoIcon,
  };

  it('renders with default props', () => {
    render(<CalloutBadge {...defaultProps} />);
    expect(screen.getByText('Test Badge')).toBeInTheDocument();
    expect(screen.getByText('Test Badge').parentElement).toHaveClass(
      'before:bg-primary-surface-2'
    );
    expect(screen.getByText('Test Badge').parentElement).toHaveClass(
      'text-primary-onsurface-2'
    );
  });

  it('applies custom className', () => {
    render(<CalloutBadge {...defaultProps} className="custom-class" />);
    expect(
      screen.getByText('Test Badge').parentElement?.parentElement?.parentElement
    ).toHaveClass('custom-class');
  });

  it('renders with different types', () => {
    const { rerender } = render(
      <CalloutBadge {...defaultProps} type="info1" />
    );
    expect(screen.getByText('Test Badge').parentElement).toHaveClass(
      'before:bg-primary-surface-2'
    );
    expect(screen.getByText('Test Badge').parentElement).toHaveClass(
      'text-primary-onsurface-2'
    );

    rerender(<CalloutBadge {...defaultProps} type="info2" />);
    expect(screen.getByText('Test Badge').parentElement).toHaveClass(
      'before:bg-primary-surface'
    );
    expect(screen.getByText('Test Badge').parentElement).toHaveClass(
      'text-primary-onsurface'
    );

    rerender(<CalloutBadge {...defaultProps} type="info3" />);
    expect(screen.getByText('Test Badge').parentElement).toHaveClass(
      'before:bg-primary-surface-0'
    );
    expect(screen.getByText('Test Badge').parentElement).toHaveClass(
      'text-primary-onsurface-0'
    );

    rerender(<CalloutBadge {...defaultProps} type="neutral" />);
    expect(screen.getByText('Test Badge').parentElement).toHaveClass(
      'before:bg-info-surface'
    );
    expect(screen.getByText('Test Badge').parentElement).toHaveClass(
      'text-info-onsurface'
    );

    rerender(<CalloutBadge {...defaultProps} type="danger" />);
    expect(screen.getByText('Test Badge').parentElement).toHaveClass(
      'before:bg-destructive-surface'
    );
    expect(screen.getByText('Test Badge').parentElement).toHaveClass(
      'text-destructive-onsurface'
    );
  });

  it('renders with default padding when no className is provided', () => {
    render(<CalloutBadge {...defaultProps} />);
    expect(
      screen.getByText('Test Badge').parentElement?.parentElement?.parentElement
    ).toHaveClass('inline-block');
    expect(
      screen.getByText('Test Badge').parentElement?.parentElement?.parentElement
    ).toHaveClass('p-5');
  });
});
