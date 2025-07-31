import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCars, getBrands, incrementPage, resetCars } from '../../redux/cars/carsSlice';
import {
  selectCars,
  selectIsLoading,
  selectPage,
  selectTotalPages,
  selectBrands,
} from '../../redux/selectors/carsSelectors';
import { selectBrand, selectRentalPrice, selectMinMileage, selectMaxMileage } from '../../redux/selectors/carsSelectors';

import CarCard from '../../components/CarCard/CarCard';
import FilterBar from '../../components/FilterBar/FilterBar';
import Loader from '../../components/Loader/Loader';
import styles from './CatalogCarsPage.module.css';

const CatalogCarsPage = () => {
  const dispatch = useDispatch();
  const cars = useSelector(selectCars);
  const isLoading = useSelector(selectIsLoading);
  const page = useSelector(selectPage);
  const totalPages = useSelector(selectTotalPages);
  const brands = useSelector(selectBrands);
  
  // Фільтри
  const brand = useSelector(selectBrand);
  const rentalPrice = useSelector(selectRentalPrice);
  const minMileage = useSelector(selectMinMileage);
  const maxMileage = useSelector(selectMaxMileage);

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      if (cars.length === 0) {
        dispatch(getCars({ filters: {}, page: 1 }));
      }
      if (brands.length === 0) {
        dispatch(getBrands());
      }
      isFirstRender.current = false;
    }
  }, [dispatch, cars.length, brands.length]);

  const handleLoadMore = () => {
    if (isLoading) return;
    if (page >= totalPages) return;
    
    dispatch(incrementPage());
    dispatch(getCars({ 
      filters: { brand, rentalPrice, minMileage, maxMileage },
      page: page + 1 
    }));
  };

  return (
    <section className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>Каталог авто</h1>

      <div className={styles.catalogWrapper}>
        <FilterBar />

        {!cars || cars.length === 0 ? (
          <p style={{ color: 'red' }}>Авто не завантажено!</p>
        ) : (
          <ul className={styles.cardsGrid}>
            {cars.map(car => (
              <li key={car.id}>
                <CarCard car={car} />
              </li>
            ))}
          </ul>
        )}
      </div>

      {isLoading && <Loader />}

      {cars.length > 0 &&
        !isLoading &&
        totalPages &&
        page < totalPages && (
          <button className={styles.loadMoreButton} onClick={handleLoadMore}>
            Завантажити ще
          </button>
        )}
    </section>
  );
};

export default CatalogCarsPage;
