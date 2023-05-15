import { Outlet } from '@remix-run/react';
import { ClientOnly } from 'remix-utils';
import 'reveal.js/dist/reveal.css';

/**
 * All my talks will use reveal.js. For this, we need to use a client-only section
 * because that library is riddled with side-effects
 */
export default function Talks() {
  return (
    <ClientOnly fallback={<span>loading...</span>}>
      {() => <Outlet />}
    </ClientOnly>
  );
}
