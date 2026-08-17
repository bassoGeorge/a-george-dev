import { ThemeProvider } from '@ageorgedev/design-system/theming/ThemeProvider';
import { UserPrefsProvider } from '../context/UserPrefsContext';

export function GlobalProviders({ children }: React.PropsWithChildren) {
  return (
    <ThemeProvider>
      <UserPrefsProvider>{children}</UserPrefsProvider>
    </ThemeProvider>
  );
}
