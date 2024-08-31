const bcrypt = require('bcrypt');
const { pool } = require('../config/database');

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    if (rows.length > 0) {
      const match = await bcrypt.compare(password, rows[0].password);
      if (match) {
        req.session.userId = rows[0].id;
        res.redirect('/');
      } else {
        res.render('pages/login', { error: 'Nom d\'utilisateur ou mot de passe incorrect' });
      }
    } else {
      res.render('pages/login', { error: 'Nom d\'utilisateur ou mot de passe incorrect' });
    }
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    res.status(500).send('Erreur serveur');
  }
};

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);
    res.redirect('/login');
  } catch (error) {
    console.error(error);
    res.render('pages/register', { error: 'Registration failed' });
  }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
    }
    res.redirect('/');
  });
};