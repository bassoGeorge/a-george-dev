import { ThemeProvider } from '@ageorgedev/design-system';

export function GlobalProviders({ children }: React.PropsWithChildren) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
