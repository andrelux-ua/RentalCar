// redux/cars/carsSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCars, fetchCarById, fetchBrands } from '../../services/api';

export const getCars = createAsyncThunk(
  'cars/getCars',
  async ({ filters, page }, thunkAPI) => {
    try {
      const data = await fetchCars({ ...filters, page });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getCarById = createAsyncThunk(
  'cars/getCarById',
  async (id, { rejectWithValue }) => {
    try {
      const data = await fetchCarById(id);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getBrands = createAsyncThunk(
  'cars/getBrands',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchBrands();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
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
    brands: [],
    selectedCar: null,
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
        
        if (action.payload.page === 1) {
          // Перша сторінка - замінюємо список
          state.items = action.payload.cars;
        } else {
          // Наступні сторінки - додаємо до списку
          state.items = [...state.items, ...action.payload.cars];
        }
      })
      .addCase(getCars.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getCarById.fulfilled, (state, action) => {
        state.selectedCar = action.payload;
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        state.brands = action.payload;
      });
  },
});

export const { resetCars, incrementPage } = carsSlice.actions;
export default carsSlice.reducer;
