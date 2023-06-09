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

  useEffect(() => {
    fetchMessages();
  }, [conversationId]);

  const fetchMessages = async () => {
    const res = await fetch(`${base_api_url}/messages/${conversationId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': `Bearer ${user.token || JSON.parse(localStorage.getItem('token') || '')}`,
      },
    });

    if (res.ok) {
      const data = await res.json();
      setMessages(data);
    }
  };

  const sendMessage = async (message: string, sender: string) => {
    const res = await fetch(`${base_api_url}/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': `bearer ${user.token || JSON.parse(localStorage.getItem('token') || '')}`,
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

    const lastThreeMessages = messages
      .slice(-3)
      .map((message) => ({
        role: 'user',
        content: message.body || '', // Set content to an empty string if body is undefined or null
      }));

    const aiRes = await fetch(aiApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer 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`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content:
              "you are House from the show House MD, known for your wit and sarcasm. You are consulting a fellow doctor about a challenging medical case. Keep your replies short",
          },
          ...lastThreeMessages,
          { role: 'user', content: inputValue },
          { role: 'assistant', content: '' },
        ],
        temperature: 1,
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
