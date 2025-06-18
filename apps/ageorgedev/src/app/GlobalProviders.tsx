'use client';
/**
 * Need to wrap our own client component for some reason I don't fully understand
 */
import { ThemeProvider } from '@ageorgedev/design-system';

export function GlobalProviders({ children }: React.PropsWithChildren) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
