import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  brand: '',
  rentalPrice: '',
  minMileage: '',
  maxMileage: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setBrand(state, action) {
      state.brand = action.payload;
    },
    setRentalPrice(state, action) {
      state.rentalPrice = action.payload;
    },
    setMinMileage(state, action) {
      state.minMileage = action.payload;
    },
    setMaxMileage(state, action) {
      state.maxMileage = action.payload;
    },
    resetFilters(state) {
      state.brand = '';
      state.rentalPrice = '';
      state.minMileage = '';
      state.maxMileage = '';
    },
  },
});

export const { setBrand, setRentalPrice, setMinMileage, setMaxMileage, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
