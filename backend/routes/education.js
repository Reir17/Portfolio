// backend/routes/education.js
// Rute untuk mengelola data pendidikan
const express = require('express');
const router = express.Router();
const db = require('../db'); // Import koneksi database

// GET all education records
// Mengambil semua catatan pendidikan
router.get('/', (req, res) => {
  db.query('SELECT id, jurusan, institusi, tahun FROM education', (err, results) => { // Urutan SELECT disesuaikan
    if (err) {
      console.error('Error fetching education records:', err);
      return res.status(500).json({ message: 'Error fetching education records', error: err.message });
    }
    res.json(results); // Kirim semua hasil pendidikan
  });
});

// POST a new education entry
// Menambahkan entri pendidikan baru
router.post('/', (req, res) => {
  const { jurusan, institusi, tahun } = req.body; // Ambil data dari body, urutan disesuaikan

  // Validasi: meskipun di schema DEFAULT NULL, secara aplikasi ini biasanya wajib
  if (!jurusan || !institusi || !tahun) {
    return res.status(400).json({ message: 'Jurusan, institusi, and tahun are required.' });
  }

  db.query(
    'INSERT INTO education (jurusan, institusi, tahun) VALUES (?, ?, ?)', // Urutan INSERT disesuaikan
    [jurusan, institusi, tahun],
    (err, result) => {
      if (err) {
        console.error('Error inserting education entry:', err);
        return res.status(500).json({ message: 'Error inserting education entry', error: err.message });
      }
      // Kirim respons sukses dengan ID yang baru dibuat dan data yang dimasukkan
      res.status(201).json({ id: result.insertId, jurusan, institusi, tahun });
    }
  );
});

// UPDATE an education entry
// Memperbarui entri pendidikan berdasarkan ID
router.put('/:id', (req, res) => {
  const { id } = req.params; // Ambil ID dari parameter URL
  const { jurusan, institusi, tahun } = req.body; // Ambil data dari body, urutan disesuaikan

  // Validasi: meskipun di schema DEFAULT NULL, secara aplikasi ini biasanya wajib
  if (!jurusan || !institusi || !tahun) {
    return res.status(400).json({ message: 'Jurusan, institusi, and tahun are required for update.' });
  }

  db.query(
    'UPDATE education SET jurusan = ?, institusi = ?, tahun = ? WHERE id = ?', // Urutan UPDATE disesuaikan
    [jurusan, institusi, tahun, id],
    (err, result) => {
      if (err) {
        console.error('Error updating education entry:', err);
        return res.status(500).json({ message: 'Error updating education entry', error: err.message });
      }
      // Periksa apakah ada baris yang terpengaruh
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Education entry with given ID not found.' });
      }
      // Kirim respons sukses dengan data pendidikan yang diperbarui
      res.status(200).json({ message: 'Education entry updated successfully', education: { id, jurusan, institusi, tahun } });
    }
  );
});

// DELETE an education entry
// Menghapus entri pendidikan berdasarkan ID
router.delete('/:id', (req, res) => {
  const { id } = req.params; // Ambil ID dari parameter URL
  db.query('DELETE FROM education WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error deleting education entry:', err);
      return res.status(500).json({ message: 'Error deleting education entry', error: err.message });
    }
    // Periksa apakah ada baris yang terpengaruh
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Education entry with given ID not found.' });
    }
    res.sendStatus(204); // Kirim status 204 No Content untuk penghapusan yang berhasil
  });
});

module.exports = router;
