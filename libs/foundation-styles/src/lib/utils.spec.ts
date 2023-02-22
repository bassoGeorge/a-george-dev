import { createCssVarName } from './utils';

describe('Foundation Utils', () => {
  describe('createCssVarName', () => {
    it('creates css variable names correctly', () => {
      expect(createCssVarName(['something', 'good'])).toEqual(
        '--ag-something-good'
      );
      expect(createCssVarName(['pascalCase'])).toEqual('--ag-pascal-case');
      expect(createCssVarName(['other case'])).toEqual('--ag-other-case');
    });
  });
});
