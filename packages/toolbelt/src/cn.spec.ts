import { describe, expect, it } from 'vitest';
import { cn } from './cn';

describe('cn', () => {
  it('merges multiple class strings', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('handles a single class', () => {
    expect(cn('only')).toBe('only');
  });

  it('omits false conditions', () => {
    expect(cn('base', false && 'conditional')).toBe('base');
  });

  it('includes truthy conditions', () => {
    expect(cn('base', true && 'active')).toBe('base active');
  });

  it('resolves Tailwind padding conflicts — last wins', () => {
    expect(cn('p-4', 'p-8')).toBe('p-8');
  });

  it('resolves Tailwind text colour conflicts — last wins', () => {
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
  });

  it('accepts object syntax', () => {
    expect(cn({ active: true, disabled: false })).toBe('active');
  });

  it('accepts array syntax', () => {
    expect(cn(['foo', 'bar'])).toBe('foo bar');
  });
});
