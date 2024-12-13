import {useSafeAreaInsets} from 'react-native-safe-area-context';

// Custom hook to get status bar height synchronously
export const useStatusBarHeight = () => {
  return useSafeAreaInsets?.()?.top ?? 0;
};
