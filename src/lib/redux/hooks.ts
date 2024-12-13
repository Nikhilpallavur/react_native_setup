import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from './store';

// Typed selector hook
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
// Selector hook for accessing theme data in components
export const useCurrentTheme = () => useAppSelector(state => state.theme);
export const useCurrentThemeData = () =>
  useAppSelector(state => state.theme.currentThemeData);
export const useUserDetails = () =>
  useAppSelector((state: RootState) => state.userDetails);
