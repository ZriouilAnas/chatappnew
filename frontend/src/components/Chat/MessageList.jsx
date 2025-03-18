import React from 'react';

const MessageList = () => {
  // Exemple de messages
  const messages = ["Bonjour!", "Comment ça va?"];

  return (
    <div>
      {messages.map((message, index) => (
        <div key={index}>{message}</div>
      ))}
    </div>
  );
};

export default MessageList;
