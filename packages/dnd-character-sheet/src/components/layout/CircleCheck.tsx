import { cn } from '@ageorgedev/toolbelt/cn'
import { CHECK_FILL, type CheckedState } from './checkStyles'

type CircleCheckProps = {
  checked?: CheckedState
} & React.HTMLAttributes<HTMLSpanElement>

export function CircleCheck({
  checked = false,
  className,
  ...props
}: CircleCheckProps) {
  const fill = CHECK_FILL[String(checked) as keyof typeof CHECK_FILL]
  return (
    <span
      {...props}
      className={cn(
        'w-3.5 h-3.5 rounded-full border flex-shrink-0',
        fill,
        className
      )}
    />
  )
}
