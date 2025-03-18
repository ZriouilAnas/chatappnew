import React, { useState } from 'react';
import { Bell, MessageCircle, Users, Sun, Moon } from 'lucide-react';
import AlloChatLogo from '../../assets/photos/AlloChat.png';
import Conversations from '../Chat/ChatWindow';
import GroupChat from '../Group/GroupChat';
import Notifications from '../Notifications/Notifications';

const Navbar = () => {
  const [activeTab, setActiveTab] = useState('conversations');
  const [darkMode, setDarkMode] = useState(false); // État pour gérer le mode sombre

  const toggleDarkMode = () => setDarkMode(!darkMode); // Fonction pour basculer le mode sombre

  const NavItem = ({ icon: Icon, label, id }) => (
    <div 
      className={`flex flex-col items-center justify-center py-4 cursor-pointer transition-colors group ${
        activeTab === id 
          ? 'bg-purple-600 text-white' 
          : 'hover:bg-gray-100 text-gray-600 hover:text-purple-600'
      }`}
      onClick={() => setActiveTab(id)}
    >
      <Icon 
        className={`w-6 h-6 mb-1 ${
          activeTab === id 
            ? 'text-white' 
            : 'text-gray-500 group-hover:text-purple-600'
        }`} 
      />
      <span className="text-xs">{label}</span>
    </div>
  );

  return (
    <div className={`flex h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      {/* Vertical Navbar */}
      <div className={`w-22 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r flex flex-col`}>
        <div className="flex items-center m-2">
          <div className="flex items-center ">
            <div className="w-18 h-16 bg-blue-500 rounded-full flex items-center justify-center">
              <img src={AlloChatLogo} alt="AlloChat Logo" className="w-17 h-15 rounded-full" />
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-grow">
          <NavItem 
            icon={Bell} 
            label="Notifications" 
            id="notifications" 
          />
          <NavItem 
            icon={MessageCircle} 
            label="Conversations" 
            id="conversations" 
          />
          <NavItem 
            icon={Users} 
            label="Équipes" 
            id="teams" 
          />
        </div>
        
        {/* User Profile Bottom */}
        <div className="pb-4 flex justify-center">
          <div 
            className={`w-10 h-10 ${darkMode ? 'bg-blue-600' : 'bg-blue-500'} text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600`}
            onClick={() => alert('User Profile')}
          >
            <span className="font-bold">JD</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col">
        {/* Header */}
        <header className={`flex justify-between items-center p-4 border-b ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} shadow-sm`}>
          <div className="flex items-center">
            {/* Vous pouvez ajouter du contenu ici si nécessaire */}
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleDarkMode} 
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              {darkMode ? <Sun size={24} className="text-yellow-400" /> : <Moon size={24} className="text-indigo-600" />}
            </button>
            <div 
              className={`w-10 h-10 ${darkMode ? 'bg-gray-700' : 'bg-blue-100'} rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-200 transition-colors`}
              onClick={() => alert('User Profile')}
            >
              <span className={`${darkMode ? 'text-white' : 'text-blue-600'} font-bold`}>JD</span>
            </div>
          </div>
        </header>

        {/* Contenu dynamique */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'notifications' && (
            <div className={`p-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
              <Notifications darkMode={darkMode} />
            </div>
          )}
          {activeTab === 'conversations' && (
            <div className={`p-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
              <Conversations darkMode={darkMode} /> {/* Passez darkMode en tant que prop */}
            </div>
          )}
          {activeTab === 'teams' && (
            <div className={`p-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
              <GroupChat darkMode={darkMode} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;