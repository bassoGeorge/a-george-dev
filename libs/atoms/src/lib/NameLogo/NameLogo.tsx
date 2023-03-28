import { logoFont, logoWrapper, firstName, lastName } from './NameLogo.css';

export type NameLogoProps = {
  className?: string;
};

export function NameLogo({ className }: NameLogoProps) {
  return (
    <div className={`${logoWrapper} ${className ?? ''}`}>
      <h1 className={`${logoFont} ${firstName}`}>Anish</h1>
      <h1 className={`${logoFont} ${lastName}`}>George</h1>
    </div>
  );
}
