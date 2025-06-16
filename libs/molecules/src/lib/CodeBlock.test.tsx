import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { CodeBlock } from './CodeBlock';
import { ThemeProvider } from './theming/theme-provider';

describe('CodeBlock', () => {
  const defaultProps = {
    text: 'const hello = "world";',
    lang: 'typescript' as const,
  };

  const renderWithTheme = (
    ui: React.ReactElement,
    { theme = 'light' } = {}
  ) => {
    return render(<ThemeProvider>{ui}</ThemeProvider>);
  };

  it('renders code with default props', () => {
    renderWithTheme(<CodeBlock {...defaultProps} />);
    expect(screen.getByText('const hello = "world";')).toBeInTheDocument();
  });

  it('renders with different font sizes', () => {
    const { rerender } = renderWithTheme(
      <CodeBlock {...defaultProps} fontSize="small" />
    );
    expect(
      screen.getByText('const hello = "world";').parentElement
    ).toHaveClass('text-md');

    rerender(
      <ThemeProvider>
        <CodeBlock {...defaultProps} fontSize="large" />
      </ThemeProvider>
    );
    expect(
      screen.getByText('const hello = "world";').parentElement
    ).toHaveClass('text-xl');
  });

  it('renders with different languages', () => {
    renderWithTheme(<CodeBlock {...defaultProps} lang="javascript" />);
    expect(screen.getByText('const hello = "world";')).toBeInTheDocument();
  });

  it('renders with dark theme', () => {
    renderWithTheme(<CodeBlock {...defaultProps} />, { theme: 'dark' });
    expect(screen.getByText('const hello = "world";')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    renderWithTheme(<CodeBlock {...defaultProps} className="custom-class" />);
    expect(
      screen.getByText('const hello = "world";').parentElement?.parentElement
    ).toHaveClass('custom-class');
  });
});
