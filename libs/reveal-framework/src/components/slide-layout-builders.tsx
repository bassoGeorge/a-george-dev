import { middleDivider, slideMainGap } from './deck-styles';

export function SlideMediaRow({
  className,
  children,
  ...otherProps
}: React.HTMLProps<HTMLDivElement>) {
  return (
    <div
      className={`flex h-[50vh] w-full justify-center ${slideMainGap} ${
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
    <footer className="absolute bottom-6 flex h-6 w-full items-center justify-center gap-4 large-desktop:h-7">
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
