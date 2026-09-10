import type { Config } from '@keystatic/core';
import { Keystatic } from '@keystatic/core/ui';
import { createFileRoute } from '@tanstack/react-router';
import keystaticConfig from '../../keystatic.config';

export const Route = createFileRoute('/keystatic/$')({
  component: KeystaticAdmin,
  ssr: false,
});

function KeystaticAdmin() {
  // Keystatic's own adapters (e.g. @keystatic/remix) type their config
  // param as Config<any, any> for the same reason: the concrete collection
  // schema type isn't assignable to Keystatic's own untyped Config prop.
  // biome-ignore lint/suspicious/noExplicitAny: matches Keystatic's own adapter typing
  return <Keystatic config={keystaticConfig as Config<any, any>} />;
}
