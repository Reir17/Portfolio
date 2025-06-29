import React from 'react';

// Komponen HeroSection
const HeroSection = ({ heroText }) => {
  return (
    <section className="relative w-full h-[600px] bg-gradient-to-r from-[#000080] to-[#0000FF] overflow-hidden flex flex-col justify-between p-8 text-white shadow-xl"> {/* Mengubah justify-center menjadi justify-between kembali */}
      {/* Background Waves/Shapes (SVG atau Pseudo-elements untuk kompleksitas) */}
      <div className="absolute inset-0 z-0 opacity-70">
        <svg className="w-full h-full" viewBox="0 0 1440 600" preserveAspectRatio="none">
          <defs>
            <linearGradient id="gradient-hero" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#000080" /> {/* Biru Tua */}
              <stop offset="100%" stopColor="#0000FF" /> {/* Biru Cerah */}
            </linearGradient>
          </defs>
          {/* Contoh bentuk gelombang sederhana, bisa lebih kompleks dengan path data */}
          <path fill="url(#gradient-hero)" d="M0,0 L0,150 C200,200 400,100 600,150 C800,200 1000,100 1200,150 L1440,200 L1440,0 Z"></path>
          <path fill="url(#gradient-hero)" opacity="0.6" d="M0,0 L0,200 C250,250 500,150 750,200 C1000,250 1250,150 1440,200 L1440,0 Z"></path>
        </svg>
      </div>
      
      {/* Konten peran, judul utama, dan tahun yang dipusatkan */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-16 h-full text-center"> {/* Menambahkan h-full */}
        {/* Peran */}
        <p className="text-xl md:text-2xl lg:text-3xl font-light mb-4 text-white drop-shadow-lg">
          {heroText.role_text || 'Graphic Designing'}
        </p>

        {/* Judul Utama dan Tahun */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter mb-4 leading-tight text-white drop-shadow-lg">
          {heroText.main_title || 'PORTFOLIO'}
          <span className="text-3xl md:text-4xl lg:text-5xl align-super ml-4 text-indigo-200">
            {heroText.year_text || '2023'}
          </span>
        </h1>
      </div>

      {/* Nama, dikembalikan ke posisi kiri bawah */}
      <div className="relative z-10 text-left pb-8 pl-8">
        <p className="text-2xl font-semibold text-white drop-shadow-lg">{heroText.name || 'Anishka'}</p> {/* Mengembalikan ukuran font asli */}
      </div>
    </section>
  );
};

export default HeroSection;
