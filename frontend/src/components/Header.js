import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

export default function Header() {
  return (
    <Navbar className='banner'>
        <Container>
          <Navbar.Brand href="/">
            wesPool
          </Navbar.Brand>
        </Container>
    </Navbar>
  )
}
