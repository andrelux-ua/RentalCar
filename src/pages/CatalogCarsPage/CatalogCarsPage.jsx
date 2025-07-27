import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCars, resetCars, incrementPage } from '../../redux/cars/carsSlice';
import { setFilters } from '../../redux/cars/filtersSlice';
import CarCard from '../../components/CarCard/CarCard.jsx';
import FilterBar from '../../components/FilterBar/FilterBar';

import Loader from '../../components/Loader/Loader';
import toast from 'react-hot-toast';
import css from './CatalogCarsPage.module.css';
import '../../index.css';

const CatalogCarsPage = () => {
  const dispatch = useDispatch();
  const { items, page, totalPages, isLoading } = useSelector(
    state => state.cars
  );
  const filters = useSelector(state => state.filters);

  // useEffect(() => {
  //   dispatch(resetCars()); // очищаємо при першому завантаженні або зміні фільтрів
  //   dispatch(getCars({ filters, page: 1 }));
  // }, [filters]);

  useEffect(() => {
    const loadData = async () => {
      try {
        dispatch(resetCars());
        await dispatch(getCars({ filters, page: 1 })).unwrap();
      } catch (err) {
        toast.error('Failed to load cars');
      }
    };
    loadData();
  }, [filters]);

  const handleLoadMore = () => {
    dispatch(incrementPage());
    dispatch(getCars({ filters, page: page + 1 }));
  };

  return (
    <>
      <section className={css.sectionCatalogCar}>
        <div className="container">
          <h1 className="visually-hidden">Catalog Car </h1>
          <FilterBar />
          {isLoading && <Loader />}
          <ul className={css.list}>
            {items.map(car => (
              <CarCard key={car.id} car={car} />
            ))}
          </ul>

          {page < totalPages && (
            <button onClick={handleLoadMore}>Load More</button>
          )}
        </div>
      </section>
    </>
  );
};

export default CatalogCarsPage;
