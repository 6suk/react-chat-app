import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx';
import { AuthContextProvider } from './context/AuthContext.jsx';
import { SocketContextProvider } from './context/SocketContext.jsx';

import './global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthContextProvider>
      <SocketContextProvider>
        <App />
      </SocketContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
