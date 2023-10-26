import { createSlice } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const initialState = {
  id: null,
  name: null,
  email: null,
  token: null,
};

const persistConfig = {
  key: 'root',
  storage,
  // whitelist: ['token'],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      return (state = action.payload);
    },
  },
});

const userReducer = userSlice.reducer;

export const persistedReducer = persistReducer(persistConfig, userReducer);
export const { setUser } = userSlice.actions;
