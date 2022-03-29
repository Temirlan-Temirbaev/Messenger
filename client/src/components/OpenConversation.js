import React, { useState, useCallback } from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'
import { useConversations } from '../contexts/ConversationsProvider';
import './OpenConversation.css'
import styled from "styled-components";


export default function OpenConversation() {
  const [text, setText] = useState('')
  const setRef = useCallback(node => {
    if (node) {
      node.scrollIntoView({ smooth: true })
    }
  }, [])
  const { sendMessage, selectedConversation } = useConversations()

  function handleSubmit(e) {
    e.preventDefault()

    sendMessage(
      selectedConversation.recipients.map(r => r.id),
      text
    )
    setText('')
  }
  const CustomButton = styled(Button)`
    background-color: rgb(49, 58, 85);
    border: none;
    &:hover{
      background-color: #232A3B;
      color: #878787;
    }
  `
  return (
    <div className="d-flex flex-column flex-grow-1" style={{backgroundColor: '#1d202f', padding: '10px'}}>
      <div className="flex-grow-1 overflow-auto">
        <div className="d-flex flex-column align-items-start justify-content-end px-3">
          {selectedConversation.messages.map((message, index) => {
            const lastMessage = selectedConversation.messages.length - 1 === index
            return (
              <div style={{    backgroundColor: 'rgba(49,58,85, 1)', borderRadius : '10px'}}
                ref={lastMessage ? setRef : null}
                key={index}
                className={`my-1 d-flex flex-column ${message.fromMe ? 'align-self-end align-items-end' : 'align-items-start'}`}
              >
                <div
                  className={`rounded px-2 py-1 ${message.fromMe ? 'text-white' : 'border'}`}>
                  <span className="messageText" key={message.id}>{message.text}</span>
                </div>
                <div className={`text-muted small ${message.fromMe ? 'text-right' : ''}`} style={{padding: '10px'}}>
                  {message.fromMe ? 'You' : message.senderName}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="m-2">
          <InputGroup>
            <Form.Control
              as="textarea"
              required
              value={text}
              onChange={e => setText(e.target.value)}
              style={{ height: '75px', resize: 'none' }}
            />
            <InputGroup.Append>
              <CustomButton type="submit">Отправить</CustomButton>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  )
}
