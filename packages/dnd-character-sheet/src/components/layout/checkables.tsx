import { cn } from '@ageorgedev/toolbelt/cn';

export type CheckableProps = {
  checked?: CheckedState;
} & React.HTMLAttributes<HTMLSpanElement>;

export function CircleCheck({ className, ...props }: CheckableProps) {
  return <BaseCheck {...props} className={cn('rounded-full', className)} />;
}

export function DiamondCheck({ className, ...props }: CheckableProps) {
  return <BaseCheck {...props} className={cn('rotate-45 size-3', className)} />;
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

export type CheckedState = boolean | 'special' | undefined;

const CHECK_FILL: Record<'true' | 'false' | 'special', string> = {
  true: 'bg-primary-surface border-primary-foreground',
  special: 'bg-secondary-surface-2 border-secondary-foreground',
  false: '',
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
  const gapClass = kind === 'circle' ? 'gap-1' : 'gap-2'; // Diamonds need a bit more space for visually same space

  return (
    <div className={cn('inline-flex', gapClass, className)} {...props}>
      {Array.from({ length: count }, (_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: Empty checkboxes, will be fine
        <Comp key={i} />
      ))}
    </div>
  );
}
