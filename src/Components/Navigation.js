import React, { useState } from 'react';
import { Navbar, Nav, Container, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './NavbarStyle.css';  

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false); // For controlling the sidebar (side menu)

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          {/* Hamburger icon only for mobile */}
          <Navbar.Toggle 
            className="d-block d-lg-none" 
            onClick={toggleSidebar} 
            aria-controls="navbar-nav"
          />

          {/* Desktop navigation links */}
          <Navbar.Collapse id="navbar-nav" className="d-none d-lg-flex">
            <Nav className="ms-auto fs-6">
              <Nav.Item>
                <Nav.Link as={Link} to="/">Home</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/WellnessTracker">Wellness</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/about">About</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Sidebar for Mobile */}
      <Offcanvas show={isOpen} onHide={toggleSidebar} placement="start" className="offcanvas-start d-lg-none">
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Item>
              <Nav.Link as={Link} to="/" onClick={toggleSidebar}>Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/WellnessTracker" onClick={toggleSidebar}>Wellness</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/about" onClick={toggleSidebar}>About</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/contact" onClick={toggleSidebar}>Contact</Nav.Link>
            </Nav.Item>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Navigation;