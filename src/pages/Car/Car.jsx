import { useParams, useNavigate, NavLink, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCarById } from '../../redux/cars/carsSlice';
import { selectSelectedCar, selectIsLoading } from '../../redux/selectors/carsSelectors';
import { BsChevronLeft, BsBookmarkHeart, BsCalendar, BsCarFront, BsFuelPump, BsGear, BsSpeedometer2 } from 'react-icons/bs';
import { FaCheck } from 'react-icons/fa';
import BookingForm from '../../components/BookingForm/BookingForm';
import { formatMileage } from '../../utils/formatters';
import styles from './Car.module.css';

const Car = () => {
  const { id: carId } = useParams();
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const selectedCar = useSelector(selectSelectedCar);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    if (carId) {
      dispatch(getCarById(carId));
    }
  }, [carId, dispatch]);

  if (isLoading) {
    return <p className={styles.loadingText}>Завантаження...</p>;
  }

  if (!selectedCar) {
    return <p className={styles.loadingText}>Авто не знайдено</p>;
  }

  const {
    brand,
    model,
    year,
    address,
    mileage,
    rentalPrice,
    description,
    rentalConditions,
    type,
    fuelConsumption,
    engineSize,
    accessories,
    functionalities,
    img,
    rentalCompany,
  } = selectedCar;

  const formattedMileage = formatMileage(mileage);
  const formattedLocation = address.split(', ').slice(1).join(', ');

  return (
    <section className={styles.carDetailsSection}>
      <div className={styles.pageWrapper}>
        {/* Navigation header */}
        <div className={styles.navigationHeader}>
          <Link to="/catalog" className={styles.backNavigationLink}>
            <BsChevronLeft size={24} />
          </Link>
          <NavLink to="/favorites" className={styles.favoritesLink}>
            <BsBookmarkHeart size={24} />
          </NavLink>
        </div>

        {/* Main content */}
        <div className={styles.carContentWrapper}>
          {/* Left column - Image */}
          <div className={styles.leftColumn}>
            <div className={styles.carImageContainer}>
              <img src={img} alt={`${brand} ${model}`} className={styles.carImage} />
            </div>
          </div>

          {/* Right column - Car details */}
          <div className={styles.rightColumn}>
            {/* Car header with title and location */}
            <div className={styles.carHeader}>
              <h1 className={styles.carTitle}>
                {brand} <span className={styles.modelHighlight}>{model}</span>, {year}
              </h1>
              <p className={styles.carLocation}>{formattedLocation}</p>
            </div>

            {/* Car specifications */}
            <div className={styles.carSpecsContainer}>
              <h3 className={styles.specsTitle}>Car Specifications</h3>
              <div className={styles.specsList}>
                <div className={styles.specItem}>
                  <BsCalendar className={styles.specIcon} />
                  <span className={styles.specLabel}>Year:</span>
                  <span className={styles.specValue}>{year}</span>
                </div>
                <div className={styles.specItem}>
                  <BsCarFront className={styles.specIcon} />
                  <span className={styles.specLabel}>Type:</span>
                  <span className={styles.specValue}>{type}</span>
                </div>
                <div className={styles.specItem}>
                  <BsSpeedometer2 className={styles.specIcon} />
                  <span className={styles.specLabel}>Mileage:</span>
                  <span className={styles.specValue}>{formattedMileage} km</span>
                </div>
                <div className={styles.specItem}>
                  <BsFuelPump className={styles.specIcon} />
                  <span className={styles.specLabel}>Fuel Consumption:</span>
                  <span className={styles.specValue}>{fuelConsumption}</span>
                </div>
                <div className={styles.specItem}>
                  <BsGear className={styles.specIcon} />
                  <span className={styles.specLabel}>Engine Size:</span>
                  <span className={styles.specValue}>{engineSize}</span>
                </div>
              </div>
            </div>

            {/* Car description */}
            <div className={styles.carDescription}>
              <h3>Description</h3>
              <p>{description}</p>
            </div>

            {/* Accessories and functionalities */}
            <div className={styles.accessoriesSection}>
              <h3>Accessories and functionalities</h3>
              <div className={styles.accessoriesList}>
                {accessories.map((accessory, index) => (
                  <span key={index} className={styles.accessoryItem}>
                    <FaCheck className={styles.checkIcon} />
                    {accessory}
                  </span>
                ))}
              </div>
              <div className={styles.functionalitiesList}>
                {functionalities.map((functionality, index) => (
                  <span key={index} className={styles.functionalityItem}>
                    <FaCheck className={styles.checkIcon} />
                    {functionality}
                  </span>
                ))}
              </div>
            </div>

            {/* Rental conditions */}
            <div className={styles.rentalConditions}>
              <h3>Rental Conditions</h3>
              <ul className={styles.conditionsList}>
                {rentalConditions.map((condition, index) => (
                  <li key={index} className={styles.conditionItem}>
                    <FaCheck className={styles.checkIcon} />
                    {condition}
                  </li>
                ))}
              </ul>
            </div>

            {/* Rental price section */}
            <div className={styles.rentalPriceSection}>
              <span className={styles.rentalPrice}>${rentalPrice}</span>
              <span className={styles.rentalCompany}>{rentalCompany}</span>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <BookingForm car={selectedCar} />
      </div>
    </section>
  );
};

export default Car;
