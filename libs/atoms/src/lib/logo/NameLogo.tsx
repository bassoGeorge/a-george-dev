import {
  bottomLeftShadow,
  bottomRightShadow,
  firstNameColor,
  lastNameColor,
  logoFont,
  logoWrapper,
} from './styles';

export type NameLogoProps = {
  className?: string;
  shadowDirection?: 'left' | 'right';
};

export function NameLogo({ className, shadowDirection }: NameLogoProps) {
  const shadowClass =
    shadowDirection === 'left' ? bottomLeftShadow : bottomRightShadow;
  return (
    <div
      className={`${logoWrapper} ${
        className ?? ''
      } shadow-cc-shadow-far dark:shadow-cc-shadow`}
    >
      <h1 className={`${logoFont} ${shadowClass} ${firstNameColor}`}>Anish</h1>
      <h1 className={`${logoFont} ${shadowClass} ${lastNameColor} pl-[.5em]`}>
        George
      </h1>
    </div>
  );
}
