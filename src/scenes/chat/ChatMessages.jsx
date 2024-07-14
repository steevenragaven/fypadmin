import React, { useState } from 'react';
import styled from 'styled-components';

const MessagesContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  background-color: #FFFFFF;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const MessagesList = styled.div`
  flex-grow: 1;
  overflow-y: auto;
`;

const MessageWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 15px;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const MessageContent = styled.div`
  max-width: 80%;
`;

const Message = styled.div`
  padding: 10px 20px;
  border-radius: 10px;
  background-color: ${props => props.isSender ? '#FFEBB7' : '#E5E5E5'};
  border: 1px solid ${props => props.isSender ? '#F2C94C' : '#BDBDBD'};
  position: relative;
  white-space: pre-wrap;
`;

const MessageHeader = styled.div`
  font-weight: 500;
  margin-bottom: 5px;
`;

const Timestamp = styled.div`
  font-size: 0.75em;
  text-align: right;
  color: #999999;
`;

const ReplyContainer = styled.div`
  display: flex;
  padding: 10px;
  border-top: 1px solid #E0E0E0;
  align-items: center;
  background-color: #F9FAFB;
`;

const ReplyInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #E0E0E0;
  border-radius: 20px;
  margin-right: 10px;
`;

const SendButton = styled.button`
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const ChatMessages = ({ messages }) => {
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Logic to handle sending the message
      setNewMessage('');
    }
  };

  return (
    <>
      <MessagesContainer>
        <MessagesList>
          {messages.map((msg, index) => (
            <MessageWrapper key={index} style={{ flexDirection: msg.isSender ? 'row-reverse' : 'row' }}>
              <Avatar src={msg.avatar} alt={`${msg.name}'s Avatar`} />
              <MessageContent>
                <MessageHeader>{msg.name}</MessageHeader>
                <Message isSender={msg.isSender}>{msg.text}</Message>
                <Timestamp>{msg.timestamp}</Timestamp>
              </MessageContent>
            </MessageWrapper>
          ))}
        </MessagesList>
        <ReplyContainer>
          <ReplyInput
            type="text"
            placeholder="Reply"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <SendButton onClick={handleSendMessage}>
            <svg width="20" height="20" fill="currentColor">
              <path d="M2.64 19.36l17.02-8.28c.72-.35.72-1.42 0-1.78L2.64.93c-.65-.32-1.42.25-1.21.97l2.63 8.96c.08.28.08.58 0 .86L1.43 19.36c-.2.72.56 1.29 1.21.97z"></path>
            </svg>
          </SendButton>
        </ReplyContainer>
      </MessagesContainer>
    </>
  );
};

export default ChatMessages;
