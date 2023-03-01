import { useCallback } from 'react';

export function ThemeSwitcher() {
  const switchTheme = useCallback(() => {
    document.documentElement.classList.toggle('dark');
  }, []);

  return (
    <button className={`text-cc-neutral-300 p-3`} onClick={switchTheme}>
      Switch Theme
    </button>
  );
}
