import React, { useState, useEffect } from 'react';

// Komponen formulir untuk menambah atau mengedit artikel
function AddArticleForm({ articleToEdit, onSave, onCancel }) {
  // State untuk data formulir
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    date: '',
    content: '',
    image_url: '',
    article_url: '' // Tambahkan state untuk URL artikel
  });
  const [message, setMessage] = useState(''); // State untuk pesan sukses/error

  // Isi formulir jika ada artikel yang akan diedit
  useEffect(() => {
    if (articleToEdit) {
      setFormData({
        title: articleToEdit.title || '',
        author: articleToEdit.author || '',
        date: articleToEdit.date || '',
        content: articleToEdit.content || '',
        image_url: articleToEdit.image_url || '',
        article_url: articleToEdit.article_url || '' // Isi juga URL artikel jika ada
      });
    } else {
      // Reset formulir jika tidak ada artikel yang diedit (misal untuk mode tambah)
      setFormData({
        title: '',
        author: '',
        date: '',
        content: '',
        image_url: '',
        article_url: ''
      });
    }
  }, [articleToEdit]);

  // Handler perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handler submit formulir
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Reset pesan

    // Validasi dasar
    if (!formData.title || !formData.author || !formData.date || !formData.content) {
      setMessage('Judul, penulis, tanggal, dan konten wajib diisi.');
      return;
    }

    try {
      let response;
      if (articleToEdit && articleToEdit.id) { // Jika ada ID, ini adalah update (PUT)
        response = await fetch(`http://localhost:3001/api/articles/${articleToEdit.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      } else { // Jika tidak ada ID, ini adalah penambahan baru (POST)
        response = await fetch('http://localhost:3001/api/articles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      }

      if (response.ok) {
        setMessage(`Artikel ${articleToEdit ? 'berhasil diperbarui' : 'berhasil ditambahkan'}!`);
        onSave(); // Panggil fungsi callback dari parent untuk refresh data
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message || 'Terjadi kesalahan.'}`);
      }
    } catch (error) {
      console.error('Error submitting article:', error);
      setMessage('Kesalahan jaringan. Coba lagi.');
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        {articleToEdit ? 'Edit Artikel' : 'Tambah Artikel Baru'}
      </h3>
      {message && (
        <div className={`p-3 mb-4 rounded-md ${message.startsWith('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Judul:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700">Penulis:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Tanggal:</label>
          <input
            type="text"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Contoh: 15 Juni 2025"
            required
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">Konten:</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows="8"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="image_url" className="block text-sm font-medium text-gray-700">URL Gambar (Opsional):</label>
          <input
            type="url"
            id="image_url"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="https://via.placeholder.com/600x400"
          />
        </div>
        <div>
          <label htmlFor="article_url" className="block text-sm font-medium text-gray-700">URL Artikel (Opsional):</label>
          <input
            type="url"
            id="article_url"
            name="article_url"
            value={formData.article_url}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="https://www.contoh-artikel.com/judul-artikel"
          />
        </div>
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {articleToEdit ? 'Simpan Perubahan' : 'Tambah Artikel'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddArticleForm;
