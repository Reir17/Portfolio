// backend/routes/hobbies.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all hobbies
router.get('/', (req, res) => {
  db.query('SELECT id, hobby_name, is_bold FROM hobbies', (err, results) => {
    if (err) {
      console.error('Error fetching hobbies:', err);
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// POST a new hobby
router.post('/', (req, res) => {
  const { hobby_name, is_bold } = req.body;
  if (!hobby_name) {
    return res.status(400).json({ message: 'Hobby name is a required field.' });
  }
  db.query(
    'INSERT INTO hobbies (hobby_name, is_bold) VALUES (?, ?)',
    [hobby_name, is_bold],
    (err, result) => {
      if (err) {
        console.error('Error adding hobby:', err);
        return res.status(500).send(err);
      }
      res.status(201).json({ id: result.insertId, hobby_name, is_bold });
    }
  );
});

// PUT (update) an existing hobby
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { hobby_name, is_bold } = req.body;

  if (!hobby_name) {
    return res.status(400).json({ message: 'Hobby name is a required field.' });
  }

  db.query(
    'UPDATE hobbies SET hobby_name = ?, is_bold = ? WHERE id = ?',
    [hobby_name, is_bold, id],
    (err, result) => {
      if (err) {
        console.error('Error updating hobby:', err);
        return res.status(500).send(err);
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Hobby with given ID not found.' });
      }
      res.status(200).json({ message: 'Hobby updated successfully', hobby: { id, hobby_name, is_bold } });
    }
  );
});

// DELETE a hobby
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM hobbies WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error deleting hobby:', err);
      return res.status(500).send(err);
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Hobby with given ID not found.' });
    }
    res.status(200).json({ message: 'Hobby deleted successfully' });
  });
});

module.exports = router;
