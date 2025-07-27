import { Link } from 'react-router-dom';
import css from './CarCard.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../../redux/cars/favoritesSlice';

const formatMileage = km => km.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

const CarCard = ({ car }) => {
  const { id, img, brand, model, rentalPrice, mileage } = car;

  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites);
  const isFavorite = favorites.some(fav => fav.id === car.id);

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(car));
  };

  return (
    <li className={css.card}>
      <img
        src={car.img}
        alt={`${car.brand} ${car.model}`}
        className={css.image}
      />
      <div className={css.content}>
        <div className={css.titleRow}>
          <h3>
            {car.brand} {car.model}
          </h3>
          <p className={css.price}>${car.rentalPrice}</p>
        </div>
        <p className={css.mileage}>{formatMileage(car.mileage)} km</p>
        <div className={css.actions}>
          <Link to={`/car/${car.id}`} className={css.readMore}>
            Read more
          </Link>
          <button onClick={handleToggleFavorite} className={css.favoriteBtn}>
            {isFavorite ? 'Remove' : 'Add to Favorite'}
          </button>
        </div>
      </div>
    </li>
  );
};

export default CarCard;
