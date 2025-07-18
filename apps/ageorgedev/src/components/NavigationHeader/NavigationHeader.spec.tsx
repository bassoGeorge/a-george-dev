import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import NavigationHeader from './NavigationHeader';
import { ThemeProvider } from '@ageorgedev/design-system';

// TODO: don't like the whole mock intention, needs a bit more granularity
jest.mock('@ageorgedev/design-system');

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('NavigationHeader', () => {
  it('renders with default props', () => {
    renderWithTheme(<NavigationHeader />);
    // Logo should be a link
    const logoLink = screen.getByRole('link', { name: /a/i });
    expect(logoLink).toHaveAttribute('href', '/');
    // ThemeSwitcher button should be present
    expect(
      screen.getByRole('button', { name: /switch to/i })
    ).toBeInTheDocument();
  });

  it('renders with noLinks (logo is not a link)', () => {
    renderWithTheme(<NavigationHeader noLinks />);
    // Logo should not be a link
    expect(screen.queryByRole('link', { name: /a/i })).not.toBeInTheDocument();
    // Should render a span containing the logo
    expect(screen.getByText('A').closest('span')).toBeInTheDocument();
  });

  it('renders with seemless (no TiltCard wrapper)', () => {
    const { container } = renderWithTheme(<NavigationHeader seemless />);
    // Should not render TiltCard (which adds mb-4 class)
    expect(container.querySelector('.mb-4')).not.toBeInTheDocument();
    // Should render a div with padding classes
    expect(
      container.querySelector('div.px-3.py-4.bg-page-1')
    ).toBeInTheDocument();
  });
});
