const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');

const app = express();

// Configuration du moteur de vue
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Assurez-vous que ce chemin est correct
app.set('layout', 'layouts/layout');

// Middleware pour les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Middleware pour définir des valeurs par défaut
app.use((req, res, next) => {
  res.locals.locale = 'fr';
  res.locals.translations = require('./views/lang/fr.json');
  next();
});

// Routes
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});