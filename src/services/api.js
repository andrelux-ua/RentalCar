import axios from 'axios';

const BASE_URL = 'https://car-rental-api.goit.global';

export const fetchCars = async (filters = {}, page = 1, limit = 8) => {
  const params = {
    ...filters,
    page,
    limit,
  };

  const response = await axios.get(`${BASE_URL}/cars`, { params });
  return response.data;
};

export const fetchCarById = async id => {
  const response = await axios.get(`${BASE_URL}/cars/${id}`);
  return response.data;
};
