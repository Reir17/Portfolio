import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Komponen Header
const Header = ({ heroText, isAdminLoggedIn, handleAdminLogout }) => {
  const navigate = useNavigate();

  // Debugging log: Lihat nilai isAdminLoggedIn yang diterima oleh Header
  console.log('Header.js: isAdminLoggedIn prop received:', isAdminLoggedIn);

  const handleDashboardClick = () => {
    navigate('/dashboard');
  };

  const handleLoginClick = () => {
    navigate('/admin');
  };

  return (
    <header className="bg-gradient-to-r from-gray-900 to-indigo-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Nama/Logo Situs */}
        <Link to="/" className="text-3xl font-bold tracking-tight hover:text-indigo-300 transition-colors duration-300">
          {heroText.name || 'Your Portfolio'}
        </Link>

        {/* Navigasi Utama */}
        <nav className="space-x-6 text-lg flex items-center">
          <Link to="/" className="hover:text-indigo-300 transition-colors duration-300 font-medium text-indigo-100">Beranda</Link>
          <Link to="/articles" className="hover:text-indigo-300 transition-colors duration-300 font-medium text-indigo-100">Artikel</Link>
          <Link to="/contact" className="hover:text-indigo-300 transition-colors duration-300 font-medium text-indigo-100">Kontak</Link>

          {/* Tombol Admin/Dashboard/Logout */}
          {/* Logika rendering tombol berdasarkan isAdminLoggedIn prop */}
          {isAdminLoggedIn ? (
            <>
              <button
                onClick={handleDashboardClick}
                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300"
              >
                Dashboard
              </button>
              <button
                onClick={handleAdminLogout}
                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 transition-colors duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={handleLoginClick}
              className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-transparent hover:bg-green-700 transition-colors duration-300"
            >
              Admin Login
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
