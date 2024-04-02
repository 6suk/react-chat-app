import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Auth from './pages/Auth';
import Chat from './pages/Chat';

export default function App() {
  return (
    <>
      <div className="flex h-screen items-center justify-center p-4">
        <Routes>
          <Route path="/" element={<Chat />} />
          <Route path="/login" element={<Auth />} />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}
