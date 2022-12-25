import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { IPaginationParams, Movie, PagedMovies } from '../interfaces/app-interfaces';
import { getPagedMovies } from './MoviesApi';

export interface HomeState {
  movies: Movie[];
  pagedMovies: PagedMovies;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: HomeState = {
  movies: [],
  status: 'idle',
  pagedMovies: {pageCount: 0, movies: []}
};

export const getPagedMoviesAsync = createAsyncThunk(
  'paged-movies',
  async (params: IPaginationParams) => {
    const response = await getPagedMovies(params);
    return response.data;
  }
);

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setMovies: (state,  action: PayloadAction<Movie[]>)=> {
      state.movies = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPagedMoviesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getPagedMoviesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.pagedMovies = action.payload;
      })
      .addCase(getPagedMoviesAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { setMovies } = homeSlice.actions;
export const selectPagedMovies = (state: RootState) => state.home.pagedMovies;
export default homeSlice.reducer;
