import { configureStore } from '@reduxjs/toolkit';
import { persistedReducer } from './userSlice';
import { api } from './api';
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { watchlistReducer } from './watchlistSlice';

export const store = configureStore({
  reducer: {
    user: persistedReducer,
    watchlist: watchlistReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware),
});

export const persistor = persistStore(store);
