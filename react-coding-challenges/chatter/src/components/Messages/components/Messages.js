import React, { useContext, useState } from 'react';
import io from 'socket.io-client';
import useSound from 'use-sound';
import config from '../../../config';
import LatestMessagesContext from '../../../contexts/LatestMessages/LatestMessages';
import TypingMessage from './TypingMessage';
import Header from './Header';
import Footer from './Footer';
import Message from './Message';
import '../styles/_messages.scss';
import { sendMessage, isTyping } from 'react-chat-engine';
import { props } from 'bluebird';

const socket = io(
  config.BOT_SERVER_ENDPOINT,
  { transports: ['websocket', 'polling', 'flashsocket'] }
);

function Messages() {
  const [playSend] = useSound(config.SEND_AUDIO_URL);
  const [playReceive] = useSound(config.RECEIVE_AUDIO_URL);
  const { setLatestMessage } = useContext(LatestMessagesContext);

  const [value, setValue] = useState('');
  const { chatId, creds } = props;

  const onChangeMessage = (event) => {
    setValue(event.target.value);

    isTyping(props, chatId)
  };

  const handleSubmit = (event) => {
    // event.preventDefault();
    const text = value.trim();
    if (text.length > 0) sendMessage(creds, chatId, { text })

    console.log('*****Valeur*******', value);
  };



  return (
    <div className="messages">
      <Header />
      <div className="messages__list" id="message-list">
      </div>
      <Footer message={true} sendMessage={handleSubmit} onChangeMessage={onChangeMessage} />
    </div>
  );
}

export default Messages;
