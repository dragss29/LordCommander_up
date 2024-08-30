const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'u561197304_lordcommander',
  password: 'i.e53ZE,',
  database: 'u561197304_lord',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Fonction pour obtenir la langue préférée de l'utilisateur
async function getUserPreferredLanguage(userId) {
  try {
    const [rows] = await pool.promise().query('SELECT preferred_language FROM users WHERE id = ?', [userId]);
    return rows[0] ? rows[0].preferred_language : 'fr';
  } catch (error) {
    console.error('Erreur lors de la récupération de la langue préférée:', error);
    return 'fr';
  }
}

module.exports = {
  pool: pool.promise(),
  getUserPreferredLanguage
};