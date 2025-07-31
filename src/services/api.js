// src/services/api.js

const BASE_URL = 'https://car-rental-api.goit.global';

// Функція для створення URL з параметрами
const buildUrl = (endpoint, params = {}) => {
  const url = new URL(`${BASE_URL}${endpoint}`);
  Object.keys(params).forEach(key => {
    if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
      url.searchParams.append(key, params[key]);
    }
  });
  return url.toString();
};

// Отримання списку авто з фільтрами
export const fetchCars = async (params = {}) => {
  try {
    const url = buildUrl('/cars', params);
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data; // { cars: [...], totalCars: N, page: N, totalPages: N }
  } catch (error) {
    console.error('Error fetching cars:', error);
    throw new Error('Failed to fetch cars');
  }
};

// Отримання авто за ID
export const fetchCarById = async (id) => {
  try {
    const url = buildUrl(`/cars/${id}`);
    const response = await fetch(url);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Car not found');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching car by id:', error);
    throw error;
  }
};

// Отримання списку брендів
export const fetchBrands = async () => {
  try {
    const url = buildUrl('/brands');
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data; // масив брендів
  } catch (error) {
    console.error('Error fetching brands:', error);
    throw new Error('Failed to fetch brands');
  }
};
