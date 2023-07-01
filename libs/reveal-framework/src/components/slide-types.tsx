import React from 'react';
import {
  slideCenterStyles,
  slideContentReset,
  slideMainGap,
  slideMainReset,
  slideWithoutFooterBottomMargin,
  slideHeaderGrid,
} from './deck-styles.css';

export function SlideTypeCenter(props: React.PropsWithChildren) {
  return (
    <section className={slideMainReset}>
      <div
        className={`${slideCenterStyles} ${slideContentReset} ${slideWithoutFooterBottomMargin} ${slideMainGap}`}
      >
        {props.children}
      </div>
    </section>
  );
}

export function SlideTypeSingleHeadingWithCenterContent(
  props: React.PropsWithChildren<{ heading: React.ReactNode }>
) {
  return (
    <section className={slideMainReset}>
      <div
        className={`${slideHeaderGrid} ${slideContentReset} ${slideWithoutFooterBottomMargin}`}
      >
        <header>{props.heading}</header>
        <div className={`${slideCenterStyles} ${slideMainGap} self-start`}>
          {props.children}
        </div>
      </div>
    </section>
  );
}
