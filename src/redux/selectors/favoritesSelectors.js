export const selectFavoriteItems = state => {
  if (!state.favorites || !Array.isArray(state.favorites.items)) return [];
  return state.favorites.items;
};

export const selectIsCarFavorite = (state, carId) =>
  selectFavoriteItems(state).some(car => car.id === carId);
