import { describe, expect, it } from 'vitest';
import { initialThemeState, themeReducer } from './theme-state';

describe('themeReducer', () => {
  it('setByUser sets theme and marks under user control', () => {
    const state = themeReducer(initialThemeState, {
      type: 'setByUser',
      theme: 'dark',
    });
    expect(state.theme).toBe('dark');
    expect(state.underUserControl).toBe(true);
  });

  it('setBySystem updates theme when not under user control', () => {
    const state = themeReducer(initialThemeState, {
      type: 'setBySystem',
      theme: 'dark',
    });
    expect(state.theme).toBe('dark');
    expect(state.underUserControl).toBe(false);
  });

  it('setBySystem is ignored when under user control', () => {
    const userState = themeReducer(initialThemeState, {
      type: 'setByUser',
      theme: 'dark',
    });
    const state = themeReducer(userState, {
      type: 'setBySystem',
      theme: 'light',
    });
    expect(state.theme).toBe('dark');
    expect(state.underUserControl).toBe(true);
  });

  it('setByDom updates theme when theme is non-null', () => {
    const state = themeReducer(initialThemeState, {
      type: 'setByDom',
      theme: 'dark',
    });
    expect(state.theme).toBe('dark');
  });

  it('setByDom is ignored when theme is null', () => {
    const state = themeReducer(initialThemeState, {
      type: 'setByDom',
      theme: null,
    });
    expect(state).toBe(initialThemeState);
  });
});
