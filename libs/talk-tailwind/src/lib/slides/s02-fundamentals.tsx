import { BodyLg, Heading1 } from '@ageorgedev/atoms';
import { D01TailwindFilesize } from '../diagrams/D01TailwindFilesize';
import { SlideMediaRow, SlideTypeCenter } from '@ageorgedev/reveal-framework';

export function S02Fundamentals() {
  return (
    <section>
      <SlideTypeCenter>
        <Heading1>Fundamentals of Tailwind</Heading1>
        <BodyLg>The quick version</BodyLg>
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
