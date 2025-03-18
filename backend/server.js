const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const db = require('./config/db');

dotenv.config();

const app = express();

// Middleware pour parser le corps de la requête
app.use(express.json());
app.use(cors());

// Connexion à la base de données avec une promesse
db.query('SELECT 1')
  .then(() => {
    console.log('Connecté à MySQL');
  })
  .catch((err) => {
    console.log('Erreur de connexion à MySQL:', err);
  });


// Routes d'authentification
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Serveur tournant sur le port ${PORT}`);
});
