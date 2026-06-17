import {
  type PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react';
import type { Theme } from './models';
import { ThemeContext } from './ThemeContext';

/** TODO:
 * 1. Make the switcher button do auto as well
 * 2. Improve the logic */
export function ThemeProvider({ children }: PropsWithChildren) {
  const [mode, setMode] = useState<ThemeMode>('auto');
  const [resolvedTheme, setResolvedTheme] = useState<Theme>('dark');

  useEffect(() => {
    const initialMode = getInitialMode();
    setMode(initialMode);
    setResolvedTheme(applyThemeMode(initialMode));
  }, []);

  /** Sync auto mode */
  useEffect(() => {
    if (mode !== 'auto') {
      return;
    }
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      setResolvedTheme(applyThemeMode('auto'));
    };

    media.addEventListener('change', onChange);
    return () => {
      media.removeEventListener('change', onChange);
    };
  }, [mode]);

  const manuallySetTheme = useCallback<ThemeContext['setTheme']>((newTheme) => {
    setMode(newTheme);
    setResolvedTheme(applyThemeMode(newTheme));
    window.localStorage.setItem(STORAGE_THEME_KEY, newTheme);
  }, []);

  return (
    <ThemeContext.Provider
      value={{ theme: resolvedTheme, setTheme: manuallySetTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

type ThemeMode = Theme | 'auto';
const STORAGE_THEME_KEY = 'theme';

function getInitialMode(): ThemeMode {
  if (typeof window === 'undefined') {
    return 'auto';
  }

  const stored = window.localStorage.getItem(STORAGE_THEME_KEY);
  if (stored === 'light' || stored === 'dark' || stored === 'auto') {
    return stored;
  }

  return 'auto';
}

function applyThemeMode(mode: ThemeMode): Theme {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const resolved = mode === 'auto' ? (prefersDark ? 'dark' : 'light') : mode;

  document.documentElement.classList.remove('light', 'dark');
  document.documentElement.classList.add(resolved);

  if (mode === 'auto') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', mode);
  }

  document.documentElement.style.colorScheme = resolved;
  return resolved;
}
