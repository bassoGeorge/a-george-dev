import {
  slideCenterStyles,
  slideMainGap,
  slideMainReset,
  slideWithoutFooterBottomMargin,
} from './deck-styles.css';

export function SlideTypeCenter(props: React.PropsWithChildren) {
  return (
    <section className={slideMainReset}>
      <div
        className={`${slideCenterStyles} ${slideWithoutFooterBottomMargin} ${slideMainGap}`}
      >
        {props.children}
      </div>
    </section>
  );
}
