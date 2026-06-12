import { cn } from '@ageorgedev/toolbelt/cn'
import { CHECK_FILL, type CheckedState } from './checkStyles'

interface DiamondCheckProps {
  checked?: CheckedState
}

export function DiamondCheck({ checked = false }: DiamondCheckProps) {
  const fill = CHECK_FILL[String(checked) as keyof typeof CHECK_FILL]
  return (
    <span
      className={cn(
        'w-3.5 h-3.5 border rounded-sm rotate-45 flex-shrink-0',
        fill
      )}
    />
  )
}
