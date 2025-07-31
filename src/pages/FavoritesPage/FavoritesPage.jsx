import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import CarCard from '../../components/CarCard/CarCard';
import styles from './FavoritesPage.module.css';
import { selectFavoriteItems } from '../../redux/selectors/favoritesSelectors';

const FavoritesPage = () => {
  const favoriteCars = useSelector(selectFavoriteItems);
  const location = useLocation();
  const navigate = useNavigate();

  const goBack = () => {
    if (location.state?.from) {
      navigate(location.state.from);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="container">
      <div className={styles.navigationHeader}>
        <button onClick={goBack} className={styles.backButton} type="button">
          Назад
        </button>
      </div>
      <h1>Улюблені авто</h1>
      {favoriteCars.length === 0 ? (
        <p>У вас ще немає улюблених авто.</p>
      ) : (
        <ul className={styles.favoritesGrid}>
          {favoriteCars.map(car => (
            <li key={car.id}>
              <CarCard car={car} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoritesPage;
