// backend/routes/auth.js
// Rute untuk otentikasi pengguna (login)
const express = require('express');
const router = express.Router();
const db = require('../db'); // Import koneksi database

// POST login
// Memproses permintaan login dari pengguna
router.post('/login', (req, res) => {
  const { username, password } = req.body; // Ambil username dan password dari body permintaan

  // Validasi dasar input
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required.' });
  }

  // Query database untuk mencari pengguna dengan username dan password yang cocok
  db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, results) => {
    if (err) {
      console.error('Error during login:', err);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
    // Jika ditemukan pengguna, kirim respons sukses
    if (results.length > 0) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      // Jika tidak ditemukan, kirim respons gagal otentikasi
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  });
});

module.exports = router;
