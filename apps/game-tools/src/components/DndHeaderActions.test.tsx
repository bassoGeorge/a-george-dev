import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@tanstack/react-router', () => ({
  useMatch: vi.fn(),
}));

vi.mock('@ageorgedev/design-system/ui/dropdown-menu', () => ({
  DropdownMenu: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  DropdownMenuTrigger: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  DropdownMenuContent: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  DropdownMenuLabel: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  DropdownMenuSeparator: () => <hr />,
  DropdownMenuCheckboxItem: ({
    children,
    checked,
    onCheckedChange,
  }: {
    children: React.ReactNode;
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    onSelect?: (e: Event) => void;
  }) => (
    <label>
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onCheckedChange(!checked)}
        readOnly={false}
      />
      {children}
    </label>
  ),
}));

vi.mock('../context/UserPrefsContext', () => ({
  useUserPrefs: vi.fn(),
}));

import { useMatch } from '@tanstack/react-router';
import { useUserPrefs } from '../context/UserPrefsContext';
import { DndHeaderActions } from './DndHeaderActions';

const mockUseMatch = vi.mocked(useMatch);
const mockUseUserPrefs = vi.mocked(useUserPrefs);

const DEFAULT_PREFS = {
  showActionsInCombat: false,
  showWeaponMasteries: false,
  showNotes: true,
};

function setupOnRoute(
  overrides: {
    prefs?: Partial<typeof DEFAULT_PREFS>;
    assets?: { id: string; url: string; label?: string }[];
  } = {}
) {
  const setPrefs = vi.fn();
  mockUseUserPrefs.mockReturnValue({
    prefs: { ...DEFAULT_PREFS, ...overrides.prefs },
    setPrefs,
  });
  mockUseMatch.mockReturnValue({
    context: { assets: overrides.assets ?? [] },
  } as ReturnType<typeof useMatch>);
  return { setPrefs };
}

describe('DndHeaderActions', () => {
  beforeEach(() => {
    mockUseMatch.mockReturnValue(undefined as ReturnType<typeof useMatch>);
    mockUseUserPrefs.mockReturnValue({
      prefs: DEFAULT_PREFS,
      setPrefs: vi.fn(),
    });
  });

  it('renders nothing when not on the character sheet route', () => {
    const { container } = render(<DndHeaderActions />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders the Customise dropdown and Print button on the character sheet route', () => {
    setupOnRoute();
    render(<DndHeaderActions />);
    expect(screen.getByText('Customise')).toBeInTheDocument();
    expect(screen.getByText('Print Character Sheet')).toBeInTheDocument();
  });

  it('renders checkbox items reflecting current prefs', () => {
    setupOnRoute({
      prefs: {
        showActionsInCombat: true,
        showWeaponMasteries: false,
        showNotes: false,
      },
    });
    render(<DndHeaderActions />);

    const checkboxes = screen.getAllByRole('checkbox');
    // order: Actions in Combat, Weapon Masteries, Notes
    expect(checkboxes[0]).toBeChecked();
    expect(checkboxes[1]).not.toBeChecked();
    expect(checkboxes[2]).not.toBeChecked();
  });

  it('calls setPrefs with showActionsInCombat when that checkbox is toggled', () => {
    const { setPrefs } = setupOnRoute({
      prefs: { showActionsInCombat: false },
    });
    render(<DndHeaderActions />);

    const checkbox = screen.getByLabelText('Actions in Combat');
    fireEvent.click(checkbox);

    expect(setPrefs).toHaveBeenCalledWith({ showActionsInCombat: true });
  });

  it('calls setPrefs with showWeaponMasteries when that checkbox is toggled', () => {
    const { setPrefs } = setupOnRoute({
      prefs: { showWeaponMasteries: false },
    });
    render(<DndHeaderActions />);

    const checkbox = screen.getByLabelText('Weapon Masteries');
    fireEvent.click(checkbox);

    expect(setPrefs).toHaveBeenCalledWith({ showWeaponMasteries: true });
  });

  it('calls setPrefs with showNotes when the Notes checkbox is toggled', () => {
    const { setPrefs } = setupOnRoute({ prefs: { showNotes: true } });
    render(<DndHeaderActions />);

    const checkbox = screen.getByLabelText('Notes');
    fireEvent.click(checkbox);

    expect(setPrefs).toHaveBeenCalledWith({ showNotes: false });
  });

  it('renders a download link for each asset', () => {
    setupOnRoute({
      assets: [
        { id: 'spellbook', url: '/spellbook.pdf' },
        { id: 'magicItems', url: '/magic-items.pdf' },
      ],
    });
    render(<DndHeaderActions />);

    const spellbookLink = screen.getByRole('link', {
      name: /Download Spellbook/i,
    });
    expect(spellbookLink).toHaveAttribute('href', '/spellbook.pdf');

    const magicLink = screen.getByRole('link', {
      name: /Download Magic Items/i,
    });
    expect(magicLink).toHaveAttribute('href', '/magic-items.pdf');
  });

  it('uses asset label over the default when provided', () => {
    setupOnRoute({
      assets: [
        { id: 'spellbook', url: '/custom.pdf', label: 'Custom Grimoire' },
      ],
    });
    render(<DndHeaderActions />);

    expect(
      screen.getByRole('link', { name: /Download Custom Grimoire/i })
    ).toBeInTheDocument();
  });

  it('renders no asset links when assets array is empty', () => {
    setupOnRoute({ assets: [] });
    render(<DndHeaderActions />);

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});
