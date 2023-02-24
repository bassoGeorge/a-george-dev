import { describe, it } from 'vitest';
import { ColorPropertiesMap, CoreColors, midTransform } from './core-colors';

const sampleCore = {
  dNeutral: {
    100: '#ff00ff',
    200: '#5622ee',
  },
  pAccent: {
    500: '#ddee33',
  },
};

describe('CoreColors', () => {
  it('works', () => {
    const returned = midTransform(sampleCore);
    expect(returned).toEqual([
      {
        value: '#ff00ff',
        cssName: '--ag-color-d-neutral-100',
        name: 'dNeutral100',
      },
      {
        value: '#5622ee',
        cssName: '--ag-color-d-neutral-200',
        name: 'dNeutral200',
      },
      {
        value: '#ddee33',
        cssName: '--ag-color-p-accent-500',
        name: 'pAccent500',
      },
    ]);
  });
});
