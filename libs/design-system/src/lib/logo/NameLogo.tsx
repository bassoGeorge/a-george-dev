import {
  bottomLeftShadow,
  bottomRightShadow,
  firstNameColor,
  lastNameColor,
  logoFont,
  logoWrapper,
  shadowColor,
} from './styles';
import { cn } from '../utils';

export type NameLogoProps = {
  className?: string;
  shadowDirection?: 'left' | 'right';
};

export function NameLogo({ className, shadowDirection }: NameLogoProps) {
  const shadowClass =
    shadowDirection === 'left' ? bottomLeftShadow : bottomRightShadow;
  return (
    <div className={cn(logoWrapper, className)}>
      <h1 className={cn(logoFont, shadowClass, shadowColor, firstNameColor)}>
        Anish
      </h1>
      <h1
        className={cn(
          logoFont,
          shadowClass,
          shadowColor,
          lastNameColor,
          'pl-[.5em]'
        )}
      >
        George
      </h1>
    </div>
  );
}
