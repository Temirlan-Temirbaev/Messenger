import React, { useRef } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useContacts } from '../contexts/ContactsProvider'
import styled from "styled-components";

export default function NewContactModal({ closeModal }) {
  const idRef = useRef()
  const nameRef = useRef()
  const { createContact } = useContacts()

  function handleSubmit(e) {
    e.preventDefault()

    createContact(idRef.current.value, nameRef.current.value)
    closeModal()
  }

  const CustomModalHeader = styled(Modal.Header)`
  width: 100%;  
  background-color: rgba(49,58,85,1);
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
    background-color: rgba(49,58,85,1);
    &:hover {
      background-color: #1d202f;
      color: #c8c2c2;
    }
  `
  return (
    <div>
      <CustomModalHeader closeButton >Создать контакт</CustomModalHeader>
      <CustomModalBody>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Идентификатор</Form.Label>
            <Form.Control type="text" ref={idRef} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Ник</Form.Label>
            <Form.Control type="text" ref={nameRef} required />
          </Form.Group>
          <CustomButton type="submit">Завершить</CustomButton>
        </Form>
      </CustomModalBody>
    </div>
  )
}