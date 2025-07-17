import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../utils';
import { Body, BodyLg, BodySm } from '../typography/typography-components';

// TODO: I think it would be better to separate color and style? we may need, for example, a link styled destructive
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive-foreground dark:aria-invalid:ring-destructive-foreground aria-invalid:border-destructive-foreground",
  {
    variants: {
      variant: {
        default:
          'bg-primary-surface text-primary-onsurface hover:bg-primary-surface-2 hover:text-primary-onsurface-2 focus-visible:ring-primary-foreground',
        destructive:
          'bg-destructive-surface text-destructive-onsurface hover:bg-destructive-surface-2 hover:text-destructive-onsurface-2 focus-visible:ring-destructive-foreground',
        outline:
          'border border-neutral text-neutral shadow-xs hover:bg-primary-surface hover:text-primary-onsurface',
        secondary:
          'bg-secondary-surface text-secondary-onsurface hover:bg-secondary-surface-2 hover:text-secondary-onsurface-2 focus-visible:ring-secondary-foreground',
        ghost:
          'text-primary-foreground hover:bg-primary-surface hover:text-primary-onsurface focus-visible:ring-primary-foreground',
        link: 'text-primary-foreground underline-offset-4 hover:underline',
      },
      size: {
        default: Body.classes + ' px-4 py-2 has-[>svg]:px-3', // TODO: check all classes against svgs
        sm: BodySm.classes + ' px-3 py-1 gap-1.5 has-[>svg]:px-2.5',
        lg: BodyLg.classes + ' px-6 py-3 has-[>svg]:px-4',
        icon: 'size-9', // TODO
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
