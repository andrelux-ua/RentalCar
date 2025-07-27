import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import ScrollToTop from '../ScrollToTop/ScrollToTop.jsx';
import AppBar from '../AppBar/AppBar.jsx';
import NotFound from '../../pages/NotFoundPage/NotFoundPage.jsx';
import css from './App.module.css';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage.jsx'));
const CatalogCarsPage = lazy(() =>
  import('../../pages/CatalogCarsPage/CatalogCarsPage.jsx')
);
const Car = lazy(() => import('../../pages/Car/Car.jsx'));
const FavoritesPage = lazy(() =>
  import('../../pages/FavoritesPage/FavoritesPage.jsx')
);

function App() {
  return (
    <>
      <div className={css.appWrapper}>
        <AppBar />
        <Suspense fallback={<div>Loading page...</div>}>
          <main className={css.mainContent}>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/catalog" element={<CatalogCarsPage />} />
              <Route path="/car/:id" element={<Car />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </Suspense>
      </div>
    </>
  );
}

export default App;
