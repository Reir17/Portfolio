import React from 'react';

// Komponen Navbar untuk navigasi antar halaman
function Navbar({ setCurrentPage, isAdminLoggedIn, handleLogout }) {
  // Fungsi untuk scroll halus ke bagian tertentu di Home.js
  // Fungsi ini tetap ada karena halaman Home mungkin memiliki bagian yang bisa di-scroll.
  // Namun, tombol-tombol spesifik untuk section tersebut tidak lagi di Navbar utama.
  const scrollToSection = (id) => {
    // Hanya scroll jika berada di halaman home
    if (window.location.pathname === '/') {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Jika tidak di home, navigasi ke home dan kemudian scroll
      setCurrentPage('home');
      // Beri sedikit waktu untuk render, lalu scroll
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <nav className="bg-gray-800 p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo/Nama Website */}
        <div className="text-white text-2xl font-bold cursor-pointer hover:text-indigo-300 transition duration-300" onClick={() => setCurrentPage('home')}>
          MyPortfolio
        </div>

        {/* Navigasi Utama */}
        <ul className="flex space-x-6">
          <li>
            <button
              onClick={() => setCurrentPage('home')}
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300"
            >
              Home
            </button>
          </li>
          <li>
            <button
              onClick={() => setCurrentPage('article')}
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300"
            >
              Article
            </button>
          </li>
          <li>
            <button
              onClick={() => setCurrentPage('contact')}
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300"
            >
              Contact
            </button>
          </li>

          {/* Tombol Admin Login/Logout */}
          {isAdminLoggedIn ? (
            <>
              <li>
                <button
                  onClick={() => setCurrentPage('dashboard')}
                  className="text-yellow-300 hover:text-yellow-100 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                >
                  Dashboard Admin
                </button>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 rounded"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <button
                onClick={() => setCurrentPage('login')}
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300"
              >
                Login Admin
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
