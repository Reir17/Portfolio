// backend/db.js
// Konfigurasi koneksi database MySQL
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'irpan123', // Kosongkan jika tidak ada password, atau isi dengan password MySQL Anda
  database: 'portfolio_db' // Nama database diubah menjadi 'portfolio_db'
});

// Tes koneksi database
db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to database as id ' + db.threadId);
});

module.exports = db;
