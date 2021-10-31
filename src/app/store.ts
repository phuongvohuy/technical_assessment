import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import signInSlice from '../features/signin/SignInSlice';

export const store = configureStore({
  reducer: {
    signin: signInSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
