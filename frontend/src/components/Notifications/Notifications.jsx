import React, { useState } from 'react';
import { 
  Bell, 
  CheckCircle, 
  XCircle, 
  Filter, 
  MessageCircle, 
  Users, 
  UserPlus, 
  Archive, 
  Calendar,
  Star
} from 'lucide-react';

const Notifications = ({ darkMode }) => {
  const [filter, setFilter] = useState('all');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'message',
      icon: MessageCircle,
      title: 'New Message',
      description: 'John Doe sent a new message',
      timestamp: '5 min ago',
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'team_invite',
      icon: UserPlus,
      title: 'Team Invitation',
      description: 'Emily invited you to join Project Alpha',
      timestamp: '1 hour ago',
      read: false,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'system',
      icon: Star,
      title: 'System Update',
      description: 'New features have been added to AlloChat',
      timestamp: '3 hours ago',
      read: true,
      priority: 'low'
    },
    {
      id: 4,
      type: 'meeting',
      icon: Calendar,
      title: 'Meeting Reminder',
      description: 'Quarterly review meeting starts in 30 minutes',
      timestamp: 'Yesterday',
      read: true,
      priority: 'high'
    }
  ]);

  const getIconColor = (type, darkMode) => {
    const colors = {
      message: darkMode ? 'text-blue-300' : 'text-blue-600',
      team_invite: darkMode ? 'text-green-300' : 'text-green-600',
      system: darkMode ? 'text-purple-300' : 'text-purple-600',
      meeting: darkMode ? 'text-red-300' : 'text-red-600'
    };
    return colors[type] || (darkMode ? 'text-gray-300' : 'text-gray-600');
  };

  const getBackgroundColor = (type, darkMode) => {
    const colors = {
      message: darkMode ? 'bg-blue-900/30' : 'bg-blue-100',
      team_invite: darkMode ? 'bg-green-900/30' : 'bg-green-100',
      system: darkMode ? 'bg-purple-900/30' : 'bg-purple-100',
      meeting: darkMode ? 'bg-red-900/30' : 'bg-red-100'
    };
    return colors[type] || (darkMode ? 'bg-gray-800' : 'bg-gray-100');
  };

  const getPriorityIndicator = (priority, darkMode) => {
    const colors = {
      high: darkMode ? 'bg-red-500' : 'bg-red-500',
      medium: darkMode ? 'bg-yellow-500' : 'bg-yellow-500',
      low: darkMode ? 'bg-green-500' : 'bg-green-500'
    };
    return (
      <div 
        className={`w-2 h-2 rounded-full mr-2 ${colors[priority]}`}
      />
    );
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const filteredNotifications = notifications.filter(notification => 
    filter === 'all' || 
    (filter === 'unread' && !notification.read) ||
    (filter === 'priority' && notification.priority === 'high')
  );

  return (
    <div className="flex h-screen">
      {/* Notifications List */}
      <div className={`w-1/4 p-4 border-r ${
        darkMode 
          ? 'bg-gray-800 border-gray-700 text-white' 
          : 'bg-white border-gray-200 text-black'
      }`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Notifications</h2>
          <div className="flex space-x-2">
            <button 
              onClick={() => setFilter(filter === 'all' ? 'unread' : filter === 'unread' ? 'priority' : 'all')}
              className={`p-2 rounded-full hover:bg-opacity-10 ${
                darkMode 
                  ? 'hover:bg-white text-gray-300' 
                  : 'hover:bg-gray-200 text-gray-600'
              }`}
            >
              <Filter size={20} />
              <span className="text-xs ml-1">
                {filter === 'all' ? 'All' : filter === 'unread' ? 'Unread' : 'Priority'}
              </span>
            </button>
            <button 
              className={`p-2 rounded-full hover:bg-opacity-10 ${
                darkMode 
                  ? 'hover:bg-white text-gray-300' 
                  : 'hover:bg-gray-200 text-gray-600'
              }`}
            >
              <Archive size={20} />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.map((notification) => {
            const NotificationIcon = notification.icon;
            return (
              <div 
                key={notification.id}
                className={`p-3 rounded-lg flex items-center transition-all duration-300 ${
                  notification.read 
                    ? (darkMode ? 'bg-gray-900 opacity-70' : 'bg-gray-100 opacity-80')
                    : getBackgroundColor(notification.type, darkMode)
                }`}
              >
                <div className="flex items-center mr-3">
                  {getPriorityIndicator(notification.priority, darkMode)}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    darkMode ? 'bg-gray-700' : 'bg-white'
                  }`}>
                    <NotificationIcon 
                      className={`w-6 h-6 ${getIconColor(notification.type, darkMode)}`} 
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h3 className={`font-semibold ${
                      darkMode ? 'text-white' : 'text-gray-800'
                    }`}>
                      {notification.title}
                    </h3>
                    <p className={`text-xs ${
                      darkMode ? 'text-gray-500' : 'text-gray-500'
                    }`}>
                      {notification.timestamp}
                    </p>
                  </div>
                  <p className={`text-sm ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {notification.description}
                  </p>
                </div>
                {!notification.read && (
                  <div className="flex space-x-2 ml-3">
                    <button 
                      onClick={() => markAsRead(notification.id)}
                      className={`p-1 rounded-full ${
                        darkMode 
                          ? 'bg-green-800 text-green-300 hover:bg-green-700'
                          : 'bg-green-100 text-green-600 hover:bg-green-200'
                      }`}
                    >
                      <CheckCircle size={16} />
                    </button>
                    <button 
                      className={`p-1 rounded-full ${
                        darkMode 
                          ? 'bg-red-800 text-red-300 hover:bg-red-700'
                          : 'bg-red-100 text-red-600 hover:bg-red-200'
                      }`}
                    >
                      <XCircle size={16} />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Notification Details */}
      <div className={`w-3/4 flex flex-col ${
        darkMode 
          ? 'bg-gray-900 text-white' 
          : 'bg-gray-50 text-black'
      }`}>
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold">Notification Details</h2>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className={`text-center ${
            darkMode ? 'text-gray-500' : 'text-gray-400'
          }`}>
            <Bell size={64} className="mx-auto mb-4 opacity-50" />
            <p className="text-xl">Sélectionnez une notification pour voir les détails</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;