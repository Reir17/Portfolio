// backend/routes/experiences.js
// Rute untuk mengelola data pengalaman kerja
const express = require('express');
const router = express.Router();
const db = require('../db'); // Import koneksi database

// GET all experiences
// Mengambil semua catatan pengalaman
router.get('/', (req, res) => {
  db.query('SELECT id, posisi, tempat, tahun, deskripsi FROM experiences', (err, results) => { // Urutan SELECT disesuaikan
    if (err) {
      console.error('Error fetching experiences:', err);
      return res.status(500).json({ message: 'Error fetching experiences', error: err.message });
    }
    res.json(results); // Kirim semua hasil pengalaman
  });
});

// POST a new experience
// Menambahkan entri pengalaman kerja baru
router.post('/', (req, res) => {
  const { posisi, tempat, tahun, deskripsi } = req.body; // Ambil data dari body, urutan disesuaikan

  // Validasi: meskipun di schema DEFAULT NULL, secara aplikasi ini biasanya wajib
  if (!posisi || !tempat || !tahun || !deskripsi) {
    return res.status(400).json({ message: 'Posisi, tempat, tahun, and deskripsi are required.' });
  }

  db.query(
    'INSERT INTO experiences (posisi, tempat, tahun, deskripsi) VALUES (?, ?, ?, ?)', // Urutan INSERT disesuaikan
    [posisi, tempat, tahun, deskripsi],
    (err, result) => {
      if (err) {
        console.error('Error inserting experience:', err);
        return res.status(500).json({ message: 'Error inserting experience', error: err.message });
      }
      // Kirim respons sukses dengan ID yang baru dibuat dan data yang dimasukkan
      res.status(201).json({ id: result.insertId, posisi, tempat, tahun, deskripsi });
    }
  );
});

// UPDATE an experience
// Memperbarui entri pengalaman kerja berdasarkan ID
router.put('/:id', (req, res) => {
  const { id } = req.params; // Ambil ID dari parameter URL
  const { posisi, tempat, tahun, deskripsi } = req.body; // Ambil data dari body, urutan disesuaikan

  // Validasi: meskipun di schema DEFAULT NULL, secara aplikasi ini biasanya wajib
  if (!posisi || !tempat || !tahun || !deskripsi) {
    return res.status(400).json({ message: 'Posisi, tempat, tahun, and deskripsi are required for update.' });
  }

  db.query(
    'UPDATE experiences SET posisi = ?, tempat = ?, tahun = ?, deskripsi = ? WHERE id = ?', // Urutan UPDATE disesuaikan
    [posisi, tempat, tahun, deskripsi, id],
    (err, result) => {
      if (err) {
        console.error('Error updating experience:', err);
        return res.status(500).json({ message: 'Error updating experience', error: err.message });
      }
      // Periksa apakah ada baris yang terpengaruh
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Experience with given ID not found.' });
      }
      // Kirim respons sukses dengan data pengalaman yang diperbarui
      res.status(200).json({ message: 'Experience updated successfully', experience: { id, posisi, tempat, tahun, deskripsi } });
    }
  );
});

// DELETE an experience
// Menghapus entri pengalaman kerja berdasarkan ID
router.delete('/:id', (req, res) => {
  const { id } = req.params; // Ambil ID dari parameter URL
  db.query('DELETE FROM experiences WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error deleting experience:', err);
      return res.status(500).json({ message: 'Error deleting experience', error: err.message });
    }
    // Periksa apakah ada baris yang terpengaruh
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Experience with given ID not found.' });
    }
    res.sendStatus(204); // Kirim status 204 No Content untuk penghapusan yang berhasil
  });
});

module.exports = router;
