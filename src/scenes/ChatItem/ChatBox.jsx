import React, { useState } from 'react';

const ChatBox = ({ onSend }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="chat-box">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="chat-input"
      />
      <button type="submit" className="send-button">Send</button>
    </form>
  );
};

export default ChatBox;
