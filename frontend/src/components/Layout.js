import React from 'react';
import Header from './Header';
import Footer from './Footer'; // Pastikan Footer diimpor

const Layout = ({ children, heroText, isAdminLoggedIn, handleAdminLogout }) => {
  // Debugging log: Lihat heroText yang diterima oleh Layout
  console.log('Layout.js: heroText received:', heroText);

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        heroText={heroText}
        isAdminLoggedIn={isAdminLoggedIn}
        handleAdminLogout={handleAdminLogout}
      />

      <main className="flex-grow">
        {children}
      </main>

      {/* Meneruskan heroText ke komponen Footer */}
      <Footer heroText={heroText} />
    </div>
  );
};

export default Layout;
