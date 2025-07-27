import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: [],
  reducers: {
    toggleFavorite(state, { payload }) {
      const isExist = state.find(car => car.id === payload.id);
      if (isExist) {
        return state.filter(car => car.id !== payload.id);
      } else {
        return [...state, payload];
      }
    },
    resetFavorites: () => [],
  },
});

export const { toggleFavorite, resetFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
