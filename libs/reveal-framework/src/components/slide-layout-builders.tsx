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

export function DeckFooter(props: React.PropsWithChildren) {
  return (
    <footer className="absolute bottom-6 h-7 w-full flex justify-center items-center gap-4">
      {props.children}
    </footer>
  );
}
