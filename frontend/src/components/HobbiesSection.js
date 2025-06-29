import React from 'react';
import SectionHeader from './SectionHeader'; // Import SectionHeader

// Komponen HobbiesSection
const HobbiesSection = ({ hobbies }) => {
  return (
    <section id="hobbies-section" className="py-12 bg-gray-100 text-gray-800 flex flex-col items-center justify-center">
      <SectionHeader
          title="Hobi & Minat"
          subtitle="Beberapa Hal yang Saya Nikmati"
          titleColor="text-gray-800"
          subtitleColor="text-gray-600"
      />

      {hobbies.length === 0 ? (
        <p className="text-center text-gray-500">Belum ada hobi yang ditambahkan.</p>
      ) : (
        <div className="container mx-auto px-4">
          <div className="text-lg text-gray-700 flex flex-wrap justify-center gap-x-4 gap-y-2">
            {hobbies.map((hobby, index) => (
              <span
                key={hobby.id}
                className={`px-4 py-2 rounded-full bg-indigo-100 text-indigo-800
                            ${hobby.is_bold ? 'font-bold' : 'font-medium'}
                            transition-colors duration-300 hover:bg-indigo-200 cursor-default`}
              >
                {hobby.hobby_name}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default HobbiesSection;
