import {
  slideCenterStyles,
  slideMainGap,
  slideMainReset,
  slideWithFooterBottomMargin,
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

type SlideTypeCenterWithFooterProps = React.PropsWithChildren<{
  footer: React.ReactNode;
}>;

export function SlideTypeCenterWithFooter(
  props: SlideTypeCenterWithFooterProps
) {
  return (
    <section className={slideMainReset}>
      <div
        className={`${slideCenterStyles} ${slideWithFooterBottomMargin} gap-4`}
      >
        <div className={`grow flex flex-col justify-center ${slideMainGap}`}>
          {props.children}
        </div>
        <footer className="flex justify-center gap-2 h-7">
          {props.footer}
        </footer>
      </div>
    </section>
  );
}
