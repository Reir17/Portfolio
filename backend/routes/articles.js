// backend/routes/articles.js
const express = require('express');
const router = express.Router();
const db = require('../db'); // Jalur ini sudah benar

// GET all articles
router.get('/', (req, res) => {
  // Tambahkan 'article_url' ke dalam kolom yang dipilih
  db.query('SELECT id, title, author, date, content, image_url, article_url FROM articles ORDER BY id ASC', (err, results) => {
    if (err) {
      console.error('Error fetching articles:', err);
      return res.status(500).json({ message: 'Error fetching articles', error: err.message });
    }
    res.json(results);
  });
});

// GET article by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  // Tambahkan 'article_url' ke dalam kolom yang dipilih
  db.query('SELECT id, title, author, date, content, image_url, article_url FROM articles WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Error fetching article by ID:', err);
      return res.status(500).json({ message: 'Error fetching article', error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Article not found.' });
    }
    res.json(results[0]);
  });
});

// POST a new article
router.post('/', (req, res) => {
  // Destructure semua field, termasuk article_url
  const { title, author, date, content, image_url, article_url } = req.body;

  if (!title || !author || !date || !content) {
    return res.status(400).json({ message: 'Title, author, date, and content are required fields.' });
  }

  db.query(
    // Tambahkan 'article_url' ke dalam query INSERT
    'INSERT INTO articles (title, author, date, content, image_url, article_url) VALUES (?, ?, ?, ?, ?, ?)',
    // Pastikan nilai article_url disertakan di sini
    [title, author, date, content, image_url, article_url],
    (err, result) => {
      if (err) {
        console.error('Error inserting article:', err);
        // Tambahkan penanganan error jika kolom tidak ditemukan
        if (err.code === 'ER_BAD_FIELD_ERROR') {
          return res.status(400).json({ error: 'Kolom database tidak ditemukan. Pastikan article_url ada di tabel articles.' });
        }
        return res.status(500).json({ message: 'Error inserting article', error: err.message });
      }
      // Kembalikan juga article_url dalam respons
      res.status(201).json({ id: result.insertId, title, author, date, content, image_url, article_url });
    }
  );
});

// PUT (update article)
router.put('/:id', (req, res) => {
  const { id } = req.params;
  // Destructure semua field, termasuk article_url
  const { title, author, date, content, image_url, article_url } = req.body;

  if (!title || !author || !date || !content) {
    return res.status(400).json({ message: 'Title, author, date, and content are required fields for update.' });
  }

  db.query(
    // Tambahkan 'article_url = ?' ke dalam query UPDATE
    'UPDATE articles SET title = ?, author = ?, date = ?, content = ?, image_url = ?, article_url = ? WHERE id = ?',
    // Pastikan nilai article_url disertakan di sini
    [title, author, date, content, image_url, article_url, id],
    (err, result) => {
      if (err) {
        console.error('Error updating article:', err);
        // Tambahkan penanganan error jika kolom tidak ditemukan
        if (err.code === 'ER_BAD_FIELD_ERROR') {
          return res.status(400).json({ error: 'Kolom database tidak ditemukan. Pastikan article_url ada di tabel articles.' });
        }
        return res.status(500).json({ message: 'Error updating article', error: err.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Article with given ID not found.' });
      }
      // Kembalikan juga article_url dalam respons
      res.status(200).json({ message: 'Article updated successfully', article: { id, title, author, date, content, image_url, article_url } });
    }
  );
});

// DELETE article
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM articles WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error deleting article:', err);
      return res.status(500).json({ message: 'Error deleting article', error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Article with given ID not found.' });
    }
    res.sendStatus(204); // No Content
  });
});

module.exports = router;
