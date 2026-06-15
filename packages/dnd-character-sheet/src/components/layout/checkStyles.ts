export type CheckedState = boolean | 'special' | undefined

export const CHECK_FILL: Record<'true' | 'false' | 'special', string> = {
  true: 'bg-primary-surface border-primary-foreground',
  special: 'bg-secondary-surface-2 border-secondary-foreground',
  false: '',
}
