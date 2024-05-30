import '@ageorgedev/foundation-styles/globals';
import Head from 'next/head';
import './tailwind.css';
import { GlobalProviders } from './GlobalProviders';

export const metadata = {
  title: 'Welcome to ageorgedev',
  description: 'Generated by create-nx-workspace',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Alegreya+Sans+SC:wght@500;800&family=Alegreya+Sans:ital,wght@0,100;0,400;0,700;1,100;1,400;1,700&family=Alegreya:ital,wght@0,400;0,500;0,700;1,400;1,500&family=Source+Code+Pro&display=swap"
        />

        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <body>
        <GlobalProviders>{children}</GlobalProviders>
      </body>
    </html>
  );
}
