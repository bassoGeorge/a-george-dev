'use client';

import { useCallback, useEffect, useReducer } from 'react';
import { Theme } from './models';
import { initialThemeState, themeReducer } from './theme-state';
import { ThemeContext } from './ThemeContext';

export type ThemeProviderProps = React.PropsWithChildren<{
  startingTheme?: Theme;
}>;

/** Provider */
export function ThemeProvider({
  children,
  startingTheme = 'dark',
}: ThemeProviderProps) {
  const [{ theme }, dispatch] = useReducer(themeReducer, {
    ...initialThemeState,
    theme: startingTheme,
  });

  // Listen to the browser theme change, can also be directly used on the queryList
  const mediaChangeListener = useCallback(
    (e: MediaQueryListEvent | MediaQueryList) => {
      dispatch({
        type: 'setBySystem',
        theme: e.matches ? 'dark' : 'light',
      });
    },
    []
  );

  /** Listen to browser theme changes */
  useEffect(() => {
    const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');

    // Initial value
    mediaChangeListener(mediaQueryList);

    // future changes
    mediaQueryList.addEventListener('change', mediaChangeListener);
    return () => {
      mediaQueryList.removeEventListener('change', mediaChangeListener);
    };
  }, [mediaChangeListener]);

  /** Set the user theme from local storage if present */
  useEffect(() => {
    const existingTheme = getThemeFromStorage();
    if (existingTheme) {
      dispatch({
        type: 'setByUser',
        theme: existingTheme,
      });
    }
  }, []);

  /** User action to set the next theme, saves to local storage */
  const manuallySetTheme = useCallback<ThemeContext['setTheme']>((newTheme) => {
    dispatch({
      type: 'setByUser',
      theme: newTheme,
    });
    setThemeInStorage(newTheme);
  }, []);

  // Synchronises the theme state with the classlist of the <html> element
  useEffect(() => {
    const classList = document.documentElement.classList;

    switch (theme) {
      case 'light':
        safeRemoveClass(classList, 'dark');
        safeAddClass(classList, 'light');
        break;
      case 'dark':
        safeRemoveClass(classList, 'light');
        safeAddClass(classList, 'dark');
        break;
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme: manuallySetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/** Some helper functions */
function safeRemoveClass(classList: DOMTokenList, className: string) {
  if (classList.contains(className)) {
    classList.remove(className);
  }
}

function safeAddClass(classList: DOMTokenList, className: string) {
  if (!classList.contains(className)) {
    classList.add(className);
  }
}

/** Storage stuff */
const STORAGE_THEME_KEY = 'theme';

function getThemeFromStorage(): Theme | null {
  const userPreference = sessionStorage.getItem(STORAGE_THEME_KEY);
  if (userPreference) {
    return userPreference === 'dark' ? 'dark' : 'light';
  } else {
    return null;
  }
}

function setThemeInStorage(theme: Theme) {
  sessionStorage.setItem(STORAGE_THEME_KEY, theme);
}
