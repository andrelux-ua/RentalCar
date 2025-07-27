import LogoPage from '../LogoPage/LogoPage.jsx';
import Navigation from '../Navigation/Navigation';
import css from './AppBar.module.css';

const AppBar = () => {
  return (
    <header className={css.header}>
      <div className={`${css.headerContainer} container`}>
        <LogoPage />
        <Navigation />
      </div>
    </header>
  );
};

export default AppBar;
