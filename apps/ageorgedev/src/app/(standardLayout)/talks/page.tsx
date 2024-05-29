import { Heading1, Heading2, TiltCard, BodyXl, Body } from '@ageorgedev/atoms';
import Link from 'next/link';

export default function TalksPage() {
  return (
    <>
      <Heading1 className="font-bold text-center">Talks</Heading1>
      <div className={`max-w-5xl mx-auto flex flex-col gap-3 mt-6`}>
        <Link href="/talks/tailwind">
          <TiltCard
            interactive={true}
            shape="trapRight"
            className="bg-cc-page-2"
          >
            <Heading2>Tailwind beyond Production</Heading2>
            <BodyXl className="mt-2">
              Practical strategies for building production applications with
              Tailwind CSS. Managing scale, complexity and copy-paste-ability.
            </BodyXl>

            <Body className="text-right mt-5 text-cc-neutral-subtlest">
              <em>Unfold UI | Thoughtworks | 2023</em>
            </Body>
          </TiltCard>
        </Link>
      </div>
    </>
  );
}
