import { useCallback } from 'react';
import { Moon, Sun } from '@phosphor-icons/react';
import { useTheme } from '@ageorgedev/molecules';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const nextTheme = theme === 'dark' ? 'light' : 'dark';

  const switchTheme = useCallback(() => {
    setTheme(nextTheme);
  }, [nextTheme, setTheme]);

  return (
    <button
      className={`font-interface text-2xl text-cc-neutral-300 hover:text-rc-s-accent-400 p-3 leading-none transition-colors`}
      title={`Switch to ${nextTheme} theme`}
      onClick={switchTheme}
    >
      {theme === 'dark' ? <Sun weight="duotone" /> : <Moon weight="duotone" />}
    </button>
  );
}
