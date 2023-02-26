import { themeSwitcher } from './ThemeSwitcher.css';
import { useCallback, useMemo } from 'react';

export function ThemeSwitcher() {
  const switchTheme = useCallback(() => {
    document.documentElement.classList.toggle('dark');
  }, []);

  return (
    <button className={`${themeSwitcher} p-3`} onClick={switchTheme}>
      Switch Theme
    </button>
  );
}
