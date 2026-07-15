import { TiltCard } from '@ageorgedev/design-system/cards/TiltCard';
import {
  BodySm,
  Heading4,
  Heading6,
} from '@ageorgedev/design-system/typography/typography-components';
import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/_public/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-8">
      <section className="text-center flex flex-col items-center gap-3">
        <Heading4 className="mb-4">Dungeons & Dragons</Heading4>
        <Link to="/dnd/characters">
          <TiltCard interactive className="w-lg">
            <Heading6>Pre-made character sheets</Heading6>
            <BodySm className="text-neutral-subdued mt-1">
              A roster of ready to play, hand-crafted characters for D&D 5.5e
              with spell books and beginner friendly notes.
            </BodySm>
          </TiltCard>
        </Link>
      </section>
    </div>
  );
}
