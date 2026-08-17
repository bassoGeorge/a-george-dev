import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
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
});
