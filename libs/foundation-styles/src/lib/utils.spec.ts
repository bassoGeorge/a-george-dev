import { cssVarName, fullCssVarName, getTailwindPropertyMap } from './utils';
import { describe, expect } from 'vitest';

describe('Foundation Utils', () => {
  describe('createCssVarName', () => {
    it('creates css variable names correctly', () => {
      expect(fullCssVarName(['something', 'good'])).toEqual(
        '--ag-something-good'
      );
      expect(fullCssVarName(['pascalCase'])).toEqual('--ag-pascal-case');
      expect(fullCssVarName(['other case'])).toEqual('--ag-other-case');
    });

    it('creates base css variable names correctly', () => {
      expect(cssVarName(['something', 'good'])).toEqual('ag-something-good');
      expect(cssVarName(['pascalCase'])).toEqual('ag-pascal-case');
    });
  });

  describe('getTailwindPropertyMap', () => {
    it('works', () => {
      const styles = {
        colorA: {
          100: 'var(--ag-rc-test-color-100)',
          200: 'var(--ag-cc-test-color-200)',
        },
        colorB: {
          doesNotMatter: 'var(--ag-some-other-stuff)',
        },
      };

      const tailwindMap = getTailwindPropertyMap(styles);
      expect(tailwindMap).toEqual({
        'rc-test-color-100': 'var(--ag-rc-test-color-100)',
        'cc-test-color-200': 'var(--ag-cc-test-color-200)',
        'some-other-stuff': 'var(--ag-some-other-stuff)',
      });
    });
  });
});
