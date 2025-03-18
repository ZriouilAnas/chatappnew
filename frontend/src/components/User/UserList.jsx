import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { userService } from '../../services/api';
import { useSocket } from '../../contexts/SocketContext';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { onlineUsers } = useSocket();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await userService.getAllUsers();
        setUsers(data);
      } catch (error) {
        console.error('Erreur lors du chargement des utilisateurs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (isLoading) {
    return <div>Chargement des utilisateurs...</div>;
  }

  return (
    <div className="user-list">
      <h2>Conversations</h2>
      {users.length === 0 ? (
        <p>Aucun utilisateur disponible</p>
      ) : (
        <ul>
          {users.map(user => (
            <li key={user._id}>
              <Link to={`/chat/${user._id}`} className="user-item">
                <div className="user-avatar">
                  {user.profileImage ? (
                    <img src={user.profileImage} alt={user.username} />
                  ) : (
                    <div className="default-avatar">{user.username.charAt(0)}</div>
                  )}
                </div>
                <div className="user-info">
                  <span className="username">{user.username}</span>
                  <span className={`status ${onlineUsers.has(user._id) ? 'online' : 'offline'}`}>
                    {onlineUsers.has(user._id) ? 'En ligne' : 'Hors ligne'}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;