import { useCallback } from 'react';
import { Sun } from '@phosphor-icons/react';

export function ThemeSwitcher() {
  const switchTheme = useCallback(() => {
    document.documentElement.classList.toggle('dark');
  }, []);

  return (
    <button
      className={`font-interface text-cc-neutral-300 p-3 leading-none`}
      onClick={switchTheme}
    >
      Switch Theme
      <Sun weight="duotone" />
    </button>
  );
}
