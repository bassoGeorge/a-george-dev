import { cssVarName, fullCssVarName } from './utils';

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
});
