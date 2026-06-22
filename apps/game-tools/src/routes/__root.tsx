import { THEME_INIT_SCRIPT } from '@ageorgedev/design-system/theming/theme-init-script';
import {
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from '@tanstack/react-router';
import { GlobalProviders } from '../components/GlobalProviders';
import appCss from '../styles.css?url';

type MyRouterContext = {
  temp?: string;
};

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Game Tools',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        {/** biome-ignore lint/security/noDangerouslySetInnerHtml: Expected to be done for this script */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <HeadContent />
      </head>
      <body>
        <GlobalProviders>{children}</GlobalProviders>
        <Scripts />
      </body>
    </html>
  );
}
