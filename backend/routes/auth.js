// routes/auth.js
const express = require('express');
const router = express.Router();

// Exemple de route de connexion
router.post('/login', (req, res) => {
  // Logique de connexion
  res.send('Connexion réussie');
});

// Exemple de route d'inscription
router.post('/register', (req, res) => {
  // Logique d'inscription
  res.send('Inscription réussie');
});

module.exports = router;
