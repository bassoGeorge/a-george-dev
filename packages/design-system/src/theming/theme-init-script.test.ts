import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { THEME_INIT_SCRIPT } from './theme-init-script';

/** This script is inlined into <head> to set the theme before hydration, so it
 * deliberately duplicates ThemeProvider's resolution logic. Running it for real
 * and asserting the resulting DOM is what stops the two drifting apart — see
 * ThemeProvider.test.tsx for the same expectations on the React side. */
function runInitScript() {
  new Function(THEME_INIT_SCRIPT)();
}

function stubEnvironment({
  stored,
  prefersDark,
}: {
  stored?: string;
  prefersDark: boolean;
}) {
  const store = new Map<string, string>();
  if (stored !== undefined) {
    store.set('theme', stored);
  }

  vi.stubGlobal('localStorage', {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => store.set(key, String(value)),
  });
  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => ({ matches: prefersDark }))
  );
}

const html = () => document.documentElement;

beforeEach(() => {
  html().classList.remove('light', 'dark');
  html().removeAttribute('data-theme');
  html().style.colorScheme = '';
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('THEME_INIT_SCRIPT', () => {
  it('is a self-invoking expression, safe to inline in a script tag', () => {
    expect(THEME_INIT_SCRIPT).toMatch(/^\(function\(\)\{/);
    expect(THEME_INIT_SCRIPT.trimEnd()).toMatch(/\}\)\(\);$/);
  });

  it('does not contain a closing script tag that would break the inline block', () => {
    expect(THEME_INIT_SCRIPT).not.toContain('</script');
  });

  describe('with no stored preference', () => {
    it('resolves to dark when the OS prefers dark', () => {
      stubEnvironment({ prefersDark: true });
      runInitScript();

      expect(html()).toHaveClass('dark');
      expect(html()).not.toHaveAttribute('data-theme');
      expect(html().style.colorScheme).toBe('dark');
    });

    it('resolves to light when the OS prefers light', () => {
      stubEnvironment({ prefersDark: false });
      runInitScript();

      expect(html()).toHaveClass('light');
      expect(html()).not.toHaveAttribute('data-theme');
      expect(html().style.colorScheme).toBe('light');
    });
  });

  describe('with a stored preference', () => {
    it.each([
      'light',
      'dark',
    ] as const)('pins %s regardless of the OS preference', (stored) => {
      stubEnvironment({ stored, prefersDark: stored === 'light' });
      runInitScript();

      expect(html()).toHaveClass(stored);
      expect(html()).toHaveAttribute('data-theme', stored);
      expect(html().style.colorScheme).toBe(stored);
    });

    it('treats stored "auto" as auto, not as a pinned theme', () => {
      stubEnvironment({ stored: 'auto', prefersDark: false });
      runInitScript();

      expect(html()).toHaveClass('light');
      expect(html()).not.toHaveAttribute('data-theme');
    });

    it('falls back to auto for an unrecognised stored value', () => {
      stubEnvironment({ stored: 'chartreuse', prefersDark: true });
      runInitScript();

      expect(html()).toHaveClass('dark');
      expect(html()).not.toHaveAttribute('data-theme');
    });
  });

  it('replaces a stale theme class rather than stacking both', () => {
    html().classList.add('light');
    stubEnvironment({ prefersDark: true });
    runInitScript();

    expect(html()).toHaveClass('dark');
    expect(html()).not.toHaveClass('light');
  });

  it('swallows errors so a storage failure cannot block hydration', () => {
    vi.stubGlobal('localStorage', {
      getItem: () => {
        throw new Error('SecurityError: storage is disabled');
      },
    });
    vi.stubGlobal(
      'matchMedia',
      vi.fn(() => ({ matches: true }))
    );

    expect(() => {
      runInitScript();
    }).not.toThrow();
  });
});
