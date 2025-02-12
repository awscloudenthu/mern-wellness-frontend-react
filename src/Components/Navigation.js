import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Offcanvas } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';
import { getCurrentUser, signOut } from './AuthService';
import './NavbarStyle.css';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false); // State to manage sidebar visibility
  const { user, setUser } = useUser(); // Get user from context
  const navigate = useNavigate(); // Navigation hook

  // Load current user on mount
  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser || null);
  }, [setUser]);

  // Handle user sign-out
  const handleSignOut = () => {
    setUser(null);
    signOut();
    setIsOpen(false); // Close sidebar on sign-out
    navigate('/signin');
  };

  return (
    <>
      {/* Navbar */}
      <Navbar bg="light" expand="lg" className="navbar-custom">
        <Container fluid>
          {/* <Navbar.Brand as={Link} to="/">MyApp</Navbar.Brand> */}
          {/* Hamburger Toggle for Mobile */}
          <Navbar.Toggle aria-controls="offcanvas-nav" onClick={() => setIsOpen(true)} />
          {/* Navbar Links for Desktop */}
          <Navbar.Collapse id="navbar-nav" className="d-none d-lg-block">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/about">About</Nav.Link>
              <Nav.Link as={Link} to="/wellnesstracker">Wellness</Nav.Link>
              <Nav.Link as={Link} to="/stack">Stack</Nav.Link>
              <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
            </Nav>
            <Nav className="ms-auto">
              {user ? (
                <>
                  <div className="navbar-text text-muted">Welcome {user.email}</div>
                  <Nav.Link as={Link} to="#" onClick={handleSignOut}>Sign Out</Nav.Link>
                </>
              ) : (
                <Nav.Link as={Link} to="/signin">Sign In</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Sidebar for Mobile */}
      <Offcanvas
        show={isOpen}
        onHide={() => setIsOpen(false)}
        placement="start"
        className="offcanvas-custom"
      >
        <Offcanvas.Header closeButton>
          {/* <Offcanvas.Title>Menu</Offcanvas.Title> */}
        </Offcanvas.Header>
        <Offcanvas.Body>
          {/* User Information Section */}
          {user && (
            <div className="user-info mb-3 p-3 bg-light rounded">
              <div className="text-muted navbar-text">Welcome {user.email}</div>
              
            </div>
          )}

          {/* Menu Links */}
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/" onClick={() => setIsOpen(false)}>Home</Nav.Link>
            <Nav.Link as={Link} to="/about" onClick={() => setIsOpen(false)}>About</Nav.Link>
            <Nav.Link as={Link} to="/wellnesstracker" onClick={() => setIsOpen(false)}>Wellness</Nav.Link>
            <Nav.Link as={Link} to="/stack" onClick={() => setIsOpen(false)}>Stack</Nav.Link>
            <Nav.Link as={Link} to="/contact" onClick={() => setIsOpen(false)}>Contact</Nav.Link>
            {user ? (
              <Nav.Link as={Link} to="#" onClick={handleSignOut}>Sign Out</Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/signin" onClick={() => setIsOpen(false)}>Sign In</Nav.Link>
            )}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Navigation;