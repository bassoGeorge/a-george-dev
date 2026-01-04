import { ThemeProvider } from '@ageorgedev/design-system';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import NavigationHeader from './NavigationHeader';

// TODO: don't like the whole mock intention, needs a bit more granularity
jest.mock('@ageorgedev/design-system');

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('NavigationHeader', () => {
  it('renders correctly', () => {
    renderWithTheme(<NavigationHeader />);
    // Logo should be a link
    const logoLink = screen.getAllByRole('link', { name: /a/i })[0];
    expect(logoLink).toHaveAttribute('href', '/');
    // ThemeSwitcher button should be present
    expect(
      screen.getByRole('button', { name: /switch to/i })
    ).toBeInTheDocument();
  });
});
