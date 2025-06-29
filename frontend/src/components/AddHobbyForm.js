// frontend/src/components/AddHobbyForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Menggunakan axios
import { TextField, Button, FormControlLabel, Switch, Typography, Box } from '@mui/material'; // Menggunakan komponen MUI

function AddHobbyForm({ hobbyToEdit, onSave, onCancel }) {
  const [form, setForm] = useState({
    hobby_name: '',
    is_bold: false
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  useEffect(() => {
    if (hobbyToEdit) {
      setForm({
        hobby_name: hobbyToEdit.hobby_name || '',
        is_bold: hobbyToEdit.is_bold || false
      });
    } else {
      setForm({
        hobby_name: '',
        is_bold: false
      });
    }
  }, [hobbyToEdit]);

  // Effect to clear messages after a few seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 3000); // Message disappears after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setMessageType('');

    if (!form.hobby_name.trim()) {
      setMessage('Nama hobi tidak boleh kosong.');
      setMessageType('error');
      return;
    }

    try {
      let response;
      if (hobbyToEdit && hobbyToEdit.id) {
        response = await axios.put(`http://localhost:3001/api/hobbies/${hobbyToEdit.id}`, form);
      } else {
        response = await axios.post('http://localhost:3001/api/hobbies', form);
      }

      if (response.status === 200 || response.status === 201) {
        setMessage(`Hobi berhasil ${hobbyToEdit ? 'diperbarui' : 'ditambahkan'}!`);
        setMessageType('success');
        onSave(); // Trigger refresh in parent
        setForm({ hobby_name: '', is_bold: false }); // Reset form
      } else {
        // Axios error response data is often in error.response.data
        setMessage(`Error: ${response.data.message || 'Terjadi kesalahan.'}`);
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error submitting hobby form:', error.response ? error.response.data : error.message);
      setMessage(`Kesalahan: ${error.response?.data?.message || error.message}`);
      setMessageType('error');
    }
  };

  return (
    <Box className="p-6 bg-white rounded-lg shadow-md">
      <Typography variant="h6" component="h3" className="text-gray-800 font-semibold mb-4">
        {hobbyToEdit ? 'Edit Hobi' : 'Tambah Hobi Baru'}
      </Typography>
      {message && (
        <Box className={`p-3 mb-4 rounded-md ${messageType === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </Box>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField
          label="Nama Hobi"
          name="hobby_name"
          value={form.hobby_name}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          required
        />
        <FormControlLabel
          control={
            <Switch
              checked={form.is_bold}
              onChange={handleChange}
              name="is_bold"
              color="primary"
            />
          }
          label="Tampilkan dengan Tebal"
        />
        <Box className="flex justify-end space-x-3">
          <Button
            type="button"
            variant="outlined"
            onClick={onCancel}
          >
            Batal
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            {hobbyToEdit ? 'Simpan Perubahan' : 'Tambah Hobi'}
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default AddHobbyForm;
