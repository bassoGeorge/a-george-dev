import { globalStyle } from '@vanilla-extract/css';
import { ColorPropertiesMap } from '../lib/core-colors';

globalStyle(':root', {
  vars: ColorPropertiesMap,
});
