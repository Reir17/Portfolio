import React, { useState, useEffect } from 'react';

// Komponen formulir untuk menambah atau mengedit keterampilan
function AddSkillForm({ skillToEdit, onSave, onCancel }) {
  // State untuk data formulir
  const [formData, setFormData] = useState({
    nama_skill: '',
    level: ''
  });
  const [message, setMessage] = useState(''); // State untuk pesan sukses/error

  // Isi formulir jika ada skill yang akan diedit
  useEffect(() => {
    if (skillToEdit) {
      setFormData({
        nama_skill: skillToEdit.nama_skill || '',
        level: skillToEdit.level || ''
      });
    } else {
      // Reset formulir jika tidak ada skill yang diedit (misal untuk mode tambah)
      setFormData({
        nama_skill: '',
        level: ''
      });
    }
  }, [skillToEdit]);

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
    if (!formData.nama_skill || !formData.level) {
      setMessage('Nama Skill and Level are required.');
      return;
    }

    // Validasi level harus angka antara 0-100
    if (isNaN(formData.level) || formData.level < 0 || formData.level > 100) {
      setMessage('Level must be a number between 0 and 100.');
      return;
    }

    try {
      let response;
      if (skillToEdit && skillToEdit.id) { // Pastikan skillToEdit.id ada
        // Mode edit (PUT)
        response = await fetch(`http://localhost:3001/api/skills/${skillToEdit.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      } else {
        // Mode tambah (POST)
        response = await fetch('http://localhost:3001/api/skills', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      }

      if (response.ok) {
        setMessage(`Skill ${skillToEdit ? 'updated' : 'added'} successfully!`);
        onSave(); // Panggil fungsi callback dari parent untuk refresh data
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message || 'Something went wrong.'}`);
      }
    } catch (error) {
      console.error('Error submitting skill:', error);
      setMessage('Network error. Please try again.');
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        {skillToEdit ? 'Edit Skill' : 'Tambah Skill Baru'}
      </h3>
      {message && (
        <div className={`p-3 mb-4 rounded-md ${message.startsWith('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nama_skill" className="block text-sm font-medium text-gray-700">Nama Skill:</label>
          <input
            type="text"
            id="nama_skill"
            name="nama_skill"
            value={formData.nama_skill}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="level" className="block text-sm font-medium text-gray-700">Level (%):</label>
          <input
            type="number"
            id="level"
            name="level"
            value={formData.level}
            onChange={handleChange}
            min="0"
            max="100"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
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
            {skillToEdit ? 'Simpan Perubahan' : 'Tambah Skill'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddSkillForm;
