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
      'before:bg-accent'
    );
    expect(screen.getByText('Test Badge').parentElement).toHaveClass(
      'text-neutral-inverse'
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
      'before:bg-accent'
    );

    rerender(<CalloutBadge {...defaultProps} type="info2" />);
    expect(screen.getByText('Test Badge').parentElement).toHaveClass(
      'before:bg-accent-subtle'
    );

    rerender(<CalloutBadge {...defaultProps} type="info3" />);
    expect(screen.getByText('Test Badge').parentElement).toHaveClass(
      'before:bg-alt-accent-subtle'
    );

    rerender(<CalloutBadge {...defaultProps} type="neutral" />);
    expect(screen.getByText('Test Badge').parentElement).toHaveClass(
      'before:bg-neutral'
    );

    rerender(<CalloutBadge {...defaultProps} type="danger" />);
    expect(screen.getByText('Test Badge').parentElement).toHaveClass(
      'before:bg-danger-bg'
    );
    expect(screen.getByText('Test Badge').parentElement).toHaveClass(
      'text-danger-fg'
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
