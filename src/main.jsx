import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
// import { store, persistor } from './redux/store';
// import { Toaster } from 'react-hot-toast';
import App from './components/App/App.jsx';
import 'modern-normalize';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Provider> */}
    {/* <PersistGate> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {/* <Toaster position="top-right" reverseOrder={false} /> */}
    {/* </PersistGate> */}
    {/* </Provider> */}
  </StrictMode>
);
