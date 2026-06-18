export function formatMod(mod: number): string {
  return mod >= 0 ? `+${mod}` : `${mod}`;
}

export function formatModIgnoreZero(n: number): string {
  return n === 0 ? '' : n > 0 ? `+${n}` : `${n}`;
}
