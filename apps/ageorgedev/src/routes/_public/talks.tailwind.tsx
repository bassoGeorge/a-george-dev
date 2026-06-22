import { TalkTailwind } from '@ageorgedev/talk-tailwind';
import { createFileRoute } from '@tanstack/react-router';
import '@ageorgedev/reveal-framework/globals';

export const Route = createFileRoute('/_public/talks/tailwind')({
  component: RouteComponent,
});

function RouteComponent() {
  return <TalkTailwind />;
}
