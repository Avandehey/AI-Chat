import React, { useEffect, useState } from 'react';

interface Message {
  body: string;
  sender: string;
  timestamp: string;
}

interface ChatWindowProps {
  conversationId: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ conversationId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await fetch(`/api/messages/${conversationId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      setMessages(data);
    };

    fetchMessages();
  }, [conversationId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendClick = () => {
    console.log('Sending message:', inputValue);
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
