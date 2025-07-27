import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchCarById } from '../../services/api';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import toast from 'react-hot-toast';
import BookingForm from '../../components/BookingForm/BookingForm';
import css from './Car.module.css';
import { BsChevronLeft, BsBookmarkHeart } from 'react-icons/bs';
import PageFade from '../../components/PageFade/PageFade';

const formatMileage = km => km.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

const Car = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);

  useEffect(() => {
    const loadCar = async () => {
      try {
        const data = await fetchCarById(id);
        setCar(data);
      } catch (error) {
        toast.error('Car not found');
      }
    };

    loadCar();
  }, [id]);

  if (!car) return <p>Loading...</p>;

  return (
    <PageFade>
      <section className={css.section}>
        <div className={`${css.container} container`}>
          <div className={css.navLink}>
            <Link to="/catalog" className={css.backLink}>
              <BsChevronLeft size={24} />
            </Link>
            <NavLink to="/favorites">
              <BsBookmarkHeart size={24} color="#3470ff" />
            </NavLink>
          </div>

          <div className={css.infoBlock}>
            <img src={car.img} alt={car.model} className={css.image} />

            <h2 className={css.title}>
              {car.brand} {car.model}
            </h2>

            <div className={css.characteristics}>
              <p>
                <strong>Year:</strong> {car.year}
              </p>
              <p>
                <strong>Type:</strong> {car.type}
              </p>
              <p>
                <strong>Fuel consumption:</strong> {car.fuelConsumption} L/100km
              </p>
              <p>
                <strong>Engine:</strong> {car.engineSize}
              </p>
              <p>
                <strong>Mileage:</strong> {formatMileage(car.mileage)} km
              </p>
              <p>
                <strong>Price:</strong> ${car.rentalPrice}
              </p>
            </div>

            <div className={css.description}>
              <h3>Description</h3>
              <p>{car.description}</p>
            </div>

            <div className={css.sectionList}>
              <h3>Accessories</h3>
              <ul>
                {car.accessories?.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className={css.sectionList}>
              <h3>Functionalities</h3>
              <ul>
                {car.functionalities?.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className={css.sectionList}>
              <h3>Rental Conditions</h3>
              <ul>
                {car.rentalConditions?.map(cond => (
                  <li key={cond}>{cond}</li>
                ))}
              </ul>
            </div>

            <p>
              <strong>Address:</strong> {car.address}
            </p>
            <p>
              <strong>Company:</strong> {car.rentalCompany}
            </p>
          </div>

          <BookingForm />
        </div>
      </section>
    </PageFade>
  );
};

export default Car;

