import React from 'react';
import SectionHeader from './SectionHeader';

// Komponen AboutMeSection
// Sekarang menerima heroText, aboutMe, dan hobbies sebagai prop terpisah
const AboutMeSection = ({ heroText, aboutMe, hobbies }) => { // <--- Tambahkan 'hobbies' di sini
  return (
    <section className="bg-gray-100 py-16 px-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center md:items-start md:space-x-12">
        {/* Left Column: Profile Picture */}
        <div className="flex-shrink-0 relative
                    w-64 h-80 md:w-80 md:h-96
                    -mt-20 md:mt-0 mb-8 md:mb-0
                    overflow-hidden
                    "
             style={{
               borderRadius: '0',
             }}>
          <img
            src={aboutMe.gambar_url || 'https://placehold.co/300x400/cccccc/333333?text=Profile'}
            alt="Profile"
            className="absolute w-full h-full object-cover object-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/300x400/cccccc/333333?text=Profile'; }}
          />
        </div>

        {/* Right Column: Description and Hobbies */}
        <div className="flex-1 text-center md:text-left">
          <SectionHeader
            title={`Hi! I'm ${aboutMe.name || 'Anishka'}`}
            subtitle="This is my profile"
            titleColor="text-gray-800"
            subtitleColor="text-gray-600"
          />
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            {aboutMe.deskripsi || "Saya seorang desainer grafis dengan passion untuk membuat hal-hal terlihat bagus. Saya juga cukup lucu, jadi jika Anda mencari seseorang untuk mendesain kampanye pemasaran Anda berikutnya, Anda telah datang ke tempat yang tepat. Hanya saja, jangan berharap saya terlalu serius."}
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            
          </p>

          {/* Hobbies Section - Mengambil data dari prop hobbies yang baru */}
          {hobbies && hobbies.length > 0 && ( // <--- Menggunakan prop 'hobbies' langsung
            <div className="border-t border-b border-gray-300 py-4 mb-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Hobbies</h3>
              <div className="text-base text-gray-600 flex flex-wrap gap-x-2 items-center">
                {hobbies.map((hobby, index) => ( // <--- Memetakan prop 'hobbies'
                  <React.Fragment key={hobby.id || index}>
                    <span className={hobby.is_bold ? 'font-bold' : ''}>{hobby.hobby_name || hobby.name}</span>
                    {index < hobbies.length - 1 && (
                      <span className="text-gray-400 mx-1">|</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutMeSection;
