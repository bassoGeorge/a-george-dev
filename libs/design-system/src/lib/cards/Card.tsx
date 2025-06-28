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
      className={`mb-4 border-2 border-line shadow-normal ${className ?? ''}`}
    ></div>
  );
}
