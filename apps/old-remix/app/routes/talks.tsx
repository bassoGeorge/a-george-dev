import '@ageorgedev/reveal-framework/globals';
import { Outlet } from '@remix-run/react';
import { ClientOnly } from 'remix-utils';
import NavigationHeader from '../components/NavigationHeader/NavigationHeader';

/**
 * All my talks will use reveal.js. For this, we need to use a client-only section
 * because that library is riddled with side-effects
 */
export default function Talks() {
  return (
    <div className="flex flex-col h-screen">
      <NavigationHeader noLinks={true} seemless={true} />
      <ClientOnly fallback={<span>loading...</span>}>
        {() => (
          <div className="grow">
            <Outlet />
          </div>
        )}
      </ClientOnly>
    </div>
  );
}
