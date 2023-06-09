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
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    const res = await fetch(`${base_api_url}/conversations`, {
      method: 'GET',
      headers: {
        'x-access-token': `bearer ${user.token || JSON.parse(localStorage.getItem('token') || '')}`,
      },
    });

    if (res.ok) {
      const data = await res.json();
      setConversationsArray(data);
    }
  };

  const createConversation = async () => {
    const res = await fetch(`${base_api_url}/conversation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': `bearer ${user.token || JSON.parse(localStorage.getItem('token') || '')}`,
      },
      body: JSON.stringify({
        name: 'New Conversation', // Change the name as desired
        url: '/housechat',
      }),
    });

    if (res.ok) {
      const data = await res.json();
      const conversationId = data.conversation_id;
      navigate(`/housechat?conversation_id=${conversationId}`);
    }
  };

  // Sort conversations by timestamp in ascending order
  const sortedConversations = conversationsArray.sort(
    (a: Conversation, b: Conversation) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  return (
    <div className="conversation-list">
      <button className="new-conversation" onClick={createConversation}>Create New Conversation</button>
      {sortedConversations.map((conversation: Conversation) => (
        <button
          key={conversation.id}
          onClick={() => navigate(`${conversation.url}?conversation_id=${conversation.id}`)}
        >
          {conversation.name}
        </button>
      ))}
    </div>
  );
}

export default ConversationList;