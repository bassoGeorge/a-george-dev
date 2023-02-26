import { globalStyle } from '@vanilla-extract/css';
import { ColorPropertiesMap } from '../lib/raw-colors';

globalStyle(':root', {
  vars: ColorPropertiesMap,
});
