import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite(state, action) {
      const car = action.payload;
      if (!car || !car.id) return;
      if (!Array.isArray(state.items)) state.items = [];
      const index = state.items.findIndex(item => item.id === car.id);
      if (index !== -1) {
        state.items.splice(index, 1);
      } else {
        state.items.push(car);
      }
    },
    resetFavorites(state) {
      state.items = [];
    },
    setFavorites(state, action) {
      state.items = Array.isArray(action.payload) ? action.payload : [];
    },
  },
});

export const { toggleFavorite, resetFavorites, setFavorites } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;
