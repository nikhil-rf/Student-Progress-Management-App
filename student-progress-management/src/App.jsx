import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import StudentPage from './pages/StudentPage';
import Header from './components/Header';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/student/:id" element={<StudentPage />} />
      </Routes>
    </div>
  );
}
