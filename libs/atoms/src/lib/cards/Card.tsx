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
      className={`shadow-normal border-cc-line border-2 mb-4 ${
        className ?? ''
      }`}
    ></div>
  );
}
