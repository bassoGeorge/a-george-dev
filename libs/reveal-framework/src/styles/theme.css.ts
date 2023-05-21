import { ContextualColors, RawColors } from '@ageorgedev/foundation-styles';
import { globalStyle as gs } from '@vanilla-extract/css';

gs('.reveal', {
  backgroundColor: ContextualColors.page[1],
  color: ContextualColors.neutral[500],
});

gs('.reveal code', {
  textAlign: 'left',
});

gs('.reveal .controls-arrow', {
  color: RawColors.pAccent[400],
});
