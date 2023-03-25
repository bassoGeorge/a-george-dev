import { useCallback } from 'react';
import { Moon, Sun } from '@phosphor-icons/react';
import { useTheme } from '@ageorgedev/molecules';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const switchTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  return (
    <button
      className={`font-interface text-cc-neutral-300 p-3 leading-none`}
      onClick={switchTheme}
    >
      {theme === 'dark' ? <Sun weight="duotone" /> : <Moon weight="duotone" />}
    </button>
  );
}
