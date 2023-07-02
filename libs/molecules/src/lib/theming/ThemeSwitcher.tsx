import { useCallback } from 'react';
import { Moon, Sun } from '@phosphor-icons/react';
import { useTheme } from './theme-provider';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const nextTheme = theme === 'dark' ? 'light' : 'dark';

  const switchTheme = useCallback(() => {
    setTheme(nextTheme);
  }, [nextTheme, setTheme]);

  return (
    <button
      className={`leading-none text-2xl text-cc-neutral-subtlest hover:text-cc-alt-accent p-3 transition-colors`}
      title={`Switch to ${nextTheme} theme`}
      onClick={switchTheme}
    >
      {theme === 'dark' ? <Sun weight="duotone" /> : <Moon weight="duotone" />}
    </button>
  );
}
