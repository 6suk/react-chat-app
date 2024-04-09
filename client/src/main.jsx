import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from '@/App';

import { AuthContextProvider } from '@context/AuthContext';
import { FetchContextProvider } from '@context/FetchContext';
import { SocketContextProvider } from '@context/SocketContext';

import '@/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthContextProvider>
      <SocketContextProvider>
        <FetchContextProvider>
          <App />
        </FetchContextProvider>
      </SocketContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
