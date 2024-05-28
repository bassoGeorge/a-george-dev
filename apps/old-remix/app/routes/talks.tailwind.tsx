import { TalkTailwind } from '@ageorgedev/talk-tailwind';
import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => ({
  title: 'AG | Tailwind',
});

export default function Talk() {
  return <TalkTailwind />;
}
