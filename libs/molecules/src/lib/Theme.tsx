import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

type Theme = 'light' | 'dark';
export type ThemeContext = {
  theme: Theme;
  setTheme(newTheme: Theme): void;
};

const defaultValue: ThemeContext = {
  theme: 'light',
  setTheme: () => {},
};

const themeContext = createContext<ThemeContext>(defaultValue);

export function useTheme() {
  return useContext(themeContext);
}

export function ThemeProvider({ children }: React.PropsWithChildren) {
  const [theme, setThemeValue] = useState<Theme>('light');

  useEffect(() => {
    setThemeValue(getThemeFromUserPreference());
  }, []);

  const setTheme = useCallback<ThemeContext['setTheme']>((newTheme) => {
    setThemeValue(newTheme);
    setThemeInLS(newTheme);
  }, []);

  // The mutation callback to be attached to the <html> element
  const onMutation = useCallback<MutationCallback>((mutations) => {
    mutations.forEach((mutation) => {
      switch (mutation.type) {
        case 'attributes': {
          if (mutation.attributeName !== 'class') {
            return;
          }

          const nextTheme: Theme = (mutation.target as HTMLHtmlElement)
            .getAttribute(mutation.attributeName)
            ?.split(' ')
            ?.includes('dark')
            ? 'dark'
            : 'light';

          setTheme(nextTheme);
          break;
        }
        default:
          return;
      }
    });
  }, []);

  // Attaching the mutation callback, this is typically a one time operation
  useEffect(() => {
    const obs = new MutationObserver(onMutation);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
      childList: false,
      characterData: false,
    });
    return () => {
      obs.disconnect();
    };
  }, [onMutation]);

  // Synchronises the theme state with the classlist of the <html> element
  useEffect(() => {
    if (
      theme === 'light' &&
      document.documentElement.classList.contains('dark')
    ) {
      document.documentElement.classList.remove('dark');
    } else if (
      theme === 'dark' &&
      !document.documentElement.classList.contains('dark')
    ) {
      document.documentElement.classList.add('dark');
    }
  }, [theme]);

  return (
    <themeContext.Provider value={{ theme, setTheme }}>
      {children}
    </themeContext.Provider>
  );
}

function getThemeFromUserPreference(): Theme {
  return (
    getThemeFromLS() ??
    (window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light')
  );
}

const LS_THEME_KEY = 'theme';

function getThemeFromLS(): Theme | null {
  const userPreference = localStorage.getItem(LS_THEME_KEY);
  if (userPreference) {
    return userPreference === 'dark' ? 'dark' : 'light';
  } else {
    return null;
  }
}

function setThemeInLS(theme: Theme) {
  localStorage.setItem(LS_THEME_KEY, theme);
}
