import React from 'react';

// Footer sekarang menerima heroText secara langsung
const Footer = ({ heroText }) => {
  return (
    <footer className="text-center py-8 bg-gray-800 text-gray-300 mt-auto">
      <div className="container mx-auto px-4">
        <p>&copy; {new Date().getFullYear()} {heroText.name || 'Your Name'}. All rights reserved.</p>
        <p className="text-sm mt-1">Dibangun dengan React & Tailwind CSS.</p>

        <div className="flex justify-center space-x-6 mt-4">
          {/* Render link LinkedIn jika ada */}
          {heroText.social_linkedin && (
            <a
              href={heroText.social_linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300 text-2xl"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin"></i>
            </a>
          )}
          {/* Render link GitHub jika ada */}
          {heroText.social_github && (
            <a
              href={heroText.social_github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300 text-2xl"
              aria-label="GitHub"
            >
              <i className="fab fa-github"></i>
            </a>
          )}
          {/* Render link Instagram jika ada */}
          {heroText.social_instagram && (
            <a
              href={heroText.social_instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300 text-2xl"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram"></i>
            </a>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
