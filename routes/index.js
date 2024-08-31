const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Fonction pour charger les traductions
const loadTranslations = (lang) => {
  return require(`../views/lang/${lang}.json`);
};

// Routes existantes
router.get('/', (req, res) => {
  const lang = req.query.lang || 'fr';
  res.locals.locale = lang;
  res.locals.translations = loadTranslations(lang);
  res.render('pages/home', { 
    title: res.locals.translations.welcome,
    user: req.session.user // Ajoutez cette ligne
  });
});

router.get('/warhammer40k', (req, res) => {
  const lang = req.query.lang || 'fr';
  const translations = loadTranslations(lang);
  res.render('pages/warhammer40k', { 
    title: translations.warhammer_40k,
    translations,
    locale: lang,
    game: 'Warhammer 40k',
    user: req.session && req.session.user ? req.session.user : null // Modification ici
  });
});

router.get('/warhammer', (req, res) => {
  const lang = req.query.lang || 'fr';
  const translations = loadTranslations(lang);
  res.render('pages/warhammer', { 
    title: translations.warhammer,
    translations,
    locale: lang,
    game: 'Warhammer',
    user: req.session && req.session.user ? req.session.user : null // Modification ici
  });
});

router.get('/profile', (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/auth/login');
  }
  const lang = req.query.lang || 'fr';
  res.locals.locale = lang;
  res.locals.translations = loadTranslations(lang);
  res.render('pages/profile', { title: res.locals.translations.profile });
});

router.get('/actif_business', (req, res) => {
  const lang = req.query.lang || 'fr';
  res.locals.locale = lang;
  res.locals.translations = loadTranslations(lang);
  res.render('pages/actif_business', { title: res.locals.translations.actif_business });
});

router.get('/actif_ideas', (req, res) => {
  const lang = req.query.lang || 'fr';
  res.locals.locale = lang;
  res.locals.translations = loadTranslations(lang);
  res.render('pages/actif_ideas', { title: res.locals.translations.actif_ideas });
});

router.get('/contact', (req, res) => {
  const lang = req.query.lang || 'fr';
  res.locals.locale = lang;
  res.locals.translations = loadTranslations(lang);
  res.render('pages/contact', { title: res.locals.translations.contact });
});

router.get('/about', (req, res) => {
  const lang = req.query.lang || 'fr';
  res.locals.locale = lang;
  res.locals.translations = loadTranslations(lang);
  res.render('pages/about', { title: res.locals.translations.about });
});

// Routes d'authentification
router.get('/login', (req, res) => {
  res.render('pages/login', { title: 'Login' });
});

router.post('/login', authController.login);

router.get('/register', (req, res) => {
  res.render('pages/register', { title: 'Register' });
});

router.post('/register', authController.register);

router.get('/logout', authController.logout);

module.exports = router;