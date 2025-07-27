import { Link } from 'react-router-dom';
import css from './ButtonLink.module.css';

const ButtonLink = () => {
  return (
    <Link to="/catalog" className={css.catalogButton}>
      View Catalog
    </Link>
  );
};

export default ButtonLink;
