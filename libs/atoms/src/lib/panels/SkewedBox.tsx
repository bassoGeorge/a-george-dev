import { skewedBox } from './panels.css';

type SkewedBoxProps = {
  skewType: 0 | 1;
};

export function SkewedBox({
  children,
  skewType,
  className,
  ...otherProps
}: React.HTMLProps<HTMLDivElement> & SkewedBoxProps) {
  return (
    <div {...otherProps} className={`${skewedBox} ${className ?? ''}`}>
      {children}
    </div>
  );
}
