import React, { useState, useEffect, useRef, useCallback } from 'react';
import SectionHeader from './SectionHeader'; // Import SectionHeader

// Komponen ProjectsSection
const ProjectsSection = ({ projects }) => {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const projectsRef = useRef(null);
  const scrollProjectsIntervalRef = useRef(null);

  // LOGIKA UNTUK DETEKSI ITEM TENGAH PADA PROYEK (untuk update activeProjectIndex saat scroll manual)
  const handleProjectScroll = useCallback(() => {
    const container = projectsRef.current;
    if (!container || projects.length === 0) return;

    // Hitung posisi tengah container
    const viewportCenter = container.scrollLeft + container.clientWidth / 2;

    let closestProjectIndex = 0;
    let minDistance = Infinity;

    // Loop melalui setiap item anak untuk menemukan yang paling dekat dengan tengah
    Array.from(container.children).forEach((child, index) => {
      // Pastikan child adalah elemen HTML yang valid
      if (child.offsetWidth > 0) { // Cek jika elemen memiliki lebar (sudah dirender)
        const childCenter = child.offsetLeft + child.offsetWidth / 2; // Gunakan offsetWidth
        const distance = Math.abs(viewportCenter - childCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestProjectIndex = index;
        }
      }
    });
    setActiveProjectIndex(closestProjectIndex);
  }, [projects]);

  // LOGIKA UNTUK SCROLL PROGRAMATIK KE PROYEK TERTENTU (memusatkan item)
  const scrollToProject = useCallback((index) => {
    const container = projectsRef.current;
    if (!container || !container.children[index]) return;

    const targetElement = container.children[index];
    // Hitung offset agar elemen target berada di tengah viewport
    const scrollTarget = targetElement.offsetLeft - (container.clientWidth / 2) + (targetElement.offsetWidth / 2); // Gunakan offsetWidth

    // Hentikan auto-scroll sementara saat user berinteraksi
    if (scrollProjectsIntervalRef.current) {
        clearInterval(scrollProjectsIntervalRef.current);
        scrollProjectsIntervalRef.current = null; // Set to null after clearing
    }

    container.scrollTo({
      left: scrollTarget,
      behavior: 'smooth'
    });

    // Mulai lagi auto-scroll setelah beberapa detik (jika tidak ada interaksi lagi)
    setTimeout(() => {
        // Hanya mulai interval baru jika tidak ada interval yang sedang berjalan dari interaksi lain
        if (!scrollProjectsIntervalRef.current) { // Cek lagi sebelum memulai
            scrollProjectsIntervalRef.current = setInterval(() => {
                setActiveProjectIndex(prevIndex => {
                    const nextIndex = (prevIndex + 1) % projects.length;
                    scrollToProject(nextIndex); // Rekursif panggil fungsi scrollToProject
                    return nextIndex; // Update state untuk UI dots
                });
            }, 5000); // Auto-scroll setiap 5 detik
        }
    }, 1500); // Tunggu 1.5 detik setelah scroll manual selesai baru mulai auto-scroll lagi

    setActiveProjectIndex(index);
}, [projects]);

  // Efek untuk mengelola auto-scroll dan event listener scroll pada proyek
  useEffect(() => {
    const container = projectsRef.current;
    if (!container || projects.length === 0) return;

    // Mulai auto-scroll saat pertama kali dimuat jika belum dimulai
    // Ini akan dipicu hanya jika data projects tersedia dan setInterval belum ada
    if (!scrollProjectsIntervalRef.current) {
        scrollProjectsIntervalRef.current = setInterval(() => {
            setActiveProjectIndex(prevIndex => {
                const nextIndex = (prevIndex + 1) % projects.length;
                scrollToProject(nextIndex); // Panggil scrollToProject untuk memastikan smooth scroll ke tengah
                return nextIndex;
            });
        }, 5000); // Auto-scroll setiap 5 detik (sangat pelan)
    }

    // Tambahkan event listener untuk deteksi scroll manual
    container.addEventListener('scroll', handleProjectScroll);

    // Cleanup function untuk menghapus event listener dan interval saat komponen unmount
    return () => {
      if (scrollProjectsIntervalRef.current) {
        clearInterval(scrollProjectsIntervalRef.current);
      }
      container.removeEventListener('scroll', handleProjectScroll);
    };
  }, [projects, handleProjectScroll, scrollToProject]);

  return (
    <section id="projects-section" className="py-12 bg-blue-900 text-white flex flex-col items-center justify-center relative">
      <SectionHeader
          title="PROJECTS"
          subtitle="Some of my projects"
          linkText=""
          onLinkClick={() => window.alert('Melihat semua proyek...')}
          titleColor="text-white"
          subtitleColor="text-gray-300"
          linkColor="text-indigo-400 hover:text-indigo-200"
      />

      {projects.length === 0 ? (
        <p className="text-center text-gray-400">Belum ada proyek untuk ditampilkan.</p>
      ) : (
        <>
          {/* Carousel Container */}
          <div
            ref={projectsRef}
            className="flex overflow-x-scroll snap-x snap-mandatory hide-scrollbar
                       w-full px-4 md:px-8 lg:px-16 xl:px-24 py-4 space-x-6 items-center"
            style={{
              // Menyesuaikan padding agar item di pinggir terlihat sebagian dan snap ke tengah
              scrollPaddingLeft: 'calc(50% - 150px)', // 50% dari container - setengah lebar item tengah (300/2)
              scrollPaddingRight: 'calc(50% - 150px)',
            }}
          >
            {projects.map((project, index) => {
              const isActive = index === activeProjectIndex;
              const widthClass = isActive
                ? 'w-[300px]' // Ukuran item tengah (fixed width)
                : 'w-[200px]'; // Ukuran item samping (fixed width)
              const heightClass = 'h-[250px]'; // Tinggi semua gambar sama
              const scaleClass = isActive ? 'scale-100 opacity-100' : 'scale-90 opacity-60'; // Adjusted opacity for inactive

              return (
                <div
                  key={project.id}
                  className={`flex-none transform transition-all duration-500 ease-in-out
                              ${widthClass} ${heightClass} ${scaleClass}
                              relative rounded-lg overflow-hidden shadow-lg group snap-center`}
                  onClick={() => {
                      // Hentikan auto-scroll saat diklik
                      if (scrollProjectsIntervalRef.current) {
                          clearInterval(scrollProjectsIntervalRef.current);
                          scrollProjectsIntervalRef.current = null; // Set to null after clearing
                      }
                      scrollToProject(index); // Panggil fungsi scrollToProject yang memusatkan
                  }}
                >
                  <img
                    src={project.gambar || 'https://placehold.co/600x400/333333/cccccc?text=No+Image'}
                    alt={project.nama_project}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/333333/cccccc?text=No+Image'; }}
                  />
                  {/* Overlay default (transparan) dan hover (VIEW PROJECT) */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 flex flex-col justify-center items-center text-center p-6 text-white
                                  group-hover:bg-opacity-70 group-hover:opacity-100 transition-all duration-300">
                      {/* Konten yang muncul saat hover */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {/* Menghapus "PROJECT KE-X" */}
                          {project.link && (
                              <a
                                  href={project.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="block mt-4 px-4 py-2 border-2 border-white text-white font-medium rounded-md
                                             hover:bg-white hover:text-black transition-colors duration-300
                                             inline-flex items-center"
                              >
                                  VIEW PROJECT
                                  <svg className="ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                  </svg>
                              </a>
                          )}
                      </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Judul dan Deskripsi Proyek Aktif - DI BAWAH CAROUSEL, DI ATAS NAVIGASI DOT */}
          <div className="text-center mt-8 px-4 max-w-2xl mx-auto">
            <h3 className="text-4xl md:text-5xl font-extrabold mb-4 uppercase tracking-wider text-white">
              {projects[activeProjectIndex]?.nama_project?.toUpperCase() || ''}
            </h3>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              {projects[activeProjectIndex]?.deskripsi || ''}
            </p>
          </div>

          {/* Navigasi Dot / Indicator */}
          <div className="flex justify-center mt-8 space-x-3">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors duration-300
                            ${index === activeProjectIndex ? 'bg-indigo-500' : 'bg-gray-400 hover:bg-gray-300'}`}
                onClick={() => scrollToProject(index)}
              ></button>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default ProjectsSection;
