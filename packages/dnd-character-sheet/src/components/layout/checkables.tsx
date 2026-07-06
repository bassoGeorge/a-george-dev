import { cn } from '@ageorgedev/toolbelt/cn';

export type CheckableProps = {
  checked?: CheckedState;
} & React.HTMLAttributes<HTMLSpanElement>;

export function CircleCheck({ className, ...props }: CheckableProps) {
  return <BaseCheck {...props} className={cn('rounded-full', className)} />;
}

export function DiamondCheck({ className, ...props }: CheckableProps) {
  return (
    <BaseCheck {...props} className={cn('rotate-45 scale-80', className)} />
  );
}

function BaseCheck({ checked = false, className, ...props }: CheckableProps) {
  const fill = CHECK_FILL[String(checked) as keyof typeof CHECK_FILL];
  return (
    <span
      {...props}
      className={cn(
        'size-3 border flex-shrink-0 flex-grow-0 inline-block',
        fill,
        className
      )}
    />
  );
}

export type CheckedState = boolean | 'special' | 'suggested' | undefined;

const CHECK_FILL: Record<'true' | 'false' | 'special' | 'suggested', string> = {
  true: 'bg-primary-surface border-primary-foreground',
  special: 'bg-secondary-surface-2 border-secondary-foreground',
  suggested: 'bg-page-2',
  false: 'bg-page-4',
};

export function EmptyCheckList({
  className,
  count,
  kind = 'circle',
  ...props
}: React.HtmlHTMLAttributes<HTMLDivElement> & {
  count: number;
  kind?: 'circle' | 'diamond';
}) {
  const Comp = kind === 'circle' ? CircleCheck : DiamondCheck;

  return (
    <div className={cn('inline-flex gap-1', className)} {...props}>
      {Array.from({ length: count }, (_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: Empty checkboxes, will be fine
        <Comp key={i} />
      ))}
    </div>
  );
}
