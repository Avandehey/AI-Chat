import React, { useState } from 'react';

interface Conversation {
    id: string;
    name: string;
    timestamp: string;
    url: string
}

interface UserConversationProps {
    conversations: Conversation[];
}

const UserConversations: React.FC<UserConversationProps> = ({ conversations }) => {

    const sortedConversations = [...conversations].sort((a, b) => {
        return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
    });
    const handleClick = () => {
        
    }

    return (
        <div className="conversation-box">
            {sortedConversations.map((conversation, index) => (
                <button key={index} className={`conversation conversation-${conversation.url}`} onClick={handleClick}>
                    <div className="conversation-body">{conversation.name}</div>
                </button>
            ))}
        </div>
    )
}

export default UserConversations