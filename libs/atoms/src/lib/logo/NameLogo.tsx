import {
  logoFont,
  logoWrapper,
  firstName,
  lastName,
  bottomRightShadow,
  bottomLeftShadow,
} from './NameLogo.css';

export type NameLogoProps = {
  className?: string;
  shadowDirection?: 'left' | 'right';
};

export function NameLogo({ className, shadowDirection }: NameLogoProps) {
  const shadowClass =
    shadowDirection === 'left' ? bottomLeftShadow : bottomRightShadow;
  return (
    <div className={`${logoWrapper} ${className ?? ''}`}>
      <h1 className={`${logoFont} ${shadowClass} ${firstName}`}>Anish</h1>
      <h1 className={`${logoFont} ${shadowClass} ${lastName}`}>George</h1>
    </div>
  );
}
