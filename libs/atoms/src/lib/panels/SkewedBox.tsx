import { boxTypeA, boxTypeB, skewedBox, skewedBoxShadow } from './panels.css';

type SkewedBoxProps = {
  skewType: 0 | 1;
};

export function SkewedBox({
  children,
  skewType,
  className,
  ...otherProps
}: React.HTMLProps<HTMLDivElement> & SkewedBoxProps) {
  const boxTypeClass = skewType === 0 ? boxTypeA : boxTypeB;
  return (
    <div {...otherProps} className={`${skewedBoxShadow} ${className ?? ''}`}>
      <div className={`${skewedBox} ${boxTypeClass}`}>{children}</div>
    </div>
  );
}
