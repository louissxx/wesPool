import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export default function Header() {
  return (

    <Navbar className='banner'>
      <Container>
        <Navbar.Brand href="/">
          wesPool
        </Navbar.Brand>
        <Navbar.Brand href="/login">
          Login
        </Navbar.Brand>
      </Container>
    </Navbar>
  )

}
