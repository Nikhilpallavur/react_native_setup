// Default dimensions for padding, margins, etc.
export const defaultDimensions = {
  paddingSmall: 8,
  paddingMedium: 16,
  paddingLarge: 24,
  marginXSmall: 4,
  marginSmall: 8,
  marginMedium: 16,
  marginLarge: 24,
  borderRadiusSmall: 8,
  borderRadiusMedium: 12,
  borderRadiusLarge: 16,
  borderRadiusXLarge: 20,
  borderRadiusCircle: 50,
  appHorizontalPadding: 12,
  appVerticalPadding: 20,
  headerHeight: 60,
  buttonHeight: 60,
};

export const defaultBorderRadius = {
  small: 8,
  medium: 12,
  large: 16,
};

// Function to merge custom dimensions with default dimensions
export const getDimensions = (customDimensions?: Record<string, number>) => {
  return {
    ...defaultDimensions, // Default values
    ...customDimensions, // Custom values to override defaults
  };
};
