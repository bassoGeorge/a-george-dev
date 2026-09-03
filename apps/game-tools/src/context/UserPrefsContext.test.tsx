import { StandardCharacterSheet } from '@ageorgedev/dnd-character-sheet';
import { act, render, renderHook, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getCharacterBySlugAndLevel } from '../data/dnd-characters';
import { UserPrefsProvider, useUserPrefs } from './UserPrefsContext';

const STORAGE_KEY = 'game-tools:userPrefs';

// Node.js 26+ defines localStorage as a native global that returns undefined
// without --localstorage-file, overriding jsdom. Stub it explicitly.
let store: Record<string, string> = {};
const localStorageMock = {
  getItem: (key: string) => store[key] ?? null,
  setItem: (key: string, value: string) => {
    store[key] = value;
  },
  clear: () => {
    store = {};
  },
  removeItem: (key: string) => {
    delete store[key];
  },
};
vi.stubGlobal('localStorage', localStorageMock);

function wrapper({ children }: React.PropsWithChildren) {
  return <UserPrefsProvider>{children}</UserPrefsProvider>;
}

describe('UserPrefsContext', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  describe('initial state', () => {
    it('returns defaults when localStorage is empty', () => {
      const { result } = renderHook(() => useUserPrefs(), { wrapper });
      expect(result.current.prefs).toEqual({
        showActionsInCombat: false,
        showWeaponMasteries: false,
        showNotes: true,
      });
    });

    it('reads prefs from localStorage on init, merging with defaults', () => {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ showActionsInCombat: true, showNotes: false })
      );
      const { result } = renderHook(() => useUserPrefs(), { wrapper });
      expect(result.current.prefs).toEqual({
        showActionsInCombat: true,
        showWeaponMasteries: false,
        showNotes: false,
      });
    });

    it('falls back to defaults when localStorage contains invalid JSON', () => {
      localStorage.setItem(STORAGE_KEY, 'not-valid-json{{{');
      const { result } = renderHook(() => useUserPrefs(), { wrapper });
      expect(result.current.prefs).toEqual({
        showActionsInCombat: false,
        showWeaponMasteries: false,
        showNotes: true,
      });
    });
  });

  describe('setPrefs', () => {
    it('updates one pref without affecting others', () => {
      const { result } = renderHook(() => useUserPrefs(), { wrapper });

      act(() => {
        result.current.setPrefs({ showActionsInCombat: true });
      });

      expect(result.current.prefs.showActionsInCombat).toBe(true);
      expect(result.current.prefs.showWeaponMasteries).toBe(false);
      expect(result.current.prefs.showNotes).toBe(true);
    });

    it('persists updated prefs to localStorage', () => {
      const { result } = renderHook(() => useUserPrefs(), { wrapper });

      act(() => {
        result.current.setPrefs({ showWeaponMasteries: true });
      });

      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}');
      expect(stored.showWeaponMasteries).toBe(true);
    });

    it('can update multiple prefs in successive calls', () => {
      const { result } = renderHook(() => useUserPrefs(), { wrapper });

      act(() => {
        result.current.setPrefs({ showActionsInCombat: true });
      });
      act(() => {
        result.current.setPrefs({ showNotes: false });
      });

      expect(result.current.prefs).toEqual({
        showActionsInCombat: true,
        showWeaponMasteries: false,
        showNotes: false,
      });
    });
  });

  // Eligibility is a render-time gate only (see the user-prefs spec:
  // "Weapon mastery eligibility never mutates stored preferences"). Viewing an
  // ineligible character must not write showWeaponMasteries back to storage,
  // since the pref is global across every character.
  describe('weapon mastery eligibility', () => {
    const ELIGIBLE = 'gonvar-feathertide'; // Fighter
    const INELIGIBLE = 'elnorin-lunarrest'; // Sorcerer

    function Sheet({ slug }: { slug: string }) {
      const { prefs } = useUserPrefs();
      const { data } = getCharacterBySlugAndLevel(slug);
      return <StandardCharacterSheet data={data} userPreferences={prefs} />;
    }

    function storedPrefs() {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}');
    }

    beforeEach(() => {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ showWeaponMasteries: true })
      );
    });

    it('leaves the stored preference intact while an ineligible character is displayed', () => {
      render(
        <UserPrefsProvider>
          <Sheet slug={INELIGIBLE} />
        </UserPrefsProvider>
      );

      expect(
        screen.queryByText('Weapon Mastery Properties')
      ).not.toBeInTheDocument();
      expect(storedPrefs().showWeaponMasteries).toBe(true);
    });

    it('restores the panel after navigating to an ineligible character and back', () => {
      const { rerender } = render(
        <UserPrefsProvider>
          <Sheet slug={ELIGIBLE} />
        </UserPrefsProvider>
      );
      expect(screen.getByText('Weapon Mastery Properties')).toBeInTheDocument();

      rerender(
        <UserPrefsProvider>
          <Sheet slug={INELIGIBLE} />
        </UserPrefsProvider>
      );
      expect(
        screen.queryByText('Weapon Mastery Properties')
      ).not.toBeInTheDocument();

      rerender(
        <UserPrefsProvider>
          <Sheet slug={ELIGIBLE} />
        </UserPrefsProvider>
      );
      expect(screen.getByText('Weapon Mastery Properties')).toBeInTheDocument();
      expect(storedPrefs().showWeaponMasteries).toBe(true);
    });
  });
});
