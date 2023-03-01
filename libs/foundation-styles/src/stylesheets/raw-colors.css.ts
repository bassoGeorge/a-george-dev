import { createGlobalTheme } from '@vanilla-extract/css';
import { RAW_COLORS, RawColors } from '../lib/tokens/raw-colors';

createGlobalTheme(':root', RawColors, RAW_COLORS);
