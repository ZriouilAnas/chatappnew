import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Plus, 
  Filter, 
  MoreVertical, 
  Send, 
  Paperclip, 
  PhoneCall, 
  Video, 
  UserPlus,
  Smile
} from 'lucide-react';
import chatWallpaper from '../../assets/photos/ChatWallpaper.jpg';

const AlloChat = ({ darkMode }) => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [messageText, setMessageText] = useState('');

  const conversations = [
    { 
      id: 1, 
      name: 'John Doe', 
      avatar: null,
      lastMessage: 'Sure, let\'s schedule the meeting',
      lastMessageTime: '10:30 AM',
      unreadCount: 3,
      online: true
    },
    { 
      id: 2, 
      name: 'Emily Johnson', 
      avatar: null,
      lastMessage: 'The report is almost ready',
      lastMessageTime: '09:45 AM',
      unreadCount: 1,
      online: false
    },
    { 
      id: 3, 
      name: 'Marketing Team', 
      avatar: null,
      lastMessage: 'Campaign strategy discussion',
      lastMessageTime: '11:15 AM',
      unreadCount: 0,
      online: true
    }
  ];

  const conversationMessages = {
    1: [
      { 
        id: 1, 
        sender: 'John Doe', 
        text: 'Hi there! Can we discuss the project timeline?', 
        timestamp: '10:25 AM',
        type: 'received'
      },
      { 
        id: 2, 
        sender: 'You', 
        text: 'Sure, let\'s schedule the meeting', 
        timestamp: '10:30 AM',
        type: 'sent'
      }
    ],
    2: [
      { 
        id: 1, 
        sender: 'Emily Johnson', 
        text: 'I\'m finalizing the quarterly report', 
        timestamp: '09:40 AM',
        type: 'received'
      }
    ],
    3: [
      { 
        id: 1, 
        sender: 'Marketing Lead', 
        text: 'Let\'s review our Q1 campaign strategy', 
        timestamp: '11:10 AM',
        type: 'received'
      }
    ]
  };

  const filteredConversations = conversations.filter(conv => 
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sendMessage = () => {
    if (messageText.trim()) {
      // Logic to send message
      console.log('Sending message:', messageText);
      setMessageText('');
    }
  };

  const renderAvatar = (conversation) => {
    const initial = conversation.name.charAt(0).toUpperCase();
    return (
      <div className={`relative w-12 h-12 rounded-full flex items-center justify-center ${
        darkMode ? 'bg-purple-800' : 'bg-purple-100'
      }`}>
        <span className={`font-bold ${darkMode ? 'text-purple-300' : 'text-purple-600'}`}>
          {initial}
        </span>
        {conversation.online && (
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
        )}
      </div>
    );
  };

  return (
    <div className="flex h-screen">
      {/* Conversations List */}
      <div className={`w-1/4 p-4 border-r border-2 border-blue-800 rounded-xl mr-4 ${
        darkMode 
          ? 'bg-gray-800 border-gray-700 text-white' 
          : 'bg-white border-gray-200 text-black'
      }`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Conversations</h2>
          <div className="flex space-x-2">
            <button 
              className={`p-2 rounded-full hover:bg-opacity-10 ${
                darkMode 
                  ? 'hover:bg-white text-gray-300' 
                  : 'hover:bg-gray-200 text-gray-600'
              }`}
            >
              <Plus size={20} />
            </button>
            <button 
              className={`p-2 rounded-full hover:bg-opacity-10 ${
                darkMode 
                  ? 'hover:bg-white text-gray-300' 
                  : 'hover:bg-gray-200 text-gray-600'
              }`}
            >
              <Filter size={20} />
            </button>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative mb-4">
          <Search 
            className={`absolute left-3 top-2.5 ${
              darkMode ? 'text-gray-500' : 'text-gray-400'
            }`} 
            size={18} 
          />
          <input
            type="text"
            placeholder="Rechercher des conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white focus:ring-purple-500'
                : 'bg-gray-100 border-gray-300 text-black focus:ring-purple-300'
            }`}
          />
        </div>

        {/* Conversations List */}
        <div className="space-y-2">
          {filteredConversations.map((conversation) => (
            <div 
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation)}
              className={`p-3 rounded-lg flex items-center cursor-pointer transition-all duration-300 ${
                selectedConversation?.id === conversation.id 
                  ? (darkMode 
                      ? 'bg-purple-900/50 ring-2 ring-purple-700' 
                      : 'bg-purple-100 ring-2 ring-purple-200')
                  : (darkMode 
                      ? 'hover:bg-gray-700' 
                      : 'hover:bg-gray-100')
              }`}
            >
              {renderAvatar(conversation)}
              <div className="ml-3 flex-1">
                <div className="flex justify-between items-center">
                  <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {conversation.name}
                  </p>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {conversation.lastMessageTime}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p className={`text-sm truncate ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {conversation.lastMessage}
                  </p>
                  {conversation.unreadCount > 0 && (
                    <div className={`ml-2 px-2 py-1 rounded-full text-xs ${
                      darkMode 
                        ? 'bg-purple-700 text-white' 
                        : 'bg-purple-500 text-white'
                    }`}>
                      {conversation.unreadCount}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Conversation Details */}
      <div className={`w-3/4 flex flex-col ${
        darkMode 
          ? 'bg-gray-900 text-white' 
          : 'bg-gray-50 text-black'
      }`} 
      >
        {selectedConversation ? (
          <div className='flex flex-col h-screen' style={{ backgroundImage: `url(${chatWallpaper})`, backgroundSize: 'cover' }}>
            {/* Conversation Header */}
            <div className={`p-4 flex justify-between items-center border border-6  rounded-xl ${
              darkMode 
                ? 'border-gray-800 bg-gray-800' 
                : 'border-gray-200 bg-white'
            }`} 
            >
              <div className="flex items-center">
                {renderAvatar(selectedConversation)}
                <div className="ml-3">
                  <h2 className="text-xl font-bold">{selectedConversation.name}</h2>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {selectedConversation.online ? 'Online' : 'Offline'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button className={`p-2 rounded-full hover:bg-opacity-10 ${
                  darkMode 
                    ? 'hover:bg-white text-gray-300' 
                    : 'hover:bg-gray-200 text-gray-600'
                }`}>
                  <PhoneCall size={20} />
                </button>
                <button className={`p-2 rounded-full hover:bg-opacity-10 ${
                  darkMode 
                    ? 'hover:bg-white text-gray-300' 
                    : 'hover:bg-gray-200 text-gray-600'
                }`}>
                  <Video size={20} />
                </button>
                <button className={`p-2 rounded-full hover:bg-opacity-10 ${
                  darkMode 
                    ? 'hover:bg-white text-gray-300' 
                    : 'hover:bg-gray-200 text-gray-600'
                }`}>
                  <UserPlus size={20} />
                </button>
                <button className={`p-2 rounded-full hover:bg-opacity-10 ${
                  darkMode 
                    ? 'hover:bg-white text-gray-300' 
                    : 'hover:bg-gray-200 text-gray-600'
                }`}>
                  <MoreVertical size={20} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {conversationMessages[selectedConversation.id].map((message) => (
                <div 
                  key={message.id} 
                  className={`flex ${
                    message.type === 'sent' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.type === 'received' && renderAvatar(selectedConversation)}
                  <div className={`max-w-lg mx-2 ${
                    message.type === 'sent' ? 'text-right' : 'text-left'
                  }`}>
                    <div className={`inline-block p-3 rounded-lg ${
                      message.type === 'sent'
                        ? (darkMode 
                            ? 'bg-purple-800 text-white' 
                            : 'bg-purple-500 text-white')
                        : (darkMode 
                            ? 'bg-gray-800 text-white' 
                            : 'bg-gray-200 text-black')
                    }`}>
                      <p>{message.text}</p>
                    </div>
                    <p className={`text-xs mt-1 ${
                      darkMode ? 'text-gray-500' : 'text-gray-500'
                    }`}>
                      {message.timestamp}
                    </p>
                  </div>
                  {message.type === 'sent' && renderAvatar({ name: 'You', online: true })}
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className={`p-4 border-t ${
              darkMode 
                ? 'border-gray-800 bg-gray-800' 
                : 'border-gray-200 bg-white'
            }`}>
              <div className="flex items-center space-x-2">
                <button className={`p-2 rounded-full hover:bg-opacity-10 ${
                  darkMode 
                    ? 'hover:bg-white text-gray-300' 
                    : 'hover:bg-gray-200 text-gray-600'
                }`}>
                  <Paperclip size={20} />
                </button>
                <button className={`p-2 rounded-full hover:bg-opacity-10 ${
                  darkMode 
                    ? 'hover:bg-white text-gray-300' 
                    : 'hover:bg-gray-200 text-gray-600'
                }`}>
                  <Smile size={20} />
                </button>
                <input
                  type="text"
                  placeholder="Envoyer un message..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  className={`flex-1 p-2 rounded-lg focus:outline-none focus:ring-2 ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white focus:ring-purple-500'
                      : 'bg-gray-100 border-gray-300 text-black focus:ring-purple-300'
                  }`}
                />
                <button 
                  onClick={sendMessage}
                  className={`p-2 rounded-full ${
                    darkMode 
                      ? 'bg-purple-700 text-white hover:bg-purple-600'
                      : 'bg-purple-500 text-white hover:bg-purple-600'
                  }`}
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className={`text-xl ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              Sélectionnez une conversation pour commencer à discuter
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlloChat;