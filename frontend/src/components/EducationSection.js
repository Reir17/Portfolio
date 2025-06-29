import React from 'react';
import SectionHeader from './SectionHeader'; // Import SectionHeader

// Komponen EducationSection
const EducationSection = ({ education }) => {
  return (
    <section id="education-section" className="py-12 bg-blue-700 text-white"> {/* Background gelap untuk bagian education */}
      <div className="container mx-auto px-4">
          <SectionHeader
              title="EDUCATION"
              subtitle="2011 - 2016? It's not a mistake, God just gave me a little power"
              titleColor="text-white"
              subtitleColor="text-gray-300"
          />

        {education.length === 0 ? (
          <p className="text-center text-gray-500">Belum ada data pendidikan untuk ditampilkan.</p>
        ) : (
          // Outer container for the timeline structure
          <div className="relative space-y-16 py-8 md:px-0 before:absolute before:left-3 before:top-0 before:h-full before:w-1 before:bg-indigo-100 md:before:left-1/2 md:before:-translate-x-1/2 before:rounded-full">
            {education.map((edu, index) => (
              // Each timeline item container
              <div key={edu.id} className={`flex items-start w-full relative`}>
                {/* Dot on the timeline line (z-index to be on top of the line) */}
                {/* Adjusted top position to vertically align with the content's first line */}
                <div className="absolute left-3 md:left-1/2 transform -translate-x-1/2 bg-indigo-100 rounded-full w-4 h-4 z-10 border-2 border-slate-800 -mt-1"></div> 
                
                {/* Content wrapper for horizontal positioning */}
                {/* This div will handle pushing the actual content box to the left/right */}
                <div className={`
                  w-full flex-grow flex
                  ${index % 2 === 0 // Right side item
                    ? 'justify-end md:justify-start' // Mobile: push right (away from left line), Desktop: push left (closer to center line)
                    : 'justify-start md:justify-end'} // Mobile: push left (away from left line), Desktop: push right (closer to center line)
                `}>
                  {/* Actual Education content box */}
                  <div className={`
                    p-6 rounded-lg md:w-80 // Fixed width for desktop boxes
                    transform transition-transform duration-300 hover:scale-105
                    text-white relative z-[5]
                    // Adjust margins/padding to control distance from center line
                    // On mobile, the ml-6/mr-6 pushes it away from the fixed left line
                    ${index % 2 === 0
                      ? 'ml-6 md:ml-0 md:mr-4' // Mobile left, Desktop right (pushed left by mr-4)
                      : 'mr-6 md:mr-0 md:ml-4 md:text-right'} // Mobile right, Desktop left (pushed right by ml-4, text-right inside box)
                  `}>
                    <p className="text-xl font-bold mb-1 text-indigo-100">{edu.tahun}</p> {/* Tahun */}
                    <p className="text-2xl font-bold text-gray-300 mb-1">{edu.institusi}</p> {/* Institusi (bold, lebih besar) */}
                    <h3 className="text-lg font-light">{edu.jurusan}</h3> {/* Jurusan (light, lebih kecil) */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default EducationSection;
