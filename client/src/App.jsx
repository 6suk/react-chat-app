import { Toaster } from 'react-hot-toast';
import { Navigate, Route, Routes } from 'react-router-dom';

import { useAuthUser } from '@store/index';

import Auth from '@pages/Auth';
import Home from '@pages/Home';

export default function App() {
  const authUser = useAuthUser();

  return (
    <>
      <div className="flex h-screen items-center justify-center p-4">
        <Routes>
          <Route
            path="/"
            element={authUser ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!authUser ? <Auth /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
      <Toaster />
    </>
  );
}
