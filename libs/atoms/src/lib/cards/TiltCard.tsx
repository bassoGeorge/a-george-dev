import { RecipeVariants } from '@vanilla-extract/recipes';
import {
  skewedBoxBorderContainer,
  skewedBoxContents,
  skewedBoxShadowContainer,
} from './TiltCard.css';

type SkewedBoxProps = {
  outerClassName?: string;
} & RecipeVariants<typeof skewedBoxShadowContainer> &
  RecipeVariants<typeof skewedBoxBorderContainer> &
  React.HTMLProps<HTMLDivElement>;

export function TiltCard({
  children,
  className,
  outerClassName,
  interactive,
  shape,
  skewStrength,
  border,
  ...htmlProps
}: SkewedBoxProps) {
  return (
    <div
      {...htmlProps}
      className={`${skewedBoxShadowContainer({
        shape,
        interactive,
        skewStrength,
      })} ${outerClassName ?? ''}`}
    >
      <div className={skewedBoxBorderContainer({ border })}>
        <div className={`${skewedBoxContents} ${className ?? ''}`}>
          {children}
        </div>
      </div>
    </div>
  );
}
