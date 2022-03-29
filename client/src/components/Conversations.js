import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useConversations } from '../contexts/ConversationsProvider';
import './Conversations.css'

export default function Conversations() {
  const { conversations, selectConversationIndex } = useConversations()

  return (
    <div className="conversation">
      {conversations.map((conversation, index) => (
        <button className="conversation__item"
          key={index}
          action="true"
          onClick={() => selectConversationIndex(index)}
          active={conversation.selected}
        >
          {conversation.recipients.map(r => <div className="conversation__item__text" key={r.id}>{r.name}</div>)}
        </button>
      ))}
    </div>
  )
}
