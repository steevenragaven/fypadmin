import React from 'react';

const ChatItem = ({ message }) => {
  return (
    <div className={`chat-item ${message.isSender ? 'sent' : 'received'}`}>
      <p>{message.text}</p>
    </div>
  );
};

export default ChatItem;
