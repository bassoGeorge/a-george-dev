import { Heading1, PBody } from '@ageorgedev/atoms';
import { SlideMediaRow, SlideTypeCenter } from '@ageorgedev/reveal-framework';
import { D01TailwindFilesize } from '../diagrams/D01TailwindFilesize';

export function S02Fundamentals() {
  return (
    <section>
      <SlideTypeCenter>
        <Heading1>Fundamentals of Tailwind</Heading1>
        <PBody>The quick version</PBody>
      </SlideTypeCenter>
      <SlideTypeCenter>
        <Heading1>Utility First CSS framework</Heading1>
      </SlideTypeCenter>
      <SlideTypeCenter>
        <Heading1>Tailwind only generates the minimum CSS required</Heading1>
        <SlideMediaRow>
          <D01TailwindFilesize />
        </SlideMediaRow>
      </SlideTypeCenter>
      <SlideTypeCenter>
        <Heading1>Tradeoffs</Heading1>
      </SlideTypeCenter>
    </section>
  );
}
