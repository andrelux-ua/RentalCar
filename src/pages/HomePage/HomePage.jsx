import css from './HomePage.module.css';
import ButtonLink from '../../components/ButtonLink/ButtonLink.jsx';
import '../../index.css';

const HomePage = () => {
  return (
    <>
      <section className={css.sectionElementImg}>
        <div className={`${css.homePageContainer} container`}>
          <h1 className={css.title}>Find your perfect rental car</h1>
          <p className={css.pg}>
            Reliable and budget-friendly rentals for any journey
          </p>
          <ButtonLink className={css.btn}>View Catalog</ButtonLink>
        </div>
      </section>
    </>
  );
};

export default HomePage;
