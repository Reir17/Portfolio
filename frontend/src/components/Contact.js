import React, { useState } from 'react';
import SectionHeader from '../components/SectionHeader';

function Contact({ heroText }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [statusMessage, setStatusMessage] = useState('');

  // Debugging log: Lihat heroText yang diterima oleh Contact
  console.log('Contact.js: heroText received:', heroText);
  // Debugging log: Lihat properti social media secara spesifik
  console.log('Contact.js: social_linkedin:', heroText?.social_linkedin);
  console.log('Contact.js: social_github:', heroText?.social_github);
  console.log('Contact.js: social_instagram:', heroText?.social_instagram);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage('Mengirim pesan...');

    try {
      const response = await fetch('http://localhost:3001/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatusMessage('Pesan Anda telah terkirim! Terima kasih.');
        setFormData({ name: '', email: '', message: '' }); // Reset form
      } else {
        const errorData = await response.json();
        setStatusMessage(`Gagal mengirim pesan: ${errorData.message || 'Terjadi kesalahan.'}`);
      }

    } catch (error) {
      console.error('Error submitting contact form:', error);
      setStatusMessage('Terjadi kesalahan jaringan. Coba lagi nanti.');
    }
  };

  return (
    <div className="py-12 flex items-center justify-center">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-8 items-center lg:items-start">
        {/* Left Section: Contact Form */}
        <div className="max-w-xl w-full bg-white p-8 rounded-lg shadow-lg">
          <SectionHeader
            title="Hubungi Saya"
            subtitle="Punya pertanyaan atau ingin berkolaborasi? Jangan ragu untuk menghubungi saya!"
            titleColor="text-gray-800"
            subtitleColor="text-gray-600"
          />

          {statusMessage && (
            <div className={`p-3 mb-4 rounded-md text-center ${statusMessage.includes('Gagal') || statusMessage.includes('kesalahan') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
              {statusMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama Anda:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Anda:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Pesan Anda:</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="6"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Kirim Pesan
            </button>
          </form>
        </div>

        {/* Right Section: Email & Social Media */}
        <div className="w-full lg:w-1/2 max-w-xl lg:max-w-none bg-white p-8 rounded-lg shadow-lg flex flex-col justify-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center lg:text-left">Detail Kontak</h2>
          <div className="text-gray-700 space-y-4 text-center lg:text-left">
            <p className="flex items-center justify-center lg:justify-start">
              <svg className="h-6 w-6 text-indigo-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {(heroText && heroText.email) ? heroText.email : 'Email Anda Belum Tersedia'}
            </p>
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-8 text-center lg:text-left">Ikuti Saya</h2>
          <div className="flex justify-center lg:justify-start space-x-6 mt-4">
            {/* Hanya render jika heroText dan properti social media ada */}
            {heroText && heroText.social_linkedin && (
              <a href={heroText.social_linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300 text-3xl" aria-label="LinkedIn">
                <i className="fab fa-linkedin"></i>
              </a>
            )}
            {heroText && heroText.social_github && (
              <a href={heroText.social_github} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300 text-3xl" aria-label="GitHub">
                <i className="fab fa-github"></i>
              </a>
            )}
            {heroText && heroText.social_instagram && (
              <a href={heroText.social_instagram} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300 text-3xl" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
            )}
            {/* Tambahkan fallback jika tidak ada link sosial media */}
            {(!heroText || (!heroText.social_linkedin && !heroText.social_github && !heroText.social_instagram)) && (
              <p className="text-gray-500 text-sm">Link Sosial Media Belum Tersedia.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
