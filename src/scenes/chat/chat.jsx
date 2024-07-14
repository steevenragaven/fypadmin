import React, { useState } from 'react';
import styled from 'styled-components';
import ChatList from './ChatList';
import ChatMessages from './ChatMessages';

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f0f2f5;
`;

const initialChats = [
  {
    id: 1,
    name: 'Joyce Mess',
    avatar: require('./im1.jpeg'), // Using require to load images
    lastMessage: 'Thank you in advance...',
    unreadCount: 2,
    messages: [
      {
        name: 'Joyce Mess',
        avatar: require('./im1.jpeg'), // Using require to load images
        text: 'Hello Joyce, I will be arriving at 10 AM tomorrow.',
        timestamp: 'Seen 09:00',
        isSender: false,
      },
      {
        name: 'Joyce Mess',
        avatar: require('./im1.jpeg'), // Using require to load images
        text: 'Thank you in advance.',
        timestamp: 'Seen 09:05',
        isSender: true,
      },
    ],
  },
  {
    id: 2,
    name: 'Shane Walkiri',
    avatar: require('./im1.jpeg'), // Using require to load images
    lastMessage: 'Thnx',
    unreadCount: 1,
    messages: [
      {
        name: 'Shane Walkiri',
        avatar: require('./im1.jpeg'), // Using require to load images
        text: 'Hey Shane, how are you?',
        timestamp: 'Seen 13:00',
        isSender: false,
      },
      {
        name: 'Shane Walkiri',
        avatar: require('./im1.jpeg'), // Using require to load images
        text: 'Thnx',
        timestamp: 'Seen 13:02',
        isSender: true,
      },
    ],
  },
  // Additional chat items for demonstration
  {
    id: 3,
    name: 'Ryan Turel',
    avatar: require('./im1.jpeg'), // Using require to load images
    lastMessage: 'Yeah i got the code.',
    unreadCount: 0,
    messages: [
      {
        name: 'Ryan Turel',
        avatar: require('./im1.jpeg'), // Using require to load images
        text: 'Hello Sir, I am Bryan From PocketMart Delivery. As planned, I will be delivering your order around 13h today. Order Id: 1522',
        timestamp: 'Seen 09:00',
        isSender: false,
      },
      {
        name: 'Ryan Turel',
        avatar: require('./im1.jpeg'), // Using require to load images
        text: 'ok. thnx',
        timestamp: 'Seen 13:02',
        isSender: true,
      },
      {
        name: 'Ryan Turel',
        avatar: require('./im1.jpeg'), // Using require to load images
        text: 'Hello again Sir, I have arrived with your order and am currently at your location. Please provide the code to complete the delivery. Thank you.',
        timestamp: 'Seen 13:02',
        isSender: false,
      },
      {
        name: 'Ryan Turel',
        avatar: require('./im1.jpeg'), // Using require to load images
        text: 'Yeah I’ll be at the door in a sec, yeah I got the code.',
        timestamp: 'Seen 13:02',
        isSender: true,
      },
      {
        name: 'Ryan Turel',
        avatar: require('./im1.jpeg'), // Using require to load images
        text: 'Ok Sir, Thank you.',
        timestamp: 'Sent Just now',
        isSender: false,
      },
    ],
  },
];

const Chats = () => {
  const [chats] = useState(initialChats);
  const [activeChatId, setActiveChatId] = useState(chats[0].id);

  const activeChat = chats.find(chat => chat.id === activeChatId);

  return (
    <AppContainer>
      <ChatList chats={chats} activeChatId={activeChatId} onSelectChat={setActiveChatId} />
      {activeChat && <ChatMessages messages={activeChat.messages} />}
    </AppContainer>
  );
};

export default Chats;
