import React, { createContext, useState, useContext } from 'react';

// Création d'un contexte pour l'authentification
const AuthContext = createContext();

// Base de données temporaire des utilisateurs
const usersDatabase = [
  { id: '1', username: 'john_doe', email: 'john@example.com', password: 'password123' },
  { id: '2', username: 'jane_doe', email: 'jane@example.com', password: 'password456' },
];

// Fonction pour vérifier si un utilisateur existe déjà
const checkUserExists = (username, email) => {
  return usersDatabase.some(
    (user) => user.username === username || user.email === email
  );
};

// Fonction pour enregistrer un nouvel utilisateur
const registerUser = (username, email, password) => {
  if (checkUserExists(username, email)) {
    return { success: false, message: 'Nom d\'utilisateur ou email déjà pris' };
  }

  const newUser = { id: (usersDatabase.length + 1).toString(), username, email, password };
  usersDatabase.push(newUser);
  return { success: true, message: 'Utilisateur inscrit avec succès', user: newUser };
};

// Fonction pour connecter un utilisateur
const loginUser = (email, password) => {
  const user = usersDatabase.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    return { success: true, message: 'Connexion réussie', user };
  } else {
    return { success: false, message: 'Identifiants incorrects' };
  }
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const register = (username, email, password) => {
    const result = registerUser(username, email, password);
    if (result.success) {
      setCurrentUser(result.user);
    }
    return result;
  };

  const login = (email, password) => {
    const result = loginUser(email, password);
    if (result.success) {
      setCurrentUser(result.user);
    }
    return result;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
