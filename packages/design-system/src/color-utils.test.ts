import { describe, expect, it } from 'vitest';
import { ColorCombinations, type ColorWay } from './color-utils';

const colorWays = Object.keys(ColorCombinations) as ColorWay[];

/** The table is hand-maintained, so the risk is a typo or a missing entry when a
 * new colorway is added — not the values themselves. These assert the contract
 * every entry has to satisfy rather than restating the table. */
describe('ColorCombinations', () => {
  it('exposes every colorway used by the design system', () => {
    expect(colorWays).toEqual([
      'primary',
      'secondary',
      'info',
      'warning',
      'destructive',
      'dataRed',
      'dataOrange',
      'dataYellow',
      'dataGreen',
      'dataCyan',
      'dataBlue',
      'dataPurple',
      'dataMagenta',
      'dataPink',
    ]);
  });

  it.each(colorWays)('%s defines all four sections', (way) => {
    expect(Object.keys(ColorCombinations[way]).sort()).toEqual([
      'bgAsText',
      'onSurfaceText',
      'surface',
      'text',
    ]);
  });

  it.each(colorWays)('%s uses the right utility prefix per section', (way) => {
    const { text, surface, onSurfaceText, bgAsText } = ColorCombinations[way];

    expect(text).toMatch(/^text-/);
    expect(onSurfaceText).toMatch(/^text-/);
    expect(surface).toMatch(/^bg-/);
    expect(bgAsText).toMatch(/^bg-/);
  });

  it.each(colorWays)('%s names every section from one token root', (way) => {
    const { text, surface, onSurfaceText, bgAsText } = ColorCombinations[way];
    // e.g. dataRed -> "data-red", shared by all four class names
    const root = text.replace(/^text-/, '').replace(/-foreground$/, '');

    expect(surface).toBe(`bg-${root}-surface`);
    expect(onSurfaceText).toBe(`text-${root}-onsurface`);
    expect(bgAsText).toBe(`bg-${root}-foreground`);
  });

  it('gives every colorway a distinct token root', () => {
    const roots = colorWays.map((way) => ColorCombinations[way].text);
    expect(new Set(roots).size).toBe(colorWays.length);
  });
});
