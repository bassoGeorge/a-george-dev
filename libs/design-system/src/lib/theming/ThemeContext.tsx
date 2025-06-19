'use client';
import { createContext, useContext } from 'react';
import { Theme } from './models';

export type ThemeContext = {
  theme: Theme;
  setTheme(newTheme: Theme): void;
};

export const ThemeContext = createContext<ThemeContext>({
  theme: 'dark',
  setTheme: () => {},
});

/** Hooks */
export function useTheme() {
  return useContext(ThemeContext);
}
