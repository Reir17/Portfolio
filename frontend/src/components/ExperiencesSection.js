import React from 'react';
import SectionHeader from './SectionHeader'; // Import SectionHeader

// Komponen ExperiencesSection
const ExperiencesSection = ({ experiences }) => {
  return (
    <section id="experiences-section" className="py-12 bg-white text-gray-800">
      <div className="container mx-auto px-4">
        {/* Header untuk Bagian Pengalaman Kerja */}
        <SectionHeader
            title="EXPERIENCES"
            subtitle="Not chasing anything big, just doing this to stay active and sane."
            titleColor="text-gray-800"
            subtitleColor="text-gray-600"
        />

        {/* Kondisi jika tidak ada pengalaman */}
        {experiences.length === 0 ? (
          <p className="text-center text-gray-500 mt-8">Belum ada pengalaman kerja untuk ditampilkan.</p>
        ) : (
          <div className="relative py-8">
            {/* Garis vertikal di sisi kiri timeline */}
            {/* Posisi garis di kiri, dengan padding ke samping agar tidak terlalu mepet */}
            <div className="absolute left-6 md:left-8 w-1 bg-gray-300 h-full rounded-full"></div>

            {/* Container untuk item pengalaman */}
            <div className="flex flex-col">
              {experiences.map((exp, index) => (
                <div key={exp.id} className="flex items-start mb-8 last:mb-0 relative">
                  {/* Dot pada timeline */}
                  {/* Dot akan berada di atas garis vertikal, sejajar dengan teks */}
                  <div className="absolute left-4 md:left-6 top-0 transform -translate-x-1/2 w-6 h-6 bg-indigo-500 rounded-full border-4 border-white z-10"></div>

                  {/* Konten Pengalaman di sebelah kanan garis */}
                  {/* Menambahkan max-w-full untuk memastikan kontainer teks tidak melebihi lebar yang tersedia */}
                  {/* Menambahkan ml-16/ml-20 untuk spacing dari garis, dan flex-1 untuk mengambil sisa lebar */}
                  <div className="ml-16 md:ml-20 flex-1 p-0 rounded-lg bg-transparent max-w-full">
                    <p className="text-gray-500 text-base mb-1">{exp.tahun}</p>
                    <h3 className="text-2xl font-bold text-gray-800 mb-1">{exp.tempat}</h3>
                    <p className="text-xl font-medium text-gray-700 mb-2">{exp.posisi}</p>
                    {/* Deskripsi pengalaman: Teks akan otomatis melipat (wrap) ke baris berikutnya jika melebihi lebar kontainer. */}
                    {/* Kelas leading-relaxed membantu keterbacaan baris teks yang panjang. */}
                    {/* Kelas break-all memaksa kata-kata panjang (tanpa spasi) untuk pecah baris */}
                    <p className="text-gray-700 text-sm leading-relaxed break-all">
                      {exp.deskripsi}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ExperiencesSection;
