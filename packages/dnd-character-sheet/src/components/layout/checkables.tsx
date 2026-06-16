import { cn } from '@ageorgedev/toolbelt/cn'

export type CheckableProps = {
  checked?: CheckedState
} & React.HTMLAttributes<HTMLSpanElement>

export function CircleCheck(props: CheckableProps) {
  return <BaseCheck {...props} className="rounded-full" />
}

export function DiamondCheck(props: CheckableProps) {
  return <BaseCheck {...props} className="rotate-45" />
}

function BaseCheck({ checked = false, className, ...props }: CheckableProps) {
  const fill = CHECK_FILL[String(checked) as keyof typeof CHECK_FILL]
  return (
    <span
      {...props}
      className={cn(
        'size-3.5 border flex-shrink-0 inline-block',
        fill,
        className
      )}
    />
  )
}

export type CheckedState = boolean | 'special' | undefined

const CHECK_FILL: Record<'true' | 'false' | 'special', string> = {
  true: 'bg-primary-surface border-primary-foreground',
  special: 'bg-secondary-surface-2 border-secondary-foreground',
  false: '',
}
