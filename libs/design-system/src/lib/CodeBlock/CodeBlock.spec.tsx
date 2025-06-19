import '@testing-library/jest-dom';
import { act, render } from '@testing-library/react';
import { ThemeProvider } from '../theming/ThemeProvider';
import { Theme } from '../theming/models';
import { CodeBlock } from './CodeBlock';

jest.mock('../theming/ThemeProvider');

async function setupTestSubject(ui: React.ReactElement, theme: Theme = 'dark') {
  return act(() =>
    render(<ThemeProvider startingTheme={theme}>{ui}</ThemeProvider>)
  );
}

describe('CodeBlock', () => {
  const defaultProps = {
    text: 'const hello = "world";',
    lang: 'typescript' as const,
  };

  it('renders code with default props', async () => {
    const { container } = await setupTestSubject(
      <CodeBlock {...defaultProps} />
    );
    const codeElement = container.querySelector('code');
    expect(codeElement).toBeInTheDocument();
  });

  it('renders with different font sizes', async () => {
    const { container, rerender } = await setupTestSubject(
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

  it('renders with different languages', async () => {
    const { container } = await setupTestSubject(
      <CodeBlock {...defaultProps} lang="javascript" />
    );
    const codeElement = container.querySelector('code');
    expect(codeElement).toBeInTheDocument();
    expect(codeElement?.textContent).toBe('1const hello = "world";');
  });

  it('renders with dark theme', async () => {
    const { container } = await setupTestSubject(
      <CodeBlock {...defaultProps} />,
      'dark'
    );
    const codeElement = container.querySelector('code');
    expect(codeElement).toBeInTheDocument();
    expect(codeElement?.textContent).toBe('1const hello = "world";');
  });
});
