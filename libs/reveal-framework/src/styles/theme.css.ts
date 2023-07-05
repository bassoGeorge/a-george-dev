import { ContextualColors } from '@ageorgedev/foundation-styles';
import { globalStyle as gs } from '@vanilla-extract/css';

gs('.reveal', {
  backgroundColor: ContextualColors.page[1],
  color: ContextualColors.neutral.DEFAULT,
});

gs('.reveal code', {
  textAlign: 'left',
});

gs('.reveal .controls-arrow', {
  color: ContextualColors.accent.DEFAULT,
});

gs('.reveal .progress span', {
  backgroundColor: ContextualColors.accent.DEFAULT,
});

gs('.reveal.overview > footer', {
  display: 'none',
});
