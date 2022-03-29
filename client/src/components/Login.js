import React, {useRef} from 'react'
import {Container, Form, Button} from 'react-bootstrap'
import {v4 as uuidV4} from 'uuid'
import styled from "styled-components";

export default function Login({onIdSubmit}) {
    const idRef = useRef()

    function handleSubmit(e) {
        e.preventDefault()

        onIdSubmit(idRef.current.value)
    }

    function createNewId() {
        onIdSubmit(uuidV4())
    }

    const CustomDiv = styled.div`
      background-color: rgba(49, 58, 85, 1)
    `

    return (
        <CustomDiv>
            <Container className="align-items-center d-flex" style={{height: '100vh'}}>
                <Form onSubmit={handleSubmit} className="w-100">
                    <Form.Group>
                        <Form.Label style={{color: 'white'}}>Enter Your Id</Form.Label>
                        <Form.Control type="text" ref={idRef} required/>
                    </Form.Group>
                    <Button type="submit" className="mr-2">Login</Button>
                    <Button onClick={createNewId} variant="secondary">Create A New Id</Button>
                </Form>
            </Container>
        </CustomDiv>
    )
}
