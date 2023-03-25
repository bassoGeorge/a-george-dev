import { useCallback } from 'react';
import { Moon, Sun } from '@phosphor-icons/react';
import { useTheme } from './Theme';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const nextTheme = theme === 'dark' ? 'light' : 'dark';

  const switchTheme = useCallback(() => {
    setTheme(nextTheme);
  }, [nextTheme, setTheme]);

  return (
    <button
      className={`leading-none text-2xl text-cc-neutral-300 hover:text-rc-s-accent-400 p-3 transition-colors`}
      title={`Switch to ${nextTheme} theme`}
      onClick={switchTheme}
    >
      {theme === 'dark' ? <Sun weight="duotone" /> : <Moon weight="duotone" />}
    </button>
  );
}
