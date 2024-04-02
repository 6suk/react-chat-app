import { Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Auth from './pages/Auth';
import Chat from './pages/Chat';
import { useAuthContext } from './context/AuthContext';

export default function App() {
  const { authUser } = useAuthContext();

  return (
    <>
      <div className="flex h-screen items-center justify-center p-4">
        <Routes>
          <Route
            path="/"
            element={authUser ? <Chat /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!authUser ? <Auth /> : <Navigate to="/" />}
          />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}
