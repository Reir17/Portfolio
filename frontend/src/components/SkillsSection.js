import React from 'react';
import SectionHeader from './SectionHeader'; // Import SectionHeader

// Komponen SkillsSection
const SkillsSection = ({ skills }) => {
  return (
    <section id="skills-section" className="py-12 bg-blue-800 text-white flex flex-col items-center justify-center">
      <SectionHeader
          title="SKILLS"
          subtitle="Improve every day"
          titleColor="text-white"
          subtitleColor="text-gray-300"
      />

      {skills.length === 0 ? (
        <p className="text-center text-gray-500">Belum ada keterampilan untuk ditampilkan.</p>
      ) : (
        <div className="w-full max-w-2xl px-4"> {/* Pembatas lebar untuk konten skills */}
          {skills.map((skill) => (
            <div key={skill.id} className="mb-6">
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-lg font-medium text-gray-200 uppercase">{skill.nama_skill}</h3>
                <span className="text-sm font-semibold text-gray-200">{skill.level}%</span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-3"> {/* Warna background progress bar disesuaikan */}
                <div
                  className="bg-green-400 h-3 rounded-full" /* Warna progress bar disesuaikan */
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default SkillsSection;
