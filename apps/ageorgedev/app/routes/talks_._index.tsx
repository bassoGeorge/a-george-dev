import { Heading1, Heading2, SkewedBox } from '@ageorgedev/atoms';
import '@ageorgedev/reveal-framework/globals';
import { Link } from '@remix-run/react';
import NavigationHeader from '../components/NavigationHeader/NavigationHeader';
import { pageContainer } from './talks_._index.css';

export default function TalksList() {
  return (
    <>
      <NavigationHeader />
      <main className="py-4 px-4">
        <Heading1>Talks</Heading1>
        <div className={`${pageContainer} flex flex-col gap-3 mt-3`}>
          <Link to="./tailwind">
            <SkewedBox skewType={0} interactive={true}>
              <Heading2>Tailwind beyond Production</Heading2>
            </SkewedBox>
          </Link>
        </div>
      </main>
    </>
  );
}
