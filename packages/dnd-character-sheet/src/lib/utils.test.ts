import { describe, expect, it } from 'vitest';
import { formatMod, formatModIgnoreZero } from './utils';

describe('formatMod and formatModIgnoreZero', () => {
  it('formats positive, negative, and zero modifiers correctly', () => {
    expect(formatMod(-3)).toBe('-3');
    expect(formatMod(0)).toBe('+0');
    expect(formatMod(5)).toBe('+5');

    expect(formatModIgnoreZero(-3)).toBe('-3');
    expect(formatModIgnoreZero(0)).toBe('');
    expect(formatModIgnoreZero(5)).toBe('+5');
  });
});
