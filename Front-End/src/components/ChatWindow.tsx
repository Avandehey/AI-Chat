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
  const aiApiUrl = 'https://api.openai.com/v1/chat/completions';
  const base_ai_key = import.meta.env.OPEN_AI_API_KEY
  console.log(conversationId , user.token)

  useEffect(() => {
    (async ()=> await fetchMessages())()
  }, [conversationId]);

  const fetchMessages = async () => {
    console.log(conversationId, "fetch messages")
    const res = await fetch(`${base_api_url}/messages/${conversationId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': `Bearer ${user.token || localStorage.getItem('token')}`,
      },
    });

    if (res.ok) {
      const data = await res.json();
      setMessages(data);
    } else {
      console.log(res)
    }
  };

  const sendMessage = async (message: string, sender: string) => {
    const res = await fetch(`${base_api_url}/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': `bearer ${user.token}`,
      },
      body: JSON.stringify({
        conversation_id: conversationId,
        body: message,
        sender: sender,
      }),
    });

    if (res.ok) {
      const newMessage = {
        body: message,
        sender: sender,
        timestamp: new Date().toISOString(),
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (inputValue.trim() === '') {
      return;
    }

    const aiRes = await fetch(aiApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${base_ai_key}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'user', content: inputValue },
          { role: 'assistant', content: '' },
        ],
        temperature: 0,
      }),
    });

    if (aiRes.ok) {
      const aiData = await aiRes.json();
      const aiResponse = aiData.choices[0].message.content;

      // Save user message
      await sendMessage(inputValue, 'user');

      // Save AI response
      await sendMessage(aiResponse, 'ai');
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
          <div
            key={index}
            className={`message ${message.sender === 'ai' ? 'ai' : 'user'}`}
          >
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