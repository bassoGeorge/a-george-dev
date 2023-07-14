import { Spacing } from '@ageorgedev/foundation-styles';
import { style } from '@vanilla-extract/css';

export const calloutBadgeShape = style([
  {
    position: 'relative',
    height: Spacing[10],
    width: Spacing[10],
    transform: 'rotate(-10deg)',
    ':before': {
      content: '',
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      zIndex: -1,
      transform: 'rotate(45deg)',
    },
  },
  'flex flex-col justify-center items-center gap-1',
]);
