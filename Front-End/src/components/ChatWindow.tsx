import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/UserProvider';

interface Message {
  body: string;
  sender: string;
  timestamp: string;
}

interface ChatWindowProps {
  conversationId: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ conversationId }) => {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const base_api_url = import.meta.env.VITE_APP_BASE_API;

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await fetch(`${base_api_url}/messages/${conversationId}`, {
        method: 'GET',
        headers: {
          'x-access-token': `bearer ${user.token}`
        }
      });

      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    };

    fetchMessages();
  }, [base_api_url, conversationId, user.token]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (inputValue.trim() === '') {
      return;
    }

    const res = await fetch(`${base_api_url}/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': `bearer ${user.token}`
      },
      body: JSON.stringify({
        conversation_id: `${conversationId}`,
        body: inputValue,
        sender: 'user'
      })
    });

    if (res.ok) {
      const newMessage = {
        body: inputValue,
        sender: 'user',
        timestamp: new Date().toISOString()
      };

      setMessages(prevMessages => [...prevMessages, newMessage]);
    }

    setInputValue('');
  };

  const sortedMessages = [...messages].sort((a, b) => {
    return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
  });

  return (
    <div className="window-box">
      <div className="chat-window">
        {sortedMessages.map((message, index) => (
          <div key={index} className={`message ${message.sender === 'ai' ? 'ai' : 'user'}`}>
            <div className="message-body">{message.body}</div>
          </div>
        ))}
      </div>
      <div className="input-bar">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type your message..."
        />
        <button onClick={handleSendClick}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;

