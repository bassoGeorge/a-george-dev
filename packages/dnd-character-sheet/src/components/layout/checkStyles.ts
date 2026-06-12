export type CheckedState = boolean | 'special' | undefined

export const CHECK_FILL: Record<'true' | 'false' | 'special', string> = {
  true: 'bg-sheet-red border-sheet-red',
  special: 'bg-sheet-dark border-sheet-dark',
  false: 'bg-white border-gray-400',
}
