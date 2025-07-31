// src/redux/store.js

import { configureStore, combineReducers } from '@reduxjs/toolkit';
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
import storage from 'redux-persist/lib/storage'; // Використовуємо localStorage за замовчуванням

import carsReducer from './cars/carsSlice';
import { favoritesReducer } from './cars/favoritesSlice';
import filtersReducer from './cars/filtersSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['favorites'], // Зберігаємо лише 'favorites'
};

const rootReducer = combineReducers({
  cars: carsReducer,
  favorites: favoritesReducer,
  filters: filtersReducer,
});

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
