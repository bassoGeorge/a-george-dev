import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

type Theme = 'light' | 'dark';
type ActualTheme = Theme | 'auto'; // auto basically means that we are picking up from system preference

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
  const [actualTheme, setActualTheme] = useState<ActualTheme>('auto');
  const [inferredTheme, setInferredTheme] = useState<Theme>('light');

  useEffect(() => {
    setActualTheme(getInitialThemeFromUserPrefOrAuto());
  }, []);

  useEffect(() => {
    setInferredTheme(actualTheme === 'auto' ? inferAutoTheme() : actualTheme);
  }, [actualTheme]);

  const manuallySetTheme = useCallback<ThemeContext['setTheme']>((newTheme) => {
    setActualTheme(newTheme);
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

          const nextTheme: ActualTheme = getThemeFromClassString(
            (mutation.target as HTMLHtmlElement).getAttribute(
              mutation.attributeName
            ) ?? ''
          );

          setActualTheme(nextTheme);
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
    const classList = document.documentElement.classList;

    switch (actualTheme) {
      case 'light':
        safeRemoveClass(classList, 'dark');
        safeAddClass(classList, 'light');
        break;
      case 'dark':
        safeRemoveClass(classList, 'light');
        safeAddClass(classList, 'dark');
        break;
      case 'auto':
        safeRemoveClass(classList, 'light');
        safeRemoveClass(classList, 'dark');
        break;
    }
  }, [actualTheme]);

  return (
    <themeContext.Provider
      value={{ theme: inferredTheme, setTheme: manuallySetTheme }}
    >
      {children}
    </themeContext.Provider>
  );
}

function safeRemoveClass(classList: DOMTokenList, className: string) {
  if (classList.contains(className)) {
    classList.remove(className);
  }
}

function safeAddClass(classList: DOMTokenList, className: string) {
  if (!classList.contains(className)) {
    classList.add(className);
  }
}

function getThemeFromClassString(classString: string): ActualTheme {
  const classes = classString.split(' ');
  return classes.includes('dark')
    ? 'dark'
    : classes.includes('light')
    ? 'light'
    : 'auto';
}

function inferAutoTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

/** LocalStorage stuff */
function getInitialThemeFromUserPrefOrAuto(): ActualTheme {
  return getThemeFromLS() ?? 'auto';
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
