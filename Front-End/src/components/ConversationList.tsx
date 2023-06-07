import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Conversation = {
  id: string;
  name: string;
};

type ListProps = {
  conversations: Conversation[];
};

const List: React.FC<ListProps> = ({ conversations }) => {
  const [conversationNames, setConversationNames] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConversationNames = async () => {
      try {
        const names = await Promise.all(
          conversations.map(async (conversation) => {
            const response = await fetch(`/api/conversations/${conversation.id}`);
            if (response.ok) {
              const data = await response.json();
              return data.name;
            }
            return '';
          })
        );
        setConversationNames(names);
      } catch (error) {
        console.error('Error fetching conversation names:', error);
      }
    };

    fetchConversationNames();
  }, [conversations]);

  const handleClick = (conversationId: string) => {
    // Perform any additional actions before navigating to the new page
    navigate(`/conversation/${conversationId}`);
  };

  return (
    <div className="button-list">
      {conversationNames.map((name, index) => (
        <button
          key={index}
          className="button-item"
          onClick={() => handleClick(conversations[index].id)}
        >
          {name}
        </button>
      ))}
    </div>
  );
};

export default List;

