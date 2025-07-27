import { Link } from 'react-router-dom';
import logoRentalCar from '../../assets/images/logoRentalCar.svg';
function LogoPage() {
  return (
    <>
      <Link to="/" style={{ padding: '24px 0' }}>
        <img src={logoRentalCar} alt="Car rental logo" width="104" />
      </Link>
    </>
  );
}

export default LogoPage;
