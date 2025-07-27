import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    brand: '',
    rentalPrice: '',
    minMileage: '',
    maxMileage: '',
  },
  reducers: {
    setFilters: (state, { payload }) => {
      return { ...state, ...payload };
    },
    resetFilters: () => ({
      brand: '',
      rentalPrice: '',
      minMileage: '',
      maxMileage: '',
    }),
  },
});

export const { setFilters, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
