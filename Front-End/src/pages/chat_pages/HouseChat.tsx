import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ChatWindow from '../../components/ChatWindow';

const HouseChat: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [conversationId, setConversationId] = useState<string>('');

  useEffect(() => {
    const retrievedConversationId = searchParams.get('conversation_id');
    if (retrievedConversationId) {
      setConversationId(retrievedConversationId);
    }
  }, [searchParams]);

  return (
    <div>
      <ChatWindow conversationId={conversationId} />
    </div>
  );
};

export default HouseChat;
