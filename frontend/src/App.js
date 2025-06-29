import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';

import axios from 'axios';

// Import komponen-komponen utama Anda
import Layout from './components/Layout';
import Home from './components/Home';
import Article from './components/Article';
import Contact from './components/Contact';
import AdminLogin from './components/AdminLogin';
import Dashboard from './components/Dashboard';

function App() {
  const navigate = useNavigate();

  const [heroText, setHeroText] = useState({
    name: '',
    role_text: '',
    main_title: '',
    year_text: '',
    email: '',
    social_linkedin: '',
    social_github: '',
    social_instagram: ''
  });
  const [loadingHeroText, setLoadingHeroText] = useState(true);
  const [heroTextError, setHeroTextError] = useState(null);

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  const API_BASE_URL = 'http://localhost:3001/api';

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const heroResponse = await axios.get(`${API_BASE_URL}/hero`);
        const fetchedHeroText = {
          name: heroResponse.data.name || '',
          role_text: heroResponse.data.role_text || '',
          main_title: heroResponse.data.main_title || '',
          year_text: heroResponse.data.year_text || '',
          email: heroResponse.data.email || '',
          social_linkedin: heroResponse.data.social_linkedin || '',
          social_github: heroResponse.data.social_github || '',
          social_instagram: heroResponse.data.social_instagram || ''
        };
        setHeroText(fetchedHeroText);
        // Debugging log: Lihat heroText setelah diambil di App.js
        console.log('App.js: Fetched heroText from API:', fetchedHeroText);

      } catch (err) {
        console.error("App.js: Failed to fetch hero text:", err);
        setHeroTextError("Gagal memuat data utama. Pastikan backend berjalan.");
      } finally {
        setLoadingHeroText(false);
      }

      const loggedInStatus = localStorage.getItem('isAdminLoggedIn') === 'true';
      setIsAdminLoggedIn(loggedInStatus);
      setIsAuthChecked(true);
      console.log('App.js: Auth check complete. isAdminLoggedIn:', loggedInStatus);
    };

    fetchInitialData();
  }, []);

  const handleAdminLogin = (success) => {
    setIsAdminLoggedIn(success);
    if (success) {
      localStorage.setItem('isAdminLoggedIn', 'true');
      navigate('/dashboard');
    } else {
      localStorage.removeItem('isAdminLoggedIn');
      console.error('Login failed.');
    }
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('isAdminLoggedIn');
    navigate('/');
  };

  const ProtectedRoute = ({ children }) => {
    if (!isAuthChecked) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-gray-100 text-gray-800">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-500 border-solid"></div>
          <p className="mt-4 text-lg">Memverifikasi status login...</p>
        </div>
      );
    }
    if (!isAdminLoggedIn) {
      return <Navigate to="/admin" replace />;
    }
    return children;
  };

  if (loadingHeroText || !isAuthChecked) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-500 border-solid"></div>
        <p className="mt-4 text-lg">Memuat aplikasi dan memverifikasi status login...</p>
      </div>
    );
  }

  if (heroTextError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-red-100 text-red-800 p-4">
        <p className="text-xl font-bold">Terjadi Kesalahan Fatal:</p>
        <p className="mt-2 text-center">{heroTextError}</p>
        <p className="mt-4">Aplikasi tidak dapat dimuat. Mohon pastikan server backend berjalan dan dapat diakses.</p>
      </div>
    );
  }

  return (
    <Layout
      heroText={heroText}
      isAdminLoggedIn={isAdminLoggedIn}
      handleAdminLogout={handleAdminLogout}
    >
      <Routes>
        <Route path="/" element={<Home heroText={heroText} />} />
        <Route path="/articles" element={<Article heroText={heroText} />} />
        <Route path="/contact" element={<Contact heroText={heroText} />} />
        <Route path="/admin" element={<AdminLogin onLogin={handleAdminLogin} />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Home heroText={heroText} />} />
      </Routes>
    </Layout>
  );
}

export default App;
