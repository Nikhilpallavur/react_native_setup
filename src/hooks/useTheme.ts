import {useState, useEffect} from 'react';
import {Appearance} from 'react-native';

export const useTheme = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(
    Appearance.getColorScheme() || 'light',
  );

  useEffect(() => {
    const listener = Appearance.addChangeListener(({colorScheme}) => {
      setTheme(colorScheme || 'light');
    });
    return () => listener.remove();
  }, []);

  return theme;
};
