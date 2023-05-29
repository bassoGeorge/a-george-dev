import {
  boxTypeA,
  boxTypeB,
  interactiveShadow,
  skewedBox,
  skewedBoxBorder,
  skewedBoxShadow,
} from './panels.css';

type SkewedBoxProps = {
  skewType: 0 | 1;
  interactive?: boolean;
};

export function SkewedBox({
  children,
  skewType,
  className,
  interactive,
  ...otherProps
}: React.HTMLProps<HTMLDivElement> & SkewedBoxProps) {
  const boxTypeClass = skewType === 0 ? boxTypeA : boxTypeB;
  return (
    <div
      {...otherProps}
      className={`${skewedBoxShadow} ${interactive ? interactiveShadow : ''} ${
        className ?? ''
      }`}
    >
      <div className={`${skewedBoxBorder} ${boxTypeClass}`}>
        <div className={`${skewedBox}`}>{children}</div>
      </div>
    </div>
  );
}
