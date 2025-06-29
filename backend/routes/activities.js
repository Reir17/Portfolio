// backend/routes/activities.js
// Rute untuk mengelola data aktivitas/prestasi
const express = require('express');
const router = express.Router();
const db = require('../db'); // Import koneksi database

// GET all activities
// Mengambil semua catatan aktivitas
router.get('/', (req, res) => {
  // Urutan SELECT disesuaikan dengan urutan kolom di tabel 'activities' di schema.sql
  db.query('SELECT id, deskripsi, title, time, image FROM activities', (err, results) => {
    if (err) {
      console.error('Error fetching activities:', err);
      return res.status(500).json({ message: 'Error fetching activities', error: err.message });
    }
    res.json(results); // Kirim semua hasil aktivitas
  });
});

// POST a new activity
// Menambahkan entri aktivitas baru
router.post('/', (req, res) => {
  const { deskripsi, title, time, image } = req.body; // Ambil data dari body, urutan disesuaikan

  // Validasi: title dan time adalah NOT NULL di schema, deskripsi dan image bisa NULL
  if (!title || !time) {
    return res.status(400).json({ message: 'Title and time are required fields.' });
  }

  // Urutan parameter INSERT disesuaikan dengan urutan kolom di tabel
  db.query(
    'INSERT INTO activities (deskripsi, title, time, image) VALUES (?, ?, ?, ?)',
    [deskripsi, title, time, image],
    (err, result) => {
      if (err) {
        console.error('Error inserting activity:', err);
        return res.status(500).json({ message: 'Error inserting activity', error: err.message });
      }
      // Kirim respons sukses dengan ID yang baru dibuat dan data yang dimasukkan
      res.status(201).json({ id: result.insertId, deskripsi, title, time, image });
    }
  );
});

// UPDATE an activity
// Memperbarui entri aktivitas berdasarkan ID
router.put('/:id', (req, res) => {
  const { id } = req.params; // Ambil ID dari parameter URL
  const { deskripsi, title, time, image } = req.body; // Ambil data dari body, urutan disesuaikan

  // Validasi: title dan time adalah NOT NULL di schema
  if (!title || !time) {
    return res.status(400).json({ message: 'Title and time are required fields for update.' });
  }

  // Urutan parameter UPDATE disesuaikan dengan urutan kolom di tabel
  db.query(
    'UPDATE activities SET deskripsi = ?, title = ?, time = ?, image = ? WHERE id = ?',
    [deskripsi, title, time, image, id],
    (err, result) => {
      if (err) {
        console.error('Error updating activity:', err);
        return res.status(500).json({ message: 'Error updating activity', error: err.message });
      }
      // Periksa apakah ada baris yang terpengaruh
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Activity with given ID not found.' });
      }
      // Kirim respons sukses dengan data aktivitas yang diperbarui
      res.status(200).json({ message: 'Activity updated successfully', activity: { id, deskripsi, title, time, image } });
    }
  );
});

// DELETE an activity
// Menghapus entri aktivitas berdasarkan ID
router.delete('/:id', (req, res) => {
  const { id } = req.params; // Ambil ID dari parameter URL
  db.query('DELETE FROM activities WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error deleting activity:', err);
      return res.status(500).json({ message: 'Error deleting activity', error: err.message });
    }
    // Periksa apakah ada baris yang terpengaruh
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Activity with given ID not found.' });
    }
    res.sendStatus(204); // Kirim status 204 No Content untuk penghapusan yang berhasil
  });
});

module.exports = router;
