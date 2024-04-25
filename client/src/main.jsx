import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import App from '@/App';

import { FetchContextProvider } from '@context/FetchContext';

import '@/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <FetchContextProvider>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </FetchContextProvider>
  </BrowserRouter>
);
