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
  const [theme, setTheme] = useState<Theme>('light');

  const onMutation = useCallback<MutationCallback>(
    (mutations) => {
      mutations.forEach((mutation) => {
        switch (mutation.type) {
          case 'attributes': {
            if (mutation.attributeName !== 'class') {
              return;
            }
            const isGoingToBeDark =
              (mutation.target as HTMLHtmlElement)
                .getAttribute(mutation.attributeName)
                ?.split(' ')
                ?.includes('dark') ?? false;

            if (isGoingToBeDark && theme !== 'dark') {
              setTheme('dark');
            } else if (!isGoingToBeDark && theme !== 'light') {
              setTheme('light');
            }
            break;
          }
          default:
            return;
        }
      });
    },
    [theme, setTheme]
  );

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
