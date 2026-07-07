import { cn } from '@ageorgedev/toolbelt/cn';

export function GameInfoPanel({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        'px-3 py-2 border border-neutral-disabled border-dotted',
        className
      )}
    />
  );
}

export function GameInfoPanelTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <>
      <h3
        className={cn(
          'uppercase text-center block font-interface text-xs font-bold'
        )}
        {...props}
      />
      {/* <HorizontalDivider className="mt-1 mb-3 text-neutral-disabled" /> */}
    </>
  );
}
