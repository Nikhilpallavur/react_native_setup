import React, {memo} from 'react';
import {
  View,
  StatusBar,
  Platform,
  StyleSheet,
  StatusBarStyle,
} from 'react-native';
import {useStatusBarHeight} from '../../hooks';
import {useCurrentTheme} from '../../lib/redux/hooks';

interface CustomStatusBarProps {
  backgroundColor?: string; // Optional custom background color
  barStyle?: null | StatusBarStyle | undefined; // Control text/icon color
  translucent?: boolean; // Handle translucent status bar (optional)
  hidden?: boolean; // Hide the status bar (optional)
  animated?: boolean; // Animate status bar appearance (optional)
  position?: 'absolute' | 'relative'; // Additional custom styles (optional)
}

export const CustomStatusBar: React.FC<CustomStatusBarProps> = memo(
  ({
    backgroundColor,
    barStyle,
    translucent = false,
    hidden = false,
    animated = true,
    position = 'absolute',
  }) => {
    const {currentThemeData, theme} = useCurrentTheme();
    const {colors} = currentThemeData; // Get colors from theme
    const statusBarHeight = useStatusBarHeight();

    const backgroundColorFinal = backgroundColor ?? colors.headerBgColor; // Use provided or theme color
    return (
      <>
        <StatusBar
          barStyle={
            barStyle || theme === 'dark' ? 'light-content' : 'dark-content'
          }
          hidden={hidden}
          translucent={translucent}
          animated={animated}
          backgroundColor={
            Platform.OS === 'android' ? backgroundColorFinal : 'transparent'
          } // Background color for Android only
        />

        {Platform.OS === 'ios' && !translucent && !hidden && (
          <View
            style={[
              styles.statusBarBackground,
              {
                height: statusBarHeight, // Add safe area height on iOS
                backgroundColor: backgroundColorFinal, // Set custom or default background color
                position: position,
              },
            ]}
          />
        )}
      </>
    );
  },
);

const styles = StyleSheet.create({
  statusBarBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
  },
});
