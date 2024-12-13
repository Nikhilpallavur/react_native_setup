import {Dimensions, PixelRatio} from 'react-native';

// Get device screen dimensions
const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

// Guideline sizes for scaling (e.g., based on iPhone 11 dimensions)
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

// Function to normalize the size across devices (for better responsiveness)
const normalize = (size: number, based = 'width') => {
  const scale =
    based === 'height'
      ? SCREEN_HEIGHT / guidelineBaseHeight
      : SCREEN_WIDTH / guidelineBaseWidth;
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize)); // Normalize for pixel density
};

// Export responsive font scaling functions
export const scaleFont = (size: number) => normalize(size, 'width');
export const verticalScaleFont = (size: number) => normalize(size, 'height');
export const moderateScaleFont = (size: number, factor = 0.5) =>
  size + (scaleFont(size) - size) * factor;

// Centralized font sizes
export const fontSizes = {
  small: moderateScaleFont(12),
  medium: moderateScaleFont(16),
  large: moderateScaleFont(20),
  xLarge: moderateScaleFont(24),
  xxLarge: moderateScaleFont(28),
  commonHeader: moderateScaleFont(24),
  headerSmall: moderateScaleFont(14),
  headerMedium: moderateScaleFont(18),
};
