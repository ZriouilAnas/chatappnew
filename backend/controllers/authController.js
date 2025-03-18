const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const dotenv = require('dotenv');

dotenv.config();

// Inscription d'un utilisateur
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Vérifier si l'email ou le nom d'utilisateur existent déjà
    const [emailExist] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    const [usernameExist] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);

    if (emailExist.length > 0) {
      return res.status(400).json({ message: 'Email déjà utilisé.' });
    }

    if (usernameExist.length > 0) {
      return res.status(400).json({ message: 'Nom d\'utilisateur déjà pris.' });
    }

    // Hachage du mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insérer l'utilisateur dans la base de données
    const [result] = await db.execute(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );

    res.status(201).json({ message: 'Utilisateur créé avec succès.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur du serveur.' });
  }
};

// Connexion d'un utilisateur
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Recherche de l'utilisateur par email
    const [user] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (user.length === 0) {
      return res.status(400).json({ message: 'Utilisateur non trouvé.' });
    }

    // Vérification du mot de passe
    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mot de passe incorrect.' });
    }

    // Création du token JWT
    const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      message: 'Connexion réussie.',
      token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur du serveur.' });
  }
};

module.exports = { registerUser, loginUser };
