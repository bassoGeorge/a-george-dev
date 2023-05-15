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
import globalAppStylesheetHref from './tailwind.css';
import '@ageorgedev/foundation-styles/globals';

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
    href: 'https://fonts.googleapis.com/css2?family=Alegreya+Sans+SC:wght@500;800&family=Alegreya+Sans:ital,wght@0,100;0,400;0,700;1,100;1,400;1,700&family=Alegreya:ital,wght@0,400;0,500;0,700;1,400;1,500&display=swap',
  },

  /** Anything bundled with vanilla extract. Also contains the foundation-styles */
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),

  /** Application global styles. Contains the tailwind stuff */
  { rel: 'stylesheet', href: globalAppStylesheetHref },

  { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
  { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
  { rel: 'manifest', href: '/site.webmanifest' },
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
