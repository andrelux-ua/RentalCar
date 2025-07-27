import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import css from './Navigation.module.css';

const getLinkStyles = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const Navigation = () => {
  return (
    <nav className={css.navigation}>
      <NavLink to="/" className={getLinkStyles}>
        Home
      </NavLink>
      <NavLink to="/catalog" className={getLinkStyles}>
        Catalog
      </NavLink>
    </nav>
  );
};

export default Navigation;
