import React, {createRef, useRef, useState} from 'react'
import {Tab, Nav, Button, Modal} from 'react-bootstrap'
import Conversations from './Conversations'
import Contacts from './Contacts'
import NewContactModal from './NewContactModal'
import NewConversationModal from './NewConversationModal'
import './Sidebar.css'

const CONVERSATIONS_KEY = 'conversations'
const CONTACTS_KEY = 'contacts'

export default function Sidebar({id}) {
    const [activeKey, setActiveKey] = useState(CONVERSATIONS_KEY)
    const [modalOpen, setModalOpen] = useState(false)
    const conversationsOpen = activeKey === CONVERSATIONS_KEY
    const navRef = createRef()
    const navRef2 = createRef()

    function closeModal() {
        setModalOpen(false)
    }

    const navItems = document.querySelectorAll('.nav__item-text')


    navItems.forEach(elem => {
        elem.style.color = 'white'
    })

    return (
        <div style={{width: '250px'}} className="d-flex flex-column">
            <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
                <Nav className="nav">
                    <Nav.Item className="nav__item" ref={navRef} onClick={
                        (e) => {
                            e.currentTarget.className = "nav__itemActive"
                            navRef2.current.className = "nav__item"
                        }
                    }>
                        <Nav.Link className="nav__item-text" eventKey={CONVERSATIONS_KEY}>Чаты</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="nav__item" ref={navRef2} onClick={
                        (e) => {
                            e.currentTarget.className = "nav__itemActive"
                            navRef.current.className = "nav__item"
                        }
                    }>
                        <Nav.Link className="nav__item-text" eventKey={CONTACTS_KEY}>Контакты</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Tab.Content className="contacts overflow-auto flex-grow-1">
                    <Tab.Pane eventKey={CONVERSATIONS_KEY}>
                        <Conversations/>
                    </Tab.Pane>
                    <Tab.Pane eventKey={CONTACTS_KEY}>
                        <Contacts/>
                    </Tab.Pane>
                </Tab.Content>
                <div className="p-2 small id-container">
                    Ваш идентификатор: <span className="id-container__text">{id}</span>
                </div>
                <div className="create-button">
                    <button onClick={() => setModalOpen(true)} className="rounded-0 create-button__elem">
                        Новый {conversationsOpen ? 'чат' : 'контакт'}
                    </button>
                </div>
            </Tab.Container>

            <Modal show={modalOpen} onHide={closeModal}>
                {conversationsOpen ?
                    <NewConversationModal closeModal={closeModal}/> :
                    <NewContactModal closeModal={closeModal}/>
                }
            </Modal>
        </div>
    )
}
