import { logoFont, logoWrapper, lastName } from './NameLogo.css';

export type NameLogoProps = {
  className?: string;
};

export function NameLogo({ className }: NameLogoProps) {
  return (
    <div
      className={`${logoWrapper} inline-block font-heading font-bold ${
        className ?? ''
      }`}
    >
      <h1
        className={`${logoFont} text-rc-timber-400 dark:text-rc-parchment-500`}
      >
        Anish
      </h1>
      <h1
        className={`${logoFont} ${lastName} text-rc-p-accent-500 dark:text-rc-p-accent-200`}
      >
        George
      </h1>
    </div>
  );
}
