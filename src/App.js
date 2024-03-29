import React, { useState } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import { ChannelListContainer, ChannelContainer, Auth } from './components';
import 'stream-chat-react/dist/css/index.css'
import './App.css';

const cookies = new Cookies();

const apikey = '93cpdfy8p2w4';

const authToken = cookies.get('token');

const client = StreamChat.getInstance(apikey);

if (authToken) {
  client.connectUser({
    name: cookies.get('username'),
    fullName: cookies.get('fullName'),
    id: cookies.get('userId'),
    phoneNumber: cookies.get('phoneNumber'),
    image: cookies.get('avatarURL'),
    hashedPassword: cookies.get('hashedPassword')
  }, authToken)
}

function App() {
  const [createType, setCreateType] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  if (!authToken) return <Auth />
  return (
    <div className="app__wrapper">
      <Chat client={client} theme='team light'>
        <ChannelListContainer
          isCreating={isCreating}
          setCreateType={setCreateType}
          setIsCreating={setIsCreating}
          setIsEditing={setIsEditing}
          />
        <ChannelContainer 
        isCreating={isCreating}
        setIsCreating={setIsCreating}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        createType={createType}
        />
      </Chat>
    </div>
  );
}

export default App;
