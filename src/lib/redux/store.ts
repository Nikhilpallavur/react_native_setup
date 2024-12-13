// store.ts
import {configureStore} from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice';
import userDetailsReducer from './slices/userDetails';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    userDetails: userDetailsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
