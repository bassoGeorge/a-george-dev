import { Heading3 } from '@ageorgedev/atoms';
import { ThemeSwitcher } from '@ageorgedev/molecules';
import '@ageorgedev/reveal-framework/globals';
import { Outlet } from '@remix-run/react';
import { ClientOnly } from 'remix-utils';

/**
 * All my talks will use reveal.js. For this, we need to use a client-only section
 * because that library is riddled with side-effects
 */
export default function Talks() {
  return (
    <>
      <header className="flex justify-between">
        <Heading3>Talk...</Heading3>
        <ThemeSwitcher />
      </header>
      <ClientOnly fallback={<span>loading...</span>}>
        {() => <Outlet />}
      </ClientOnly>
    </>
  );
}
