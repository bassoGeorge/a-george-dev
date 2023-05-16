import { ContextualColors } from '@ageorgedev/foundation-styles';
import { globalStyle as gs } from '@vanilla-extract/css';

gs('.reveal', {
  backgroundColor: ContextualColors.page[1],
});

gs('body.reveal-viewport', {
  color: ContextualColors.neutral[500],
});
