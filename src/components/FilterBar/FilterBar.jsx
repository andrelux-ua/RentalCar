import { useDispatch, useSelector } from 'react-redux';
import { setBrand, setRentalPrice, setMinMileage, setMaxMileage, resetFilters } from '../../redux/cars/filtersSlice';
import { selectBrand, selectRentalPrice, selectMinMileage, selectMaxMileage, selectBrands } from '../../redux/selectors/carsSelectors';
import { getCars, resetCars } from '../../redux/cars/carsSlice';
import styles from './FilterBar.module.css';

const FilterBar = () => {
  const dispatch = useDispatch();
  
  // Поточні значення фільтрів
  const brand = useSelector(selectBrand);
  const rentalPrice = useSelector(selectRentalPrice);
  const minMileage = useSelector(selectMinMileage);
  const maxMileage = useSelector(selectMaxMileage);
  const brands = useSelector(selectBrands);

  const handleBrandChange = (e) => {
    dispatch(setBrand(e.target.value));
  };

  const handleRentalPriceChange = (e) => {
    dispatch(setRentalPrice(e.target.value));
  };

  const handleMinMileageChange = (e) => {
    dispatch(setMinMileage(e.target.value));
  };

  const handleMaxMileageChange = (e) => {
    dispatch(setMaxMileage(e.target.value));
  };

  const handleSearch = () => {
    dispatch(resetCars());
    dispatch(getCars({
      filters: { brand, rentalPrice, minMileage, maxMileage },
      page: 1,
    }));
  };

  const handleReset = () => {
    dispatch(resetFilters());
    dispatch(resetCars());
    dispatch(getCars({ filters: {}, page: 1 }));
  };

  return (
    <div className={styles.filterBar}>
      <div className={styles.filterGroup}>
        <label htmlFor="brand" className={styles.filterLabel}>
          Бренд
        </label>
        <select
          id="brand"
          value={brand}
          onChange={handleBrandChange}
          className={styles.filterSelect}
        >
          <option value="">Всі бренди</option>
          {brands.map((brandName) => (
            <option key={brandName} value={brandName}>
              {brandName}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label htmlFor="rentalPrice" className={styles.filterLabel}>
          Ціна за годину
        </label>
        <select
          id="rentalPrice"
          value={rentalPrice}
          onChange={handleRentalPriceChange}
          className={styles.filterSelect}
        >
          <option value="">Будь-яка ціна</option>
          <option value="10">$10</option>
          <option value="20">$20</option>
          <option value="30">$30</option>
          <option value="40">$40</option>
          <option value="50">$50</option>
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label htmlFor="minMileage" className={styles.filterLabel}>
          Мін. пробіг
        </label>
        <input
          type="number"
          id="minMileage"
          value={minMileage}
          onChange={handleMinMileageChange}
          placeholder="Мін. пробіг"
          className={styles.filterInput}
        />
      </div>

      <div className={styles.filterGroup}>
        <label htmlFor="maxMileage" className={styles.filterLabel}>
          Макс. пробіг
        </label>
        <input
          type="number"
          id="maxMileage"
          value={maxMileage}
          onChange={handleMaxMileageChange}
          placeholder="Макс. пробіг"
          className={styles.filterInput}
        />
      </div>

      <div className={styles.filterActions}>
        <button onClick={handleSearch} className={styles.searchButton}>
          Пошук
        </button>
        <button onClick={handleReset} className={styles.resetButton}>
          Скинути
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
