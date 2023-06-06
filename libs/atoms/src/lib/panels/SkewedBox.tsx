import { RecipeVariants } from '@vanilla-extract/recipes';
import {
  skewedBoxBorderContainer,
  skewedBoxContents,
  skewedBoxShadowContainer,
} from './panels.css';

type SkewedBoxProps = {
  outerClassName?: string;
} & RecipeVariants<typeof skewedBoxShadowContainer> &
  RecipeVariants<typeof skewedBoxBorderContainer> &
  React.HTMLProps<HTMLDivElement>;

export function SkewedBox({
  children,
  className,
  outerClassName,
  interactive,
  shape,
  border,
  ...htmlProps
}: SkewedBoxProps) {
  return (
    <div
      {...htmlProps}
      className={`${skewedBoxShadowContainer({ shape, interactive })} ${
        outerClassName ?? ''
      }`}
    >
      <div className={skewedBoxBorderContainer({ border })}>
        <div className={`${skewedBoxContents} ${className ?? ''}`}>
          {children}
        </div>
      </div>
    </div>
  );
}
