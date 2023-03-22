import { useCallback } from 'react';

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
    </button>
  );
}
