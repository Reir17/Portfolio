// backend/routes/contacts.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all contact messages
router.get('/', (req, res) => {
  db.query('SELECT id, name, email, message, timestamp FROM contacts ORDER BY timestamp DESC', (err, results) => {
    if (err) {
      console.error('Error fetching contact messages:', err);
      return res.status(500).json({ message: 'Error fetching contact messages', error: err.message });
    }
    res.json(results);
  });
});

// POST a new contact message
router.post('/', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email, and message are required fields.' });
  }

  // Insert contact message into the database
  db.query(
    'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)',
    [name, email, message],
    (err, result) => {
      if (err) {
        console.error('Error inserting contact message:', err);
        return res.status(500).json({ message: 'Error submitting contact message', error: err.message });
      }
      res.status(201).json({ id: result.insertId, name, email, message, timestamp: new Date() });
    }
  );
});

// DELETE a contact message
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM contacts WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error deleting contact message:', err);
      return res.status(500).json({ message: 'Error deleting contact message', error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Contact message with given ID not found.' });
    }
    res.sendStatus(204); // No Content
  });
});

module.exports = router;
