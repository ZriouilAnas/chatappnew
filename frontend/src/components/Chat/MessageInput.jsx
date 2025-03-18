import React, { useState } from 'react';

const MessageInput = () => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    // Logique d'envoi de message
  };

  return (
    <div>
      <input 
        type="text" 
        value={message} 
        onChange={(e) => setMessage(e.target.value)} 
        placeholder="Écrivez un message..."
      />
      <button onClick={handleSend}>Envoyer</button>
    </div>
  );
};

export default MessageInput;
