export type Theme = 'light' | 'dark';

export type ThemeState = {
  theme: Theme;
  underUserControl: boolean;
};

export type ThemeAction =
  | {
      type: 'setByUser' | 'setBySystem';
      theme: Theme;
    }
  | {
      type: 'setByDom';
      theme: Theme | null;
    };

export const initialThemeState: ThemeState = {
  theme: 'light',
  underUserControl: false,
};

export function themeReducer(state: ThemeState, action: ThemeAction) {
  switch (action.type) {
    case 'setByUser':
      return {
        theme: action.theme,
        underUserControl: true,
      };
    case 'setBySystem':
      if (state.underUserControl) {
        return state;
      } else {
        return {
          ...state,
          theme: action.theme,
        };
      }
    case 'setByDom':
      if (action.theme !== null) {
        return {
          ...state,
          theme: action.theme,
        };
      } else {
        return state;
      }
  }
}
