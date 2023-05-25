import { Heading1, Heading2 } from '@ageorgedev/atoms';
import '@ageorgedev/reveal-framework/globals';
import { Link } from '@remix-run/react';
import NavigationHeader from '../components/NavigationHeader/NavigationHeader';

export default function TalksList() {
  return (
    <>
      <NavigationHeader />
      <main className="py-4 px-4">
        <Heading1>Talks</Heading1>
        <hr />
        <div>
          <Link to="./tailwind">
            <section>
              <Heading2>Tailwind beyond Production</Heading2>
            </section>
          </Link>
        </div>
      </main>
    </>
  );
}
