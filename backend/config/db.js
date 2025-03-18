const mysql = require('mysql2');

// Créer une connexion ou un pool de connexions
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Promesse de connexion (utile pour l'asynchronisme)
const promisePool = pool.promise();

module.exports = promisePool;