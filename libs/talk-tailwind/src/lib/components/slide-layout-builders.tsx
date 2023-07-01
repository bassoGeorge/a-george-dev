import { slideMainGap } from './deck-styles.css';

export function SlideMediaRow({
  className,
  children,
  ...otherProps
}: React.HTMLProps<HTMLDivElement>) {
  return (
    <div
      className={`flex justify-center h-15 ${slideMainGap} ${className ?? ''}`}
      {...otherProps}
    >
      {children}
    </div>
  );
}
