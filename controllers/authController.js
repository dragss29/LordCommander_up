const bcrypt = require('bcrypt');
const db = require('../config/database');

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    if (rows.length > 0) {
      const match = await bcrypt.compare(password, rows[0].password);
      if (match) {
        req.session.userId = rows[0].id;
        res.redirect('/');
      } else {
        res.render('pages/login', { error: 'Invalid username or password' });
      }
    } else {
      res.render('pages/login', { error: 'Invalid username or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
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