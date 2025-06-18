import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { CodeBlock } from './CodeBlock';
import { ThemeProvider } from '../theming/theme-provider';

// Mock window.matchMedia for tests
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

describe('CodeBlock', () => {
  const defaultProps = {
    text: 'const hello = "world";',
    lang: 'typescript' as const,
  };

  const renderWithTheme = (ui: React.ReactElement) => {
    return render(<ThemeProvider>{ui}</ThemeProvider>);
  };

  it('renders code with default props', () => {
    const { container } = renderWithTheme(<CodeBlock {...defaultProps} />);
    const codeElement = container.querySelector('code');
    expect(codeElement).toBeInTheDocument();
  });

  it('renders with different font sizes', () => {
    const { container, rerender } = renderWithTheme(
      <CodeBlock {...defaultProps} fontSize="small" />
    );
    const codeElement = container.querySelector('code');
    expect(codeElement?.parentElement?.parentElement).toHaveClass('text-md');

    rerender(
      <ThemeProvider>
        <CodeBlock {...defaultProps} fontSize="large" />
      </ThemeProvider>
    );
    const codeElementLarge = container.querySelector('code');
    expect(codeElementLarge?.parentElement?.parentElement).toHaveClass(
      'text-xl'
    );
  });

  it('renders with different languages', () => {
    const { container } = renderWithTheme(
      <CodeBlock {...defaultProps} lang="javascript" />
    );
    const codeElement = container.querySelector('code');
    expect(codeElement).toBeInTheDocument();
    expect(codeElement?.textContent).toBe('1const hello = "world";');
  });

  it('renders with dark theme', () => {
    document.documentElement.classList.add('dark');
    const { container } = renderWithTheme(<CodeBlock {...defaultProps} />);
    const codeElement = container.querySelector('code');
    expect(codeElement).toBeInTheDocument();
    expect(codeElement?.textContent).toBe('1const hello = "world";');
    document.documentElement.classList.remove('dark');
  });
});
