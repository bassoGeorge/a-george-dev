import { BodyLg, Heading1 } from '@ageorgedev/atoms';
import { TwLogo } from '@ageorgedev/brand-components';
import {
  SlideTypeCenter,
  SlideTypeCenterWithFooter,
} from '../components/slide-types';

export function S01Intro() {
  return (
    <>
      <SlideTypeCenterWithFooter footer={<TwLogo />}>
        <Heading1>Beyond prototyping with Tailwind CSS</Heading1>
        <BodyLg>Advanced strategies for production</BodyLg>
      </SlideTypeCenterWithFooter>
      <SlideTypeCenter>
        <Heading1>Why should you care?</Heading1>
        <BodyLg>Tailwind has been the subject of much controversy</BodyLg>
        <BodyLg>If you want/need/have to use it, welcome to this talk!</BodyLg>
      </SlideTypeCenter>
    </>
  );
}
