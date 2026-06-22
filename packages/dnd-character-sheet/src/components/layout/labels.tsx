import { cn } from '@ageorgedev/toolbelt/cn';

export function BasicLabel({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('text-xs uppercase', className)} {...props}>
      {children}
    </div>
  );
}

export function LabelUnder({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <BasicLabel className={cn(className, 'border-t')} {...props} />;
}
