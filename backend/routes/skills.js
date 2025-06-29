// backend/routes/skills.js
// Rute untuk mengelola data keterampilan
const express = require('express');
const router = express.Router();
const db = require('../db'); // Import koneksi database

// GET all skills
// Mengambil semua catatan keterampilan
router.get('/', (req, res) => {
  db.query('SELECT id, nama_skill, level FROM skills', (err, results) => { // Urutan SELECT disesuaikan
    if (err) {
      console.error('Error fetching skills:', err);
      return res.status(500).json({ message: 'Error fetching skills', error: err.message });
    }
    res.json(results); // Kirim semua hasil keterampilan
  });
});

// POST a new skill
// Menambahkan keterampilan baru
router.post('/', (req, res) => {
  const { nama_skill, level } = req.body; // Ambil data dari body, urutan disesuaikan

  // Validasi: nama_skill dan level dianggap wajib untuk aplikasi ini
  if (!nama_skill || !level) {
    return res.status(400).json({ message: 'Nama skill and level are required.' });
  }

  db.query('INSERT INTO skills (nama_skill, level) VALUES (?, ?)', [nama_skill, level], (err, result) => { // Urutan INSERT disesuaikan
    if (err) {
      console.error('Error inserting skill:', err);
      return res.status(500).json({ message: 'Error inserting skill', error: err.message });
    }
    // Kirim respons sukses dengan ID yang baru dibuat dan data yang dimasukkan
    res.status(201).json({ id: result.insertId, nama_skill, level });
  });
});

// UPDATE skill
// Memperbarui keterampilan berdasarkan ID
router.put('/:id', (req, res) => {
  const { id } = req.params; // Ambil ID dari parameter URL
  const { nama_skill, level } = req.body; // Ambil data dari body, urutan disesuaikan

  // Validasi: nama_skill dan level dianggap wajib untuk pembaruan
  if (!nama_skill || !level) {
    return res.status(400).json({ message: 'Nama skill and level are required for update.' });
  }

  const query = 'UPDATE skills SET nama_skill = ?, level = ? WHERE id = ?'; // Urutan UPDATE disesuaikan
  db.query(query, [nama_skill, level, id], (err, result) => {
    if (err) {
      console.error('Error updating skill:', err);
      return res.status(500).json({ message: 'Error updating skill', error: err.message });
    }
    // Periksa apakah ada baris yang terpengaruh
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Skill with given ID not found.' });
    }
    res.json({ message: 'Skill updated successfully', skill: { id, nama_skill, level } });
  });
});

// DELETE skill
// Menghapus keterampilan berdasarkan ID
router.delete('/:id', (req, res) => {
  const { id } = req.params; // Ambil ID dari parameter URL
  db.query('DELETE FROM skills WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error deleting skill:', err);
      return res.status(500).json({ message: 'Error deleting skill', error: err.message });
    }
    // Periksa apakah ada baris yang terpengaruh
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Skill with given ID not found.' });
    }
    res.json({ message: 'Skill deleted successfully' });
  });
});

module.exports = router;
