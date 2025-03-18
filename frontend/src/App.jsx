// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
// Importation des composants nécessaires
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Navbar from './components/Layout/NavBar';
import ChatWindow from './components/Chat/ChatWindow';
import GroupChat from './components/Group/GroupChat';
import GroupSettings from './components/Group/GroupSettings';
import GroupList from './components/Group/GroupList';
import UserProfile from './components/User/UserProfile';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Routes pour l'authentification */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Route pour la menulaterale */}
          <Route path="/menu" element={<Navbar />} />

          {/* Routes pour les chats */}
          <Route path="/chat" element={<ChatWindow />} />
          

          {/* Route pour les paramètres du groupe */}
          <Route path="/group-settings" element={<GroupSettings />} />
          <Route path="/group-chat" element={<GroupChat />} />
          <Route path="/group-List" element={<GroupList />} />

          {/* Route pour le profil utilisateur */}
          <Route path="/user-profile" element={<UserProfile />} />

          {/* Route par défaut (peut rediriger vers la page de connexion ou d'accueil) */}
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
