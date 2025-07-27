import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import carsReducer from './cars/carsSlice';
import filtersReducer from './cars/filtersSlice';
import favoritesReducer from './cars/favoritesSlice';

const rootReducer = combineReducers({
  cars: carsReducer,
  filters: filtersReducer,
  favorites: favoritesReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cars', 'favorites'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
