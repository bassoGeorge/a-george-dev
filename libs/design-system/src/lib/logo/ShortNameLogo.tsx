import { Heading3 } from '../typography/typography-components';
import { firstNameColor, lastNameColor } from './styles';
import { cn } from '../utils';

export function ShortNameLogo() {
  return (
    <span className={cn(Heading3.classes, 'font-bold')}>
      <span className={firstNameColor}>A</span>
      <span className={cn(lastNameColor, 'text-[0.85em]')}>G</span>
    </span>
  );
}
