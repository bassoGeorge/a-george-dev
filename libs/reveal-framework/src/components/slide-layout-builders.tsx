import { middleDivider, slideMainGap } from './deck-styles.css';

export function SlideMediaRow({
  className,
  children,
  ...otherProps
}: React.HTMLProps<HTMLDivElement>) {
  return (
    <div
      className={`w-full flex justify-center h-15 ${slideMainGap} ${
        className ?? ''
      }`}
      {...otherProps}
    >
      {children}
    </div>
  );
}

export function DeckFooter(props: React.PropsWithChildren) {
  return (
    <footer className="absolute bottom-6 h-7 w-full flex justify-center items-center gap-4">
      {props.children}
    </footer>
  );
}

export function ComparisonRow({
  className,
  left,
  right,
  ...otherProps
}: {
  left: React.ReactNode;
  right: React.ReactNode;
} & Omit<React.HTMLProps<HTMLDivElement>, 'children'>) {
  return (
    <div
      className={`${middleDivider} grid grid-cols-2 gap-x-8 ${className ?? ''}`}
      {...otherProps}
    >
      <div className={`flex flex-col text-right ${slideMainGap}`}>{left}</div>
      <div className={`flex flex-col text-left ${slideMainGap}`}>{right}</div>
    </div>
  );
}
