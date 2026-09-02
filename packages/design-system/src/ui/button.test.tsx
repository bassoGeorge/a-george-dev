import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Button } from './button';

/** Vendored from shadcn but carrying this design system's own tokens, so what is
 * worth guarding is the class surface each variant/size produces. Snapshots keep
 * that readable without enumerating every utility by hand. */
const variants = [
  'default',
  'destructive',
  'outline',
  'secondary',
  'ghost',
  'link',
] as const;

const sizes = ['default', 'sm', 'lg', 'icon'] as const;

describe('Button', () => {
  it.each(variants)('renders the %s variant', (variant) => {
    const { baseElement } = render(<Button variant={variant}>Press me</Button>);
    expect(baseElement).toMatchSnapshot();
  });

  it.each(sizes)('renders the %s size', (size) => {
    const { baseElement } = render(<Button size={size}>Press me</Button>);
    expect(baseElement).toMatchSnapshot();
  });

  it('renders a disabled button with an icon child', () => {
    const { baseElement } = render(
      <Button disabled>
        <svg aria-hidden="true" />
        Press me
      </Button>
    );
    expect(baseElement).toMatchSnapshot();
  });

  it('defaults to the default variant and size', () => {
    // Compared against an explicit render rather than buttonVariants() directly:
    // the component pipes cva output through tailwind-merge, which drops classes
    // the variant overrides, so the raw string is not what lands on the element.
    const { container: explicit } = render(
      <Button variant="default" size="default">
        Press me
      </Button>
    );
    const { container: implicit } = render(<Button>Press me</Button>);

    expect(implicit.querySelector('button')?.className).toBe(
      explicit.querySelector('button')?.className
    );
  });

  it('marks itself with data-slot so downstream styling can target it', () => {
    render(<Button>Press me</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('data-slot', 'button');
  });

  it('merges a caller className instead of dropping it', () => {
    render(<Button className="custom-class">Press me</Button>);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('renders as its child element when asChild is set', () => {
    render(
      <Button asChild>
        <a href="/somewhere">Go</a>
      </Button>
    );

    const link = screen.getByRole('link', { name: 'Go' });
    expect(link).toHaveAttribute('href', '/somewhere');
    expect(link).toHaveAttribute('data-slot', 'button');
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
