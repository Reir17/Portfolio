import React, { useState } from 'react';

// Komponen halaman Kontak
function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [statusMessage, setStatusMessage] = useState('');

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
    <div className="py-12 bg-gray-100 min-h-[calc(100vh-64px)] flex items-center justify-center">
      <div className="max-w-xl w-full mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8 border-b-4 border-indigo-500 inline-block px-4 pb-2">
          Hubungi Saya
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Punya pertanyaan atau ingin berkolaborasi? Jangan ragu untuk menghubungi saya!
        </p>

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
    </div>
  );
}

export default Contact;
