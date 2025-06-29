import React, { useState, useEffect } from 'react';

// Komponen formulir untuk menambah atau mengedit proyek
function AddProjectForm({ projectToEdit, onSave, onCancel }) {
  // State untuk data formulir
  const [formData, setFormData] = useState({
    nama_project: '',
    deskripsi: '',
    link: '',
    gambar: ''
  });
  const [message, setMessage] = useState(''); // State untuk pesan sukses/error

  // Isi formulir jika ada proyek yang akan diedit
  useEffect(() => {
    if (projectToEdit) {
      setFormData({
        nama_project: projectToEdit.nama_project || '',
        deskripsi: projectToEdit.deskripsi || '',
        link: projectToEdit.link || '',
        gambar: projectToEdit.gambar || ''
      });
    } else {
      // Reset formulir jika tidak ada proyek yang diedit (misal untuk mode tambah)
      setFormData({
        nama_project: '',
        deskripsi: '',
        link: '',
        gambar: ''
      });
    }
  }, [projectToEdit]);

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
    if (!formData.nama_project || !formData.deskripsi) {
      setMessage('Nama Project and Deskripsi are required.');
      return;
    }

    try {
      let response;
      if (projectToEdit && projectToEdit.id) { // Pastikan projectToEdit.id ada
        // Mode edit (PUT)
        response = await fetch(`http://localhost:3001/api/projects/${projectToEdit.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      } else {
        // Mode tambah (POST)
        response = await fetch('http://localhost:3001/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      }

      if (response.ok) {
        setMessage(`Project ${projectToEdit ? 'updated' : 'added'} successfully!`);
        onSave(); // Panggil fungsi callback dari parent untuk refresh data
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message || 'Something went wrong.'}`);
      }
    } catch (error) {
      console.error('Error submitting project:', error);
      setMessage('Network error. Please try again.');
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        {projectToEdit ? 'Edit Proyek' : 'Tambah Proyek Baru'}
      </h3>
      {message && (
        <div className={`p-3 mb-4 rounded-md ${message.startsWith('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nama_project" className="block text-sm font-medium text-gray-700">Nama Project:</label>
          <input
            type="text"
            id="nama_project"
            name="nama_project"
            value={formData.nama_project}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="deskripsi" className="block text-sm font-medium text-gray-700">Deskripsi:</label>
          <textarea
            id="deskripsi"
            name="deskripsi"
            value={formData.deskripsi}
            onChange={handleChange}
            rows="4"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="link" className="block text-sm font-medium text-gray-700">Link (URL):</label>
          <input
            type="url"
            id="link"
            name="link"
            value={formData.link}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="https://example.com/project"
          />
        </div>
        <div>
          <label htmlFor="gambar" className="block text-sm font-medium text-gray-700">URL Gambar:</label>
          <input
            type="url"
            id="gambar"
            name="gambar"
            value={formData.gambar}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="https://via.placeholder.com/300x200"
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
            {projectToEdit ? 'Simpan Perubahan' : 'Tambah Proyek'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProjectForm;
