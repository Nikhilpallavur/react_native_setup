// ThemeProvider.tsx
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {StyleSheet, View} from 'react-native';
import {RootState} from './lib/redux/store';
import {useTheme} from './hooks';
import {setCustomDimensions, setTheme} from './lib/redux/slices/themeSlice';
import {useAppDispatch} from './lib/redux/hooks';

interface ThemeProviderProps {
  children: React.ReactNode;
  customDimensions?: Record<string, number>;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  customDimensions,
}) => {
  const dispatch = useAppDispatch();
  const systemTheme = useTheme(); // Using the custom hook to detect system theme
  const {theme, manualTheme, currentThemeData} = useSelector(
    (state: RootState) => state.theme,
  );

  // Sync system theme with Redux store
  useEffect(() => {
    if (systemTheme !== theme && !manualTheme) {
      dispatch(setTheme(systemTheme)); // Dispatch system theme if it differs from Redux theme
    }
  }, [systemTheme, theme, dispatch, manualTheme]);

  // Set custom dimensions if provided
  useEffect(() => {
    if (customDimensions) {
      dispatch(setCustomDimensions(customDimensions));
    }
  }, [customDimensions, dispatch]);

  return (
    <View
      style={[
        {backgroundColor: currentThemeData.colors.background},
        styles.container,
      ]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
});

export default ThemeProvider;
