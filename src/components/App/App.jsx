import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import AppBar from '../AppBar/AppBar.jsx';
import NotFound from '../../pages/NotFoundPage/NotFoundPage.jsx';
import css from './App.module.css';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage.jsx'));
const CatalogCarsPage = lazy(() =>
  import('../../pages/CatalogCarsPage/CatalogCarsPage.jsx')
);
const Car = lazy(() => import('../../pages/Car/Car.jsx'));

function App() {
  return (
    <>
      <AppBar />
      <Suspense fallback={<div>Loading page...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogCarsPage />} />
          <Route path="/car/:id" element={<Car />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
