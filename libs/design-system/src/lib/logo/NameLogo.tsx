import {
  bottomLeftShadow,
  bottomRightShadow,
  firstNameColor,
  lastNameColor,
  logoFont,
  logoWrapper,
  shadowColor,
} from './styles';

export type NameLogoProps = {
  className?: string;
  shadowDirection?: 'left' | 'right';
};

export function NameLogo({ className, shadowDirection }: NameLogoProps) {
  const shadowClass =
    shadowDirection === 'left' ? bottomLeftShadow : bottomRightShadow;
  return (
    <div className={`${logoWrapper} ${className ?? ''} `}>
      <h1
        className={`${logoFont} ${shadowClass} ${shadowColor} ${firstNameColor}`}
      >
        Anish
      </h1>
      <h1
        className={`${logoFont} ${shadowClass} ${shadowColor} ${lastNameColor} pl-[.5em]`}
      >
        George
      </h1>
    </div>
  );
}
