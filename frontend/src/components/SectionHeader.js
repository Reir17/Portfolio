import React from 'react';

// Komponen SectionHeader untuk judul dan subjudul yang seragam
const SectionHeader = ({ title, subtitle, titleColor = 'text-gray-800', subtitleColor = 'text-gray-600', linkText, linkHref, onLinkClick, linkColor = 'text-indigo-600 hover:text-indigo-800' }) => (
  <div className="flex flex-col items-center justify-center mb-10 text-center w-full">
      <h2 className={`text-3xl font-bold mb-2 ${titleColor}`}>
          {title}
      </h2>
      {subtitle && (
          <p className={`text-xl ${subtitleColor}`}>
              {subtitle}
              {linkText && (
                  <a
                      href={linkHref || '#'}
                      onClick={onLinkClick || ((e) => e.preventDefault())}
                      className={`${linkColor} ml-2`}
                  >
                      {linkText}
                  </a>
              )}
          </p>
      )}
  </div>
);

export default SectionHeader;
