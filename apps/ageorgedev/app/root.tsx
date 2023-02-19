import type { LinksFunction, MetaFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import { cssBundleHref } from '@remix-run/css-bundle';
import globalAppStylesheetHref from './styles.css';

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Anish George',
  viewport: 'width=device-width,initial-scale=1',
});

export const links: LinksFunction = () => [
  /** Google fonts */
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Alegreya+Sans+SC:wght@500;800&family=Alegreya+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Alegreya:ital,wght@0,500;0,700;1,500&display=swap',
  },

  /** Application global styles. Contains the tailwind stuff */
  { rel: 'stylesheet', href: globalAppStylesheetHref },

  /** Anything bundled with vanilla extract */
  // Not yet sure of the position. Depends on whether design system stuff goes in here...
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
