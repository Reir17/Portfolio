import React, { useEffect, useRef } from 'react';
import SectionHeader from './SectionHeader'; // Import SectionHeader

// Komponen ActivitiesSection
const ActivitiesSection = ({ activities }) => {
  const activitiesRef = useRef(null);
  const scrollActivitiesIntervalRef = useRef(null);

  // LOGIKA UNTUK AUTO-SCROLL HORIZONTAL PADA AKTIVITAS
  useEffect(() => {
    const container = activitiesRef.current;
    if (!container || activities.length === 0) return;

    if (scrollActivitiesIntervalRef.current) {
      clearInterval(scrollActivitiesIntervalRef.current);
    }

    const scrollRight = () => {
      // Gulir satu item penuh
      const itemWidth = container.children[0]?.offsetWidth + 24; // Lebar item + gap (space-x-6 = 24px)
      const currentScroll = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;

      let targetScroll = currentScroll + itemWidth;

      // Jika sudah di akhir, kembali ke awal
      if (targetScroll >= maxScroll) {
        targetScroll = 0;
      }

      container.scrollTo({ left: targetScroll, behavior: 'smooth' });
    };

    scrollActivitiesIntervalRef.current = setInterval(scrollRight, 3000); // Auto-scroll setiap 3 detik

    return () => {
      if (scrollActivitiesIntervalRef.current) {
        clearInterval(scrollActivitiesIntervalRef.current);
      }
    };
  }, [activities]); // Dependensi: activities

  return (
    <section id="activities-section" className="py-12 bg-gray-100 text-gray-800 flex flex-col items-center justify-center">
      <SectionHeader
          title="ACTIVITIES"
          subtitle="Some of my recent activities"
          titleColor="text-gray-800"
          subtitleColor="text-gray-600"
      />

      {activities.length === 0 ? (
        <p className="text-center text-gray-500">Belum ada aktivitas untuk ditampilkan.</p>
      ) : (
        <div className="container mx-auto px-4"> {/* Container untuk margin samping */}
          <div ref={activitiesRef} className="flex overflow-x-auto snap-x snap-mandatory w-full hide-scrollbar -mx-2 space-x-6"> {/* Added space-x-6 here */}
            {activities.map((act, index) => (
              <div
                key={act.id}
                className="flex-none w-full md:w-1/2 lg:w-1/3 p-2 relative overflow-hidden group snap-center"
                style={{ height: '384px' }} /* Menjaga tinggi konsisten dengan artikel */
              >
                <img
                  src={act.image || 'https://placehold.co/600x400/cccccc/333333?text=No+Image'}
                  alt={act.title}
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/cccccc/333333?text=No+Image'; }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-2xl font-bold mb-2">{act.title}</h3>
                  <p className="text-sm mb-2 text-gray-300">{act.time}</p> {/* Menampilkan waktu */}
                  <p className="text-sm mb-4 line-clamp-3">{act.deskripsi}</p>
                  {/* Link "Lihat Detail" bisa ditambahkan jika ada URL untuk aktivitas */}
                  <a
                    href="#" /* Ganti dengan link aktivitas yang sebenarnya jika ada */
                    onClick={(e) => { e.preventDefault(); window.alert(`Membaca lebih lanjut tentang: ${act.title}`); }}
                    className="inline-flex items-center text-indigo-300 hover:text-indigo-100 text-sm font-medium"
                  >
                    Lihat Detail
                    <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default ActivitiesSection;
