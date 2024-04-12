import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from '@/App';

import { FetchContextProvider } from '@context/FetchContext';

import '@/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <FetchContextProvider>
      <App />
    </FetchContextProvider>
  </BrowserRouter>
);
