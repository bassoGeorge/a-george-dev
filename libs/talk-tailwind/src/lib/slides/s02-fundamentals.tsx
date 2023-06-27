import { BodyLg, Heading1 } from '@ageorgedev/atoms';
import { D01TailwindFilesize } from '../diagrams/d01TailwindFilesize';

export function S02Fundamentals() {
  return (
    <section>
      <section>
        <Heading1>Fundamentals of Tailwind</Heading1>
        <BodyLg className="mt-5">The quick version</BodyLg>
      </section>
      <section>
        <Heading1>Utility First CSS framework</Heading1>
      </section>
      <section>
        <Heading1>Tailwind only generates the minimum CSS required</Heading1>
        <D01TailwindFilesize className="w-1/2" />
      </section>
      <section>
        <Heading1>Tradeoffs</Heading1>
      </section>
    </section>
  );
}
