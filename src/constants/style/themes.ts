import {colors} from './colors';
import {getDimensions} from './dimensions';
import {fontSizes} from './fontSizes';

/**
 * Function to create theme based on custom dimensions (optional).
 * It combines colors and dimensions (padding, margin, etc.).
 */
export const createTheme = (customDimensions?: Record<string, number>) => {
  const dimensions = getDimensions(customDimensions); // Use default or custom dimensions

  return {
    lightTheme: {
      colors: colors.light,
      dimensions: dimensions,
      fontSizes: fontSizes,
    },
    darkTheme: {
      colors: colors.dark,
      dimensions: dimensions,
      fontSizes: fontSizes,
    },
  };
};
