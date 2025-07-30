import {
  Body,
  BodyXl,
  Heading1,
  Heading2,
  TiltCard,
} from '@ageorgedev/design-system';
import Link from 'next/link';

export default function TalksPage() {
  return (
    <>
      <Heading1 className="text-center font-bold text-neutral-strong">
        Talks
      </Heading1>
      <div className="mx-auto mt-6 flex max-w-5xl flex-col gap-3">
        <Link href="/talks/tailwind">
          <TiltCard interactive={true} shape="trapRight" className="bg-page-2">
            <Heading2 className="text-neutral-strong">
              Tailwind beyond Production
            </Heading2>
            <BodyXl className="mt-2">
              Practical strategies for building production applications with
              Tailwind CSS. Managing scale, complexity and copy-paste-ability.
            </BodyXl>

            <Body className="mt-5 text-right text-neutral-subdued">
              <em>Unfold UI | Thoughtworks | 2023</em>
            </Body>
          </TiltCard>
        </Link>
      </div>
    </>
  );
}
