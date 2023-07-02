import { RecipeVariants } from '@vanilla-extract/recipes';
import {
  skewedBoxBorderContainer,
  skewedBoxContents,
  skewedBoxShadowContainer,
} from './TiltCard.css';

export type TiltCardProps = {
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
}: TiltCardProps) {
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
