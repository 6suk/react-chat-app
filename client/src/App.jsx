import { Helmet } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { Navigate, Route, Routes } from 'react-router-dom';

import { useAuthUser } from '@store/index';

import Auth from '@pages/Auth';
import Home from '@pages/Home';

export default function App() {
  const authUser = useAuthUser();

  return (
    <>
      <Helmet>
        <title>@6suk/chat</title>
        <meta
          name="description"
          content="Socket.IO를 활용한 React 실시간 채팅 웹 애플리케이션입니다."
        />
        <meta property="og:title" content="@6suk/chat" />
        <meta property="og:type" content="website" />
      </Helmet>

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
