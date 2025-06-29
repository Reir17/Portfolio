// backend/routes/hero.js
const express = require('express');
const router = express.Router();
const db = require('../db'); // Pastikan path ke db.js sudah benar

// GET hero text (mengambil satu baris data Hero Section)
router.get('/', (req, res) => {
  // --- Tambahkan kolom baru ke kueri SELECT ---
  db.query("SELECT id, name, role_text, main_title, year_text, email, social_linkedin, social_github, social_instagram FROM hero_text WHERE id = 1", (err, results) => {
    if (err) {
      console.error("Error fetching hero text:", err); // Log error di server
      res.status(500).json({ error: err.message });
      return;
    }
    // mysql2 mengembalikan array of rows, kita hanya perlu yang pertama (atau objek kosong jika tidak ada)
    res.json(results[0] || {});
  });
});

// UPDATE hero text (memperbarui data Hero Section)
router.put('/', (req, res) => {
  // --- Dapatkan kolom baru dari body permintaan ---
  const { name, role_text, main_title, year_text, email, social_linkedin, social_github, social_instagram } = req.body;

  // --- Validasi input untuk semua field baru ---
  if (!name || !role_text || !main_title || !year_text || !email) { // Email juga wajib di sini
    return res.status(400).json({ error: 'Name, Role, Title, Year, and Email are all required' });
  }

  // Coba update entry dengan id = 1
  // --- Update query dengan kolom baru ---
  db.query(`UPDATE hero_text SET name = ?, role_text = ?, main_title = ?, year_text = ?, email = ?, social_linkedin = ?, social_github = ?, social_instagram = ? WHERE id = 1`,
    [name, role_text, main_title, year_text, email, social_linkedin, social_github, social_instagram],
    (err, result) => {
      if (err) {
        console.error("Error updating hero text:", err); // Log error di server
        res.status(500).json({ error: err.message });
        return;
      }
      if (result.affectedRows === 0) {
        // Jika tidak ada baris yang terupdate (berarti id=1 tidak ada),
        // maka sisipkan sebagai baris baru dengan id 1.
        // Ini sebagai fallback jika data awal tidak ada atau terhapus.
        // --- Insert query dengan kolom baru ---
        db.query(`INSERT INTO hero_text (id, name, role_text, main_title, year_text, email, social_linkedin, social_github, social_instagram) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [1, name, role_text, main_title, year_text, email, social_linkedin, social_github, social_instagram], // Tetapkan ID secara eksplisit ke 1
          (err, insertResult) => {
            if (err) {
              console.error("Error inserting hero text fallback:", err.message);
              res.status(500).json({ error: err.message });
              return;
            }
            res.status(201).json({ message: 'Hero text inserted as fallback successfully', id: 1, name, role_text, main_title, year_text, email, social_linkedin, social_github, social_instagram });
          }
        );
      } else {
        res.status(200).json({ message: 'Hero text updated successfully', id: 1, name, role_text, main_title, year_text, email, social_linkedin, social_github, social_instagram });
      }
    }
  );
});

module.exports = router;
