import React, {useState} from 'react'
import {Modal, Form, Button} from 'react-bootstrap'
import {useContacts} from '../contexts/ContactsProvider'
import {useConversations} from '../contexts/ConversationsProvider'
import styled from "styled-components";

export default function NewConversationModal({closeModal}) {
    const [selectedContactIds, setSelectedContactIds] = useState([])
    const {contacts} = useContacts()
    const {createConversation} = useConversations()

    function handleSubmit(e) {
        e.preventDefault()

        createConversation(selectedContactIds)
        closeModal()
    }

    function handleCheckboxChange(contactId) {
        setSelectedContactIds(prevSelectedContactIds => {
            if (prevSelectedContactIds.includes(contactId)) {
                return prevSelectedContactIds.filter(prevId => {
                    return contactId !== prevId
                })
            } else {
                return [...prevSelectedContactIds, contactId]
            }
        })
    }

    const CustomModalHeader = styled(Modal.Header)`
      width: 100%;
      background-color: rgba(49, 58, 85, 1);
      color: #ffffff;
      border: none;
    `
    const CustomModalBody = styled(Modal.Body)`
      width: 100%;
      background-color: #293145;
      color: white;
    `

    const CustomButton = styled(Button)`
      background: none;
      border: none;
      border-radius: 10px;
      background-color: rgba(49, 58, 85, 1);

      &:hover {
        background-color: #1d202f;
        color: #c8c2c2;
      }
    `

    return (
        <>
            <CustomModalHeader closeButton>Создать чат</CustomModalHeader>
            <CustomModalBody>
                <Form onSubmit={handleSubmit}>
                    {contacts.map(contact => (
                        <Form.Group controlId={contact.id} key={contact.id}>
                            <label>
                                <input
                                    type="checkbox"
                                    value={selectedContactIds.includes(contact.id)}
                                    onChange={() => handleCheckboxChange(contact.id)}
                                />
                              {contact.name}
                            </label>
                        </Form.Group>
                    ))}
                    <CustomButton type="submit">Завершить</CustomButton>
                </Form>
            </CustomModalBody>
        </>
    )
}
