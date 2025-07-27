import { useSelector } from 'react-redux';
import CarCard from '../../components/CarCard/CarCard';

const FavoritesPage = () => {
  const favorites = useSelector(state => state.favorites);

  return (
    <div className="container">
      <h1>Favorite Cars</h1>
      {favorites.length === 0 ? (
        <p>No favorite cars yet.</p>
      ) : (
        <ul>
          {favorites.map(car => (
            <CarCard key={car.id} car={car} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoritesPage;
