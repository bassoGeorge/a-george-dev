import { cn } from '@ageorgedev/toolbelt';
import { Slide } from '@revealjs/react';
import React from 'react';
import {
  slideCenterStyles,
  slideContentReset,
  slideHeaderGrid,
  slideMainGap,
  slideMainReset,
  slideWithoutFooterBottomMargin,
} from './deck-styles';
import {
  CalloutForAdvancedTopic,
  CalloutForPersonalOpinion,
  CalloutForVD,
} from './slide-components';

type CalloutType = 'UX' | 'Advanced' | 'Opinion';

type SlideWithCallout = {
  callout?: CalloutType | CalloutType[];
};

export function SlideTypeCenter(
  props: React.PropsWithChildren<SlideWithCallout>
) {
  return (
    <Slide className={slideMainReset}>
      <TopLeftPosition {...props} />
      <div
        className={cn(
          slideCenterStyles,
          slideContentReset,
          slideWithoutFooterBottomMargin,
          slideMainGap
        )}
      >
        {props.children}
      </div>
    </Slide>
  );
}

export function SlideTypeRegular(
  props: React.PropsWithChildren<
    { heading: React.ReactNode } & SlideWithCallout
  >
) {
  return (
    <Slide className={slideMainReset}>
      <TopLeftPosition {...props} />
      <div
        className={cn(
          slideHeaderGrid,
          slideContentReset,
          slideWithoutFooterBottomMargin
        )}
      >
        <header>{props.heading}</header>
        <div className={cn(slideCenterStyles, slideMainGap, 'self-start')}>
          {props.children}
        </div>
      </div>
    </Slide>
  );
}

function TopLeftPosition({
  callout,
}: React.PropsWithChildren<SlideWithCallout>) {
  const calloutTypes = Array.isArray(callout) ? callout : [callout];
  const calloutComponents = calloutTypes.map((c) =>
    c ? CalloutMap[c] : React.Fragment
  );
  return (
    <div className="absolute left-6 top-0 flex gap-5">
      {calloutComponents.map((Comp, i) => (
        <Comp key={i} />
      ))}
    </div>
  );
}

const CalloutMap = {
  UX: CalloutForVD,
  Advanced: CalloutForAdvancedTopic,
  Opinion: CalloutForPersonalOpinion,
};
