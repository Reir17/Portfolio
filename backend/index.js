const express = require('express');
const cors = require('cors');
const db = require('./db');
const skillRoutes = require('./routes/skills');
const projectRoutes = require('./routes/projects');
const authRoutes = require('./routes/auth');
const experienceRoutes = require('./routes/experiences');
const educationRoutes = require('./routes/education');
const activityRoutes = require('./routes/activities');
const heroRoutes = require('./routes/hero');
const aboutRoutes = require('./routes/about');
const articleRoutes = require('./routes/articles'); // Pastikan ini diimpor
const contactRoutes = require('./routes/contacts'); // Pastikan ini diimpor
const hobbyRoutes = require('./routes/hobbies'); // --- TAMBAHKAN INI ---


const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/skills', skillRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/experiences', experienceRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/hero', heroRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/articles', articleRoutes); // Pastikan ini digunakan
app.use('/api/contacts', contactRoutes); // Pastikan ini digunakan
app.use('/api/hobbies', hobbyRoutes); // --- TAMBAHKAN INI ---


// Contoh middleware logging untuk projects API
app.use('/api/projects', (req, res, next) => {
  console.log(`[PROJECTS API] ${req.method} ${req.originalUrl}`);
  next();
}, projectRoutes);


app.listen(3001, () => console.log('Server running on http://localhost:3001'));
