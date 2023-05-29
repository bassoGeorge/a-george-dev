import {
  interactiveShadow,
  shapes,
  skewStrength,
  skewedBox,
  skewedBoxBorder,
  skewedBoxShadow,
} from './panels.css';

type Shape = 'trapRight' | 'trapLeft' | 'triUpperRight' | 'triUpperLeft';
type Border = 'none' | 'all' | 'bottom';

type SkewedBoxProps = {
  shape?: Shape;
  border?: Border;
  interactive?: boolean;
  outerClassName?: string;
};

export function SkewedBox({
  children,
  shape,
  border,
  className,
  outerClassName,
  interactive,
  ...otherProps
}: React.HTMLProps<HTMLDivElement> & SkewedBoxProps) {
  const skewShape = shape ? shapes[shape] : '';
  border = border ?? 'all';

  return (
    <div
      {...otherProps}
      className={`${skewStrength} ${skewShape} ${skewedBoxShadow} ${
        interactive ? interactiveShadow : ''
      } ${outerClassName ?? ''}`}
    >
      <div className={`${skewedBoxBorder} ${fakeBorderClasses[border]}`}>
        <div className={`${skewedBox} ${className ?? ''}`}>{children}</div>
      </div>
    </div>
  );
}

const fakeBorderClasses: Record<Border, string> = {
  none: '',
  all: 'p-1',
  bottom: 'pb-1',
};
