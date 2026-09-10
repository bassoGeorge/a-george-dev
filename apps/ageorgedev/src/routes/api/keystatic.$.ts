import { makeGenericAPIRouteHandler } from '@keystatic/core/api/generic';
import { createFileRoute } from '@tanstack/react-router';
import keystaticConfig from '../../../keystatic.config';

const handler = makeGenericAPIRouteHandler({ config: keystaticConfig });

async function handle({ request }: { request: Request }) {
  const { body, headers, status } = await handler(request);
  return new Response(body, { headers, status });
}

export const Route = createFileRoute('/api/keystatic/$')({
  server: {
    handlers: {
      GET: handle,
      POST: handle,
    },
  },
});
