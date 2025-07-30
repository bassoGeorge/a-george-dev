import React from 'react';
import {
  slideCenterStyles,
  slideContentReset,
  slideMainGap,
  slideMainReset,
  slideWithoutFooterBottomMargin,
  slideHeaderGrid,
} from './deck-styles';
import {
  CalloutForAdvancedTopic,
  CalloutForPersonalOpinion,
  CalloutForVD,
} from './slide-components';
import { cn } from '@ageorgedev/toolbelt';

type CalloutType = 'UX' | 'Advanced' | 'Opinion';

type SlideWithCallout = {
  callout?: CalloutType | CalloutType[];
};

export function SlideTypeCenter(
  props: React.PropsWithChildren<SlideWithCallout>
) {
  return (
    <section className={slideMainReset}>
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
    </section>
  );
}

export function SlideTypeRegular(
  props: React.PropsWithChildren<
    { heading: React.ReactNode } & SlideWithCallout
  >
) {
  return (
    <section className={slideMainReset}>
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
    </section>
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
    <div className="absolute top-0 left-6 flex gap-5">
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
