import { BodyLg, Heading1, PBody } from '@ageorgedev/atoms';
import { SlideTypeCenter } from '@ageorgedev/reveal-framework';

export function S01Intro() {
  return (
    <>
      <SlideTypeCenter>
        <Heading1>Beyond prototyping with Tailwind CSS</Heading1>
        <PBody>Advanced strategies for production</PBody>
      </SlideTypeCenter>
      <SlideTypeCenter>
        <Heading1>Why should you care?</Heading1>
        <PBody>Tailwind has been the subject of much controversy</PBody>
        <PBody>If you want/need/have to use it, welcome to this talk!</PBody>
      </SlideTypeCenter>
    </>
  );
}
