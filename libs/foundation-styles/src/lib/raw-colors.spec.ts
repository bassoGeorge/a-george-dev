import { describe, expect, it } from 'vitest';
import {
  ColorPropertiesMap,
  midTransformedColors,
  RawColors,
} from './raw-colors';
import { keys, values } from 'ramda';

describe('RawColors', () => {
  describe('ColorPropertiesMap', () => {
    it('has the right kind of keys', () => {
      const properties = keys(ColorPropertiesMap);

      expect(properties).not.toHaveLength(0);
      properties.forEach((property) => {
        expect(property).toMatch(/^--ag-rc-[\w-]+-\d{3}$/);
      });
    });

    it('has the right kind of values', () => {
      const colorValues = values(ColorPropertiesMap);
      expect(colorValues).not.toHaveLength(0);
      colorValues.forEach((value) => {
        expect(value).toMatch(/^hsl\(\d+,?\s\d+%,?\s\d+%(\s\/\s0?.?\d)?\)$/);
      });
    });
  });
  // More tests to come
});
