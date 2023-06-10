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
  const [userTheme, setUserTheme] = useState<Theme | null>(null);
  const [browserTheme, setBrowserTheme] = useState<Theme>('light');
  const [domTheme, setDomTheme] = useState<Theme | null>(null);

  const [inferredTheme, setInferredTheme] = useState<Theme>('light');

  // Listen to the browser theme change, can also be directly used on the queryList
  const mediaChangeListener = useCallback(
    (e: MediaQueryListEvent | MediaQueryList) => {
      setDomTheme(null); // that hack again
      setBrowserTheme(e.matches ? 'dark' : 'light');
    },
    []
  );

  /** Listen to browser theme changes */
  useEffect(() => {
    const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');

    // Initial value
    mediaChangeListener(mediaQueryList);

    // future changes
    mediaQueryList.addEventListener('change', mediaChangeListener);
    return () => {
      mediaQueryList.removeEventListener('change', mediaChangeListener);
    };
  }, [mediaChangeListener]);

  /** Set the user theme from local storage if present */
  useEffect(() => {
    setUserTheme(getThemeFromLS());
  }, []);

  /** Infer the final theme on the basis of user and browser theme */
  useEffect(() => {
    setInferredTheme(domTheme ?? userTheme ?? browserTheme);
  }, [userTheme, browserTheme, domTheme]);

  /** User action to set the next theme, saves to local storage */
  const manuallySetTheme = useCallback<ThemeContext['setTheme']>((newTheme) => {
    setDomTheme(null); // kind of a hack. We want to ignore the existing dom theme for inferrence
    setUserTheme(newTheme);
    setThemeInLS(newTheme);
  }, []);

  // The mutation callback to be attached to the <html> element
  // This is for the extremely unlikely scenario where an external script / or user manually
  // changes the class on the <html> element
  const onMutation = useCallback<MutationCallback>((mutations) => {
    mutations.forEach((mutation) => {
      switch (mutation.type) {
        case 'attributes': {
          if (mutation.attributeName !== 'class') {
            return;
          }

          const nextTheme = getThemeFromClassString(
            (mutation.target as HTMLHtmlElement).getAttribute(
              mutation.attributeName
            ) ?? ''
          );

          setDomTheme(nextTheme);

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

    switch (inferredTheme) {
      case 'light':
        safeRemoveClass(classList, 'dark');
        safeAddClass(classList, 'light');
        break;
      case 'dark':
        safeRemoveClass(classList, 'light');
        safeAddClass(classList, 'dark');
        break;
    }
  }, [inferredTheme]);

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

function getThemeFromClassString(classString: string): Theme | null {
  const classes = classString.split(' ');
  return classes.includes('dark')
    ? 'dark'
    : classes.includes('light')
    ? 'light'
    : null;
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
