import { cn } from '@ageorgedev/toolbelt/cn'

export function BigNumber({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn('text-4xl leading-none lining-nums', className)}
      {...props}
    />
  )
}
