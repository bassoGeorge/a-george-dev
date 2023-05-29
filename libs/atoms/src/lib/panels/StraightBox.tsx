import { simpleShadow } from './panels.css';

export function StraightBox({
  className,
  ...otherProps
}: React.HTMLProps<HTMLDivElement>) {
  return (
    <div
      {...otherProps}
      className={`${simpleShadow} border-cc-neutral-500 border-2 mb-4 ${
        className ?? ''
      }`}
    ></div>
  );
}
