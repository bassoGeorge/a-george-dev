import { cn } from '@ageorgedev/toolbelt/cn';

export function VerticalDivider({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        className,
        'h-full justify-self-stretch w-px bg-neutral-subdued'
      )}
    />
  );
}

export function HorizontalDivider({
  className,
  ...props
}: React.HTMLAttributes<HTMLHRElement>) {
  return <hr {...props} className={cn('text-neutral-subdued', className)} />;
}
