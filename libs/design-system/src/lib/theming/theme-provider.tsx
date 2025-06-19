'use client';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { initialThemeState, themeReducer, Theme } from './theme-state';

type ThemeContext = {
  theme: Theme;
  setTheme(newTheme: Theme): void;
};

const defaultValue: ThemeContext = {
  theme: 'light',
  setTheme: () => {},
};

const themeContext = createContext<ThemeContext>(defaultValue);

/** Hooks */
export function useTheme() {
  return useContext(themeContext);
}

/** Provider */
export function ThemeProvider({ children }: React.PropsWithChildren) {
  const [{ theme }, dispatch] = useReducer(themeReducer, initialThemeState);

  // Listen to the browser theme change, can also be directly used on the queryList
  const mediaChangeListener = useCallback(
    (e: MediaQueryListEvent | MediaQueryList) => {
      dispatch({
        type: 'setBySystem',
        theme: e.matches ? 'dark' : 'light',
      });
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
    const existingTheme = getThemeFromLS();
    if (existingTheme) {
      dispatch({
        type: 'setByUser',
        theme: existingTheme,
      });
    }
  }, []);

  /** User action to set the next theme, saves to local storage */
  const manuallySetTheme = useCallback<ThemeContext['setTheme']>((newTheme) => {
    dispatch({
      type: 'setByUser',
      theme: newTheme,
    });
    setThemeInLS(newTheme);
  }, []);

  // The mutation callback to be attached to the <html> element
  // This is for the extremely unlikely scenario where an external script / or user manually
  // changes the class on the <html> element
  // const onMutation = useCallback<MutationCallback>((mutations) => {
  //   mutations.forEach((mutation) => {
  //     switch (mutation.type) {
  //       case 'attributes': {
  //         if (mutation.attributeName !== 'class') {
  //           return;
  //         }

  //         const nextTheme = getThemeFromClassString(
  //           (mutation.target as HTMLHtmlElement).getAttribute(
  //             mutation.attributeName
  //           ) ?? ''
  //         );

  //         // Note: This will trigger a re-render, but that is fine, covers the edge case of external scripts
  //         // Adding a theme check here is fine, but then the callback changes and we are re-mounting the observer
  //         // on every theme change. This is the better tradeoff
  //         dispatch({
  //           type: 'setByDom',
  //           theme: nextTheme,
  //         });

  //         break;
  //       }
  //       default:
  //         return;
  //     }
  //   });
  // }, []);

  /** NOTE: some weird race condition is happening, so disabling the dom check for mutation */
  // Attaching the mutation callback, this is typically a one time operation
  // useEffect(() => {
  //   const obs = new MutationObserver(onMutation);
  //   obs.observe(document.documentElement, {
  //     attributes: true,
  //     attributeFilter: ['class'],
  //     childList: false,
  //     characterData: false,
  //   });
  //   return () => {
  //     obs.disconnect();
  //   };
  // }, [onMutation]);

  // Synchronises the theme state with the classlist of the <html> element
  useEffect(() => {
    const classList = document.documentElement.classList;

    switch (theme) {
      case 'light':
        safeRemoveClass(classList, 'dark');
        safeAddClass(classList, 'light');
        break;
      case 'dark':
        safeRemoveClass(classList, 'light');
        safeAddClass(classList, 'dark');
        break;
    }
  }, [theme]);

  return (
    <themeContext.Provider value={{ theme, setTheme: manuallySetTheme }}>
      {children}
    </themeContext.Provider>
  );
}

/** Some helper functions */
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

// function getThemeFromClassString(classString: string): Theme | null {
//   const classes = classString.split(' ');
//   return classes.includes('dark')
//     ? 'dark'
//     : classes.includes('light')
//     ? 'light'
//     : null;
// }

/** LocalStorage stuff */
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
