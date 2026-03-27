import { THEME_INIT_SCRIPT } from '@ageorgedev/design-system';
import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router';
import { GlobalProviders } from '../components/GlobalProviders';
import appCss from '../tailwind.css?url';
// import type { QueryClient } from '@tanstack/react-query';

type MyRouterContext = {
  // queryClient?: QueryClient;
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
        title: 'Anish George',
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
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <HeadContent />
      </head>
      <body>
        {/* <TanStackQueryProvider> */}
        {/* <Header /> */}
        <GlobalProviders>{children}</GlobalProviders>
        {/* <Footer /> */}
        {/* <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        /> */}
        {/* </TanStackQueryProvider> */}
        <Scripts />
      </body>
    </html>
  );
}
