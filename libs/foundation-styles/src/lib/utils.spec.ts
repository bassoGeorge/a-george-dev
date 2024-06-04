import { cssCase, toRem } from './utils';

describe('Foundation Utils', () => {
  describe('toRem', () => {
    it('works', () => {
      expect(toRem(16)).toEqual('1rem');
      expect(toRem(12)).toEqual('0.75rem');
      expect(toRem(48)).toEqual('3rem');
    });
  });

  it('cssCase does param case without loosing characters', () => {
    expect(cssCase('.another')).toEqual('.another');
  });
});
