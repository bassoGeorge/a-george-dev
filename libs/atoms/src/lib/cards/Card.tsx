/**
 * A simple card with a shadow and a border.
 * Rectangular in shape
 */

export function Card({
  className,
  ...otherProps
}: React.HTMLProps<HTMLDivElement>) {
  return (
    <div
      {...otherProps}
      className={`shadow border-cc-neutral-500 border-2 mb-4 ${
        className ?? ''
      }`}
    ></div>
  );
}
