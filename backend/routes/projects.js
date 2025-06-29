// backend/routes/projects.js
// Rute untuk mengelola data proyek portfolio
const express = require('express');
const router = express.Router();
const db = require('../db'); // Import koneksi database

// GET all projects
// Mengambil semua catatan proyek
router.get('/', (req, res) => {
  // Urutan SELECT disesuaikan dengan urutan kolom di tabel 'projects' di schema.sql
  db.query('SELECT id, nama_project, deskripsi, link, gambar FROM projects', (err, results) => {
    if (err) {
      console.error('Error fetching projects:', err);
      return res.status(500).json({ message: 'Error fetching projects', error: err.message });
    }
    res.json(results); // Kirim semua hasil proyek
  });
});

// POST a new project
// Menambahkan proyek baru
router.post('/', (req, res) => {
  const { nama_project, deskripsi, link, gambar } = req.body; // Ambil data dari body, urutan disesuaikan

  // Validasi: nama_project dan deskripsi dianggap wajib untuk aplikasi ini
  if (!nama_project || !deskripsi) {
    return res.status(400).json({ message: 'Nama Project and Deskripsi are required.' });
  }

  const query = 'INSERT INTO projects (nama_project, deskripsi, link, gambar) VALUES (?, ?, ?, ?)'; // Urutan INSERT disesuaikan
  db.query(query, [nama_project, deskripsi, link, gambar], (err, result) => {
    if (err) {
      console.error('Error inserting project:', err);
      return res.status(500).json({ message: 'Error inserting project', error: err.message });
    }
    // Kirim respons sukses dengan ID yang baru dibuat dan data yang dimasukkan
    res.status(201).json({ id: result.insertId, nama_project, deskripsi, link, gambar });
  });
});

// PUT (update project)
// Memperbarui proyek berdasarkan ID
router.put('/:id', (req, res) => {
  const { id } = req.params; // Ambil ID dari parameter URL
  const { nama_project, deskripsi, link, gambar } = req.body; // Ambil data dari body, urutan disesuaikan

  // Validasi: nama_project dan deskripsi dianggap wajib untuk pembaruan
  if (!nama_project || !deskripsi) {
    return res.status(400).json({ message: 'Nama Project and Deskripsi are required for update.' });
  }

  const query = 'UPDATE projects SET nama_project = ?, deskripsi = ?, link = ?, gambar = ? WHERE id = ?'; // Urutan UPDATE disesuaikan
  db.query(query, [nama_project, deskripsi, link, gambar, id], (err, result) => {
    if (err) {
      console.error('Error updating project:', err);
      return res.status(500).json({ message: 'Error updating project', error: err.message });
    }
    // Periksa apakah ada baris yang terpengaruh
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Project with given ID not found.' });
    }
    // Kirim respons sukses dengan data proyek yang diperbarui
    res.json({ message: 'Project updated successfully', project: { id, nama_project, deskripsi, link, gambar } });
  });
});

// DELETE project
// Menghapus proyek berdasarkan ID
router.delete('/:id', (req, res) => {
  const { id } = req.params; // Ambil ID dari parameter URL
  db.query('DELETE FROM projects WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error deleting project:', err);
      return res.status(500).json({ message: 'Error deleting project', error: err.message });
    }
    // Periksa apakah ada baris yang terpengaruh
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Project with given ID not found.' });
    }
    res.json({ message: 'Project deleted successfully' });
  });
});

module.exports = router;
