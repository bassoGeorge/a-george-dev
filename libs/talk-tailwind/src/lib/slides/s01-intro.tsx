import { BodyLg, Heading1 } from '@ageorgedev/atoms';
import { SlideTypeCenter } from '@ageorgedev/reveal-framework';

export function S01Intro() {
  return (
    <>
      <SlideTypeCenter>
        <Heading1>Beyond prototyping with Tailwind CSS</Heading1>
        <BodyLg>Advanced strategies for production</BodyLg>
      </SlideTypeCenter>
      <SlideTypeCenter>
        <Heading1>Why should you care?</Heading1>
        <BodyLg>Tailwind has been the subject of much controversy</BodyLg>
        <BodyLg>If you want/need/have to use it, welcome to this talk!</BodyLg>
      </SlideTypeCenter>
    </>
  );
}
