import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  movies: [],
};

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    loadMovies(state, action) {
      state.movies = action.payload;
    },
    addMovie(state, action) {
      state.movies.push(action.payload);
    },
    deleteMovie(state, action) {
      console.log('reduser', action.payload);
      return {
        movies: state.movies.filter(movie => movie.id !== action.payload),
      };
    },
  },
});

export const { loadMovies, addMovie, deleteMovie } = watchlistSlice.actions;
export const watchlistReducer = watchlistSlice.reducer;
