import { Heading3 } from '../typography/typography-components';
import { firstNameColor, lastNameColor } from './styles';

export function ShortNameLogo() {
  return (
    <span className={`${Heading3.classes} font-bold`}>
      <span className={firstNameColor}>A</span>
      <span className={`${lastNameColor} text-[0.85em]`}>G</span>
    </span>
  );
}
