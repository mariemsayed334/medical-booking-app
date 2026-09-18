import { Suspense, lazy, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import LoadingState from './components/LoadingState';

const Doctors = lazy(() => import('./pages/Doctors'));
const DoctorDetails = lazy(() => import('./pages/DoctorDetails'));
const BookAppointment = lazy(() => import('./pages/BookAppointment'));
const Appointments = lazy(() => import('./pages/Appointments'));
const Profile = lazy(() => import('./pages/Profile'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('mediBook-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return savedTheme || (prefersDark ? 'dark' : 'light');
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('mediBook-theme', theme);
  }, [theme]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar theme={theme} toggleTheme={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))} />
      <main className="flex-1">
        <Suspense fallback={<LoadingState label="Loading page..." />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/doctors/:id" element={<DoctorDetails />} />
            <Route path="/book/:doctorId" element={<BookAppointment />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
