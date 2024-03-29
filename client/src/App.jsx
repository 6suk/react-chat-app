import { Route, Routes } from 'react-router-dom';
import Init from './pages/Init';
import Container from './components/common/Container';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Init />} />
      </Routes>
    </>
  );
}
