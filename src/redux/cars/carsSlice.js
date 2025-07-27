import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCars } from '../../services/api';

export const getCars = createAsyncThunk(
  'cars/getCars',
  async ({ filters, page }, thunkAPI) => {
    try {
      const data = await fetchCars(filters, page);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const carsSlice = createSlice({
  name: 'cars',
  initialState: {
    items: [],
    total: 0,
    page: 1,
    totalPages: 1,
    isLoading: false,
    error: null,
  },
  reducers: {
    resetCars(state) {
      state.items = [];
      state.page = 1;
    },
    incrementPage(state) {
      state.page += 1;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getCars.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCars.fulfilled, (state, action) => {
        state.isLoading = false;
        state.total = action.payload.totalCars;
        state.totalPages = action.payload.totalPages;
        state.items = [...state.items, ...action.payload.cars];
      })
      .addCase(getCars.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetCars, incrementPage } = carsSlice.actions;
export default carsSlice.reducer;
