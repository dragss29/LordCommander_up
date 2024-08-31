const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const session = require('express-session'); // Ajoutez cette ligne

const app = express();

// Assurez-vous que ces lignes sont présentes et dans le bon ordre
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuration du moteur de vue
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Assurez-vous que ce chemin est correct
app.set('layout', 'layouts/layout');

// Configuration de la session
app.use(session({
  secret: 'votre_secret_ici',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// Middleware pour les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Middleware pour définir des valeurs par défaut
app.use((req, res, next) => {
  res.locals.locale = 'fr';
  res.locals.translations = require('./views/lang/fr.json');
  res.locals.user = req.session.user || null; // Ajoutez cette ligne
  next();
});

// Routes
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// Démarrage du serveur
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});