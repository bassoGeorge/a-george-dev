'use client';
import { useEffect, useState } from 'react';
import type { Theme } from '../models';
import { ThemeContext } from '../ThemeContext';

export function ThemeProvider({
  children,
  startingTheme = 'dark',
}: React.PropsWithChildren<{ startingTheme?: Theme }>) {
  const [theme, setThemeState] = useState<Theme>(startingTheme);

  // Attach theme to <html> class
  useEffect(() => {
    const classList = document.documentElement.classList;
    classList.remove('light', 'dark');
    if (theme === 'dark') {
      classList.add(theme);
    }
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
