import { Link } from 'react-router-dom';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../../redux/cars/favoritesSlice';
// Імпортуємо мемоізований селектор
import { selectIsCarFavorite } from '../../redux/selectors/favoritesSelectors'; // Переконайтеся, що шлях правильний
import { formatMileage } from '../../utils/formatters';
import styles from './CarCard.module.css';

const CarCard = ({ car }) => {
  if (!car) return null;

  const {
    id = '',
    brand = '',
    model = '',
    year = '',
    type = '',
    mileage = 0,
    address = '',
    rentalPrice = '',
    rentalCompany = '',
    img = '',
  } = car;

  const dispatch = useDispatch();

  // Використовуємо мемоізований селектор selectIsCarFavorite
  // Він прийме `state` та `id` поточного автомобіля,
  // і поверне true/false, кешуючи результат.
  // Це запобіжить непотрібним ререндерам CarCard, якщо
  // список обраних змінюється, але статус isFavorite для *цього* car.id - ні.
  const isFavorite = useSelector(state => selectIsCarFavorite(state, id));

  const formattedLocation = address.split(', ').slice(1).join(', ');
  const formattedMileage = formatMileage(mileage);

  const handleFavoriteToggle = () => {
    dispatch(toggleFavorite(car));
  };

  return (
    <div className={styles.carCard}>
      <div className={styles.imageContainer}>
        <img src={img} alt={`${brand} ${model}`} className={styles.carImage} />
        <button
          onClick={handleFavoriteToggle}
          className={styles.favoriteButton}
          type="button"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? <span>❤️</span> : <span>🤍</span>}
        </button>
      </div>

      <div className={styles.carInfoSection}>
        <div className={styles.carTitleBlock}>
          <h3 className={styles.carName}>
            {brand}{' '}
            <span className={styles.modelHighlight}>
              {model}, {year}
            </span>
          </h3>
          <span className={styles.rentalPrice}>${rentalPrice}</span>
        </div>

        <div className={styles.carDetailsBlock}>
          <div className={styles.detailText}>
            <span>{formattedLocation}</span>
            <span className={styles.separator}>|</span>
            <span>{rentalCompany}</span>
          </div>
          <div className={styles.detailText}>
            <span>{type}</span>
            <span className={styles.separator}>|</span>
            <span>{formattedMileage} km</span>
          </div>
        </div>

        <Link to={`/car/${id}`} className={styles.readMoreButton}>
          Read more
        </Link>
      </div>
    </div>
  );
};

export default CarCard;
