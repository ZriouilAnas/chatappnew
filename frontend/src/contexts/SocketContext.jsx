import React, { createContext, useContext, useEffect, useState } from 'react';
import { getSocket } from '../services/socket';
import { useAuth } from './AuthContext';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [onlineUsers, setOnlineUsers] = useState(new Set());
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (currentUser) {
      try {
        const socket = getSocket();
        setSocket(socket);

        // Écouter les changements de statut des utilisateurs
        socket.on('user_status_change', ({ userId, status }) => {
          setOnlineUsers(prev => {
            const updated = new Set(prev);
            if (status === 'online') {
              updated.add(userId);
            } else {
              updated.delete(userId);
            }
            return updated;
          });
        });

        // Nettoyage
        return () => {
          socket.off('user_status_change');
        };
      } catch (error) {
        console.error('Erreur lors de l\'initialisation du socket:', error);
      }
    }
  }, [currentUser]);

  // Envoyer un message privé
  const sendPrivateMessage = (recipientId, content) => {
    if (socket) {
      socket.emit('private_message', { recipientId, content });
    }
  };

  // Envoyer un message de groupe
  const sendGroupMessage = (groupId, content) => {
    if (socket) {
      socket.emit('group_message', { groupId, content });
    }
  };

  // Marquer un message comme lu
  const markMessageAsRead = (messageId) => {
    if (socket) {
      socket.emit('mark_as_read', { messageId });
    }
  };

  const value = {
    socket,
    onlineUsers,
    sendPrivateMessage,
    sendGroupMessage,
    markMessageAsRead
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};