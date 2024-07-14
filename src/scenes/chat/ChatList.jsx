import React from 'react';
import styled from 'styled-components';

const Sidebar = styled.div`
  width: 100%;
  max-width: 280px;
  height: 100vh;
  background-color: #F9FAFB;
  overflow-y: auto;
  border-right: 1px solid #E0E0E0; // Light grey border on the right
`;

const Header = styled.div`
  padding: 20px;
  border-bottom: 1px solid #E0E0E0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 1.5em;
  margin: 0;
`;

const AddButton = styled.button`
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  font-size: 1.2em;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  border-bottom: 1px solid #E0E0E0;
`;

const Tab = styled.div`
  font-size: 1em;
  padding: 10px;
  cursor: pointer;
  color: ${props => (props.active ? '#007BFF' : '#000')};
  border-bottom: ${props => (props.active ? '2px solid #007BFF' : 'none')};
`;

const ChatItem = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #E0E0E0;
  cursor: pointer;
  background-color: ${props => props.active ? '#E8F4FF' : 'transparent'};

  &:hover {
    background-color: #F0F7FF;
  }
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const ChatDetails = styled.div`
  flex-grow: 1;
  overflow: hidden;
`;

const ChatName = styled.div`
  font-weight: 500;
`;

const LastMessageSnippet = styled.div`
  font-size: 0.8em;
  color: #65676B;
`;

const NotificationBubble = styled.span`
  min-width: 20px;
  padding: 0 6px;
  height: 20px;
  border-radius: 10px;
  background-color: #F02849;
  color: white;
  font-size: 0.75em;
  text-align: center;
  line-height: 20px;
  margin-left: auto;
`;

const ChatList = ({ chats, activeChatId, onSelectChat }) => {
  const [activeTab, setActiveTab] = React.useState('open');

  return (
    <Sidebar>
      <Header>
        <Title>Chat</Title>
        <AddButton>+</AddButton>
      </Header>
      <TabContainer>
        <Tab active={activeTab === 'open'} onClick={() => setActiveTab('open')}>Open</Tab>
        <Tab active={activeTab === 'archived'} onClick={() => setActiveTab('archived')}>Archived</Tab>
      </TabContainer>
      {chats.map((chat) => (
        <ChatItem key={chat.id} active={chat.id === activeChatId} onClick={() => onSelectChat(chat.id)}>
          <Avatar src={chat.avatar} alt={`${chat.name}'s Avatar`} />
          <ChatDetails>
            <ChatName>{chat.name}</ChatName>
            <LastMessageSnippet>{chat.lastMessage}</LastMessageSnippet>
          </ChatDetails>
          {chat.unreadCount > 0 && (
            <NotificationBubble>{chat.unreadCount}</NotificationBubble>
          )}
        </ChatItem>
      ))}
    </Sidebar>
  );
};

export default ChatList;
