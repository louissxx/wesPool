import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavBar() {
  return (
    <Navbar>
        <Container>
        <Nav className="me-auto">
            <Nav.Link href="#home" className='nav-bar-b'>Carpool</Nav.Link>
            <Nav.Link href="/myrides" className='nav-bar-b'>My Rides</Nav.Link>
            <Nav.Link href="/profile" className='nav-bar-b'>Profile</Nav.Link>
        </Nav>
        </Container>
    </Navbar>
  )
}
export default NavBar;
