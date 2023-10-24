import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  email: null,
  token: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      console.log('reduser', action.payload);
      return (state = action.payload);
    },
  },
});

export const { setUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
