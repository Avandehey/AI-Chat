import React, { useState } from 'react';

interface Message {
  body: string;
  sender: string;
  timestamp: string;
}

interface ChatWindowProps {
  messages: Message[];
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages }) => {
  const [inputValue, setInputValue] = useState('');

  const sortedMessages = [...messages].sort((a, b) => {
    return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendClick = () => {
    // Implement your logic to send the message here
    // For now, let's just log the input value
    console.log('Sending message:', inputValue);

    // Clear the input field after sending the message
    setInputValue('');
  };

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