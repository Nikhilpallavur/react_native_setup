import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  createTheme,
  colors as DefaultColor,
  defaultDimensions,
  fontSizes,
} from '../../../constants';

interface ThemeState {
  theme: 'light' | 'dark'; // Add other themes if necessary
  manualTheme: boolean;
  customDimensions?: Record<string, number>;
  currentThemeData: {
    colors: (typeof DefaultColor)[keyof typeof DefaultColor];
    dimensions: typeof defaultDimensions;
    fontSizes: typeof fontSizes;
  };
}

const initialState: ThemeState = {
  theme: 'light',
  manualTheme: false,
  currentThemeData: createTheme().lightTheme,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<'light' | 'dark'>) {
      state.theme = action.payload;
      state.currentThemeData = createTheme(state.customDimensions)[
        `${action.payload}Theme`
      ];
    },
    setManualThem(state, action: PayloadAction<boolean>) {
      state.manualTheme = action.payload;
    },
    setCustomDimensions(state, action: PayloadAction<Record<string, number>>) {
      state.customDimensions = action.payload;
      state.currentThemeData = createTheme(action.payload)[
        `${state.theme}Theme`
      ];
    },
  },
});

export const {setTheme, setManualThem, setCustomDimensions} =
  themeSlice.actions;

export default themeSlice.reducer;
