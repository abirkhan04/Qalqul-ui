import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import loginReducer from './login/LoginSlice';
import homeReducer from './home/HomeSlice';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    home: homeReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>>;
