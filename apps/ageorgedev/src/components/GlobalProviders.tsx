import { ThemeProvider } from '@ageorgedev/design-system/theming/ThemeProvider';

export function GlobalProviders({ children }: React.PropsWithChildren) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
