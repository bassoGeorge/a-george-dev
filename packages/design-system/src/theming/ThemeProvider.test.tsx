import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useTheme } from './ThemeContext';
import { ThemeProvider } from './ThemeProvider';

/** In-memory localStorage. jsdom 29 under Node 24 leaves `window.localStorage`
 * undefined (it defers to Node's built-in, which needs --localstorage-file), so
 * the provider's read/write of the stored preference has nothing to talk to. */
function stubLocalStorage() {
  const store = new Map<string, string>();
  vi.stubGlobal('localStorage', {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => {
      store.set(key, String(value));
    },
    removeItem: (key: string) => {
      store.delete(key);
    },
    clear: () => {
      store.clear();
    },
  });
  return store;
}

/** Minimal matchMedia stand-in — jsdom does not implement it, and the provider
 * both reads `.matches` and subscribes to `change` to follow the OS in auto mode. */
function stubMatchMedia(prefersDark: boolean) {
  const listeners = new Set<() => void>();
  const mql = {
    matches: prefersDark,
    addEventListener: (_: string, cb: () => void) => {
      listeners.add(cb);
    },
    removeEventListener: (_: string, cb: () => void) => {
      listeners.delete(cb);
    },
  };

  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => mql)
  );

  return {
    /** Flip the OS preference and notify subscribers, as a real MediaQueryList would. */
    emitChange(nowPrefersDark: boolean) {
      mql.matches = nowPrefersDark;
      act(() => {
        for (const cb of listeners) {
          cb();
        }
      });
    },
    get listenerCount() {
      return listeners.size;
    },
  };
}

function ThemeProbe() {
  const { theme, setTheme } = useTheme();
  return (
    <>
      <span data-testid="theme">{theme}</span>
      <button type="button" onClick={() => setTheme('light')}>
        light
      </button>
      <button type="button" onClick={() => setTheme('dark')}>
        dark
      </button>
    </>
  );
}

function renderProvider() {
  return render(
    <ThemeProvider>
      <ThemeProbe />
    </ThemeProvider>
  );
}

const html = () => document.documentElement;
const currentTheme = () => screen.getByTestId('theme').textContent;

let storage: Map<string, string>;

beforeEach(() => {
  storage = stubLocalStorage();
  html().classList.remove('light', 'dark');
  html().removeAttribute('data-theme');
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('ThemeProvider', () => {
  describe('auto mode (nothing stored)', () => {
    it('resolves to dark when the OS prefers dark', () => {
      stubMatchMedia(true);
      renderProvider();

      expect(currentTheme()).toBe('dark');
      expect(html()).toHaveClass('dark');
      expect(html()).not.toHaveClass('light');
    });

    it('resolves to light when the OS prefers light', () => {
      stubMatchMedia(false);
      renderProvider();

      expect(currentTheme()).toBe('light');
      expect(html()).toHaveClass('light');
      expect(html()).not.toHaveClass('dark');
    });

    it('leaves data-theme unset, so nothing looks user-pinned', () => {
      stubMatchMedia(true);
      renderProvider();

      expect(html()).not.toHaveAttribute('data-theme');
    });

    it('follows the OS when the preference changes', () => {
      const media = stubMatchMedia(true);
      renderProvider();
      expect(currentTheme()).toBe('dark');

      media.emitChange(false);

      expect(currentTheme()).toBe('light');
      expect(html()).toHaveClass('light');
    });

    it('unsubscribes from the media query on unmount', () => {
      const media = stubMatchMedia(true);
      const { unmount } = renderProvider();
      expect(media.listenerCount).toBe(1);

      unmount();

      expect(media.listenerCount).toBe(0);
    });
  });

  describe('restoring a stored preference', () => {
    it.each([
      'light',
      'dark',
    ] as const)('restores %s from localStorage over the OS preference', (stored) => {
      storage.set('theme', stored);
      // OS says the opposite, so a pass-through would resolve the other way
      stubMatchMedia(stored === 'light');
      renderProvider();

      expect(currentTheme()).toBe(stored);
      expect(html()).toHaveClass(stored);
      expect(html()).toHaveAttribute('data-theme', stored);
    });

    it('treats a stored "auto" as auto rather than a pinned theme', () => {
      storage.set('theme', 'auto');
      stubMatchMedia(false);
      renderProvider();

      expect(currentTheme()).toBe('light');
      expect(html()).not.toHaveAttribute('data-theme');
    });

    it('falls back to auto when the stored value is not a known mode', () => {
      storage.set('theme', 'chartreuse');
      stubMatchMedia(true);
      renderProvider();

      expect(currentTheme()).toBe('dark');
      expect(html()).not.toHaveAttribute('data-theme');
    });
  });

  describe('setTheme', () => {
    it('pins the theme, overriding the OS preference', async () => {
      stubMatchMedia(true);
      renderProvider();
      expect(currentTheme()).toBe('dark');

      await userEvent.click(screen.getByRole('button', { name: 'light' }));

      expect(currentTheme()).toBe('light');
      expect(html()).toHaveClass('light');
      expect(html()).not.toHaveClass('dark');
      expect(html()).toHaveAttribute('data-theme', 'light');
    });

    it('persists the choice so the next load restores it', async () => {
      stubMatchMedia(true);
      renderProvider();

      await userEvent.click(screen.getByRole('button', { name: 'light' }));

      expect(storage.get('theme')).toBe('light');
    });

    it('stops following the OS once a theme is pinned', async () => {
      const media = stubMatchMedia(true);
      renderProvider();

      await userEvent.click(screen.getByRole('button', { name: 'dark' }));
      expect(media.listenerCount).toBe(0);

      media.emitChange(false);

      expect(currentTheme()).toBe('dark');
    });
  });
});
