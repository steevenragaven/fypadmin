import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import ChatItem from './ChatItem';

const ChatList = ({ messages, currentUser }) => {
  const messagesEndRef = useRef(null);

  // Ensure messages is always an array
  const safeMessages = messages || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [safeMessages]); // Use safeMessages here to ensure effect dependency is defined

  return (
    <StyledChatList>
      {safeMessages.map((message) => (
        <ChatItem key={message.id} message={message} isSender={message.senderId === currentUser} />
      ))}
      <div ref={messagesEndRef} />
    </StyledChatList>
  );
};

export default ChatList;

const StyledChatList = styled.div`
  height: 500px;
  overflow-y: auto;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
