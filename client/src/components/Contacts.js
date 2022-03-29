import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useContacts } from '../contexts/ContactsProvider';
import './Contacts.css'

export default function Contacts() {
  const { contacts } = useContacts()

  return (
    <div className="contacts">
      {contacts.map(contact => (
        <button className="contact__item" key={contact.id}>
          {contact.name}
        </button>
      ))}
    </div>
  )
}
