import { Body, BodyXl, Heading1, Heading2, TiltCard } from '@ageorgedev/atoms';
import '@ageorgedev/reveal-framework/globals';
import { Link } from '@remix-run/react';
import NavigationHeader from '../components/NavigationHeader/NavigationHeader';
import { pageContainer } from './talks_._index.css';

export default function TalksList() {
  return (
    <>
      <NavigationHeader />
      <main className="py-4 px-4">
        <Heading1 className="font-bold text-center">Talks</Heading1>
        <div className={`${pageContainer} flex flex-col gap-3 mt-6`}>
          <Link to="./tailwind">
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
      </main>
    </>
  );
}
