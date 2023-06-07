import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/UserProvider';

type Conversation = {
  id: string;
  name: string;
  timestamp: string;
  url: string;
};

const ConversationList: React.FC = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [conversationsArray, setConversationsArray] = useState<Conversation[]>([]);
  const base_api_url = import.meta.env.VITE_APP_BASE_API;

  useEffect(() => {
    const fetchConversations = async () => {
      const res = await fetch(`${base_api_url}/conversations`, {
        method: 'GET',
        headers: {
          'x-access-token': `bearer ${user.token}`
        }
      });

      if (res.ok) {
        const data = await res.json();
        setConversationsArray(data);
      }
    };

    fetchConversations();
  }, []);

  const handleButtonClick = (url: string, id: string) => {
    navigate(`${url}?conversation_id=${id}`);
  };

  // Sort conversations by timestamp in ascending order
  const sortedConversations = conversationsArray.sort(
    (a: Conversation, b: Conversation) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  return (
    <div>
      {sortedConversations.map((conversation: Conversation) => (
        <button
          key={conversation.id}
          onClick={() => handleButtonClick(conversation.url, conversation.id)}
        >
          {conversation.name}
        </button>
      ))}
    </div>
  );
};

export default ConversationList;
