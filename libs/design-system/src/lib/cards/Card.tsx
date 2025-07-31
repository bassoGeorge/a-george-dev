/**
 * A simple card with a shadow and a border.
 * Rectangular in shape
 */

import { cn } from '@ageorgedev/toolbelt';

export function Card({
  className,
  ...otherProps
}: React.HTMLProps<HTMLDivElement>) {
  return (
    <div
      {...otherProps}
      className={cn('border-line mb-4 border-2 shadow-normal', className)}
    ></div>
  );
}
