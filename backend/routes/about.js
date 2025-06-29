// backend/routes/about.js
// Route to manage "About Me" data
const express = require('express');
const router = express.Router();
const db = require('../db'); // Import database connection

// GET about me data
// Retrieves "About Me" data (assuming there's only one entry with ID 1)
router.get('/', (req, res) => {
  // Select id, description, image URL, and name from about_me where id is 1
  db.query('SELECT id, deskripsi, gambar_url, name FROM about_me WHERE id = 1', (err, results) => {
    if (err) {
      console.error('Error fetching about me data:', err); // Log error on the server
      return res.status(500).json({ message: 'Error fetching about me data', error: err.message });
    }
    // If no data, send an empty object as default
    if (results.length === 0) {
      return res.json({ id: 1, deskripsi: '', gambar_url: '', name: '' });
    }
    res.json(results[0]); // Send the first (and only) row
  });
});

// UPDATE about me data
// Updates "About Me" data based on ID
router.put('/:id', (req, res) => {
  const { id } = req.params; // Get ID from URL parameters
  const { deskripsi, gambar_url, name } = req.body; // Get description, image URL, and name from request body

  // Validation: ensure description is not empty (according to NOT NULL schema)
  if (!deskripsi) {
    return res.status(400).json({ message: 'Deskripsi is a required field.' });
  }

  db.query(
    'UPDATE about_me SET deskripsi = ?, gambar_url = ?, name = ? WHERE id = ?',
    [deskripsi, gambar_url, name, id],
    (err, result) => {
      if (err) {
        console.error('Error updating about me data:', err);
        // Check for specific MySQL error code if a column doesn't exist
        if (err.code === 'ER_BAD_FIELD_ERROR') {
            return res.status(400).json({ error: 'Database column not found. Ensure deskripsi, gambar_url, and name exist in the about_me table.' });
        }
        return res.status(500).json({ message: 'Error updating about me data', error: err.message });
      }
      // Check if any rows were affected (meaning ID was found and updated)
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'About Me data with given ID not found.' });
      }
      res.status(200).json({ message: 'About Me data updated successfully', about: { id, deskripsi, gambar_url, name } });
    }
  );
});

module.exports = router;
