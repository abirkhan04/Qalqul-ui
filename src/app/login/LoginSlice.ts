import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { IkeyValue, User } from '../interfaces/app-interfaces';
import { authenticate } from './AppLoginApi';

export interface LoginState {
  user: User;
  status: string;
  isLoggedIn: boolean;
}

const initialState: LoginState = {
  user: {username: '',password: ''},
  status: 'idle',
  isLoggedIn: false
};

export const loginAsync = createAsyncThunk(
  'auth/login',
  async (credentials: IkeyValue) => {
    const response = await authenticate(credentials);
    localStorage.setItem('token', response.data.token);
    return response.data;
  }
);

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLoggedIn: (state, action: PayloadAction<boolean>)=> {
      state.isLoggedIn = action.payload;
    },
    setStatus: (state, action: PayloadAction<string>)=> {
      state.status = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload;
      })
      .addCase(loginAsync.rejected, (state) => {
        state.status = "Authentication failed";
      });
  },
});

export const  {setStatus} = loginSlice.actions;
export const selectUser = (state: RootState) => state.login.user;
export const selectStatus = (state: RootState)=> state.login.status;
export const selectLoggedIn = (state: RootState) => state.login.isLoggedIn;

export default loginSlice.reducer;
