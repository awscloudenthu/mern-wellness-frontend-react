import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, ListGroup, Container, Row, Col } from 'react-bootstrap';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'; 

function Contact () {
    return (
        <Container className="mt-3" fluid>
      <h3>Contact</h3>
      <Row>
        {/* Phone */}
        <Col sm={12} md={4}>
          <Card>
            <Card.Body>
              <Card.Title><FaPhoneAlt /> Phone</Card.Title>
                <ListGroup>
                  <ListGroup.Item>+1 (123) 456-7890</ListGroup.Item>
                  <ListGroup.Item>+1 (987) 654-3210</ListGroup.Item>
                </ListGroup>
              <Button variant="primary" href="tel:+11234567890">Call Now</Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Email */}
        <Col sm={12} md={4}>
          <Card>
            <Card.Body>
              <Card.Title><FaEnvelope /> Email</Card.Title>
                <ListGroup>
                  <ListGroup.Item>contact@company.com</ListGroup.Item>
                  <ListGroup.Item>support@company.com</ListGroup.Item>
                </ListGroup>
              <Button variant="primary" href="mailto:contact@company.com">Send Email</Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Address */}
        <Col sm={12} md={4}>
          <Card>
            <Card.Body>
              <Card.Title><FaMapMarkerAlt /> Address</Card.Title>
                <ListGroup>
                  <ListGroup.Item>123 Main Street</ListGroup.Item>
                  <ListGroup.Item>City, State, ZIP</ListGroup.Item>
                </ListGroup>
              <Button variant="primary" href="https://maps.google.com/?q=123+Main+Street" 
                target="_blank" 
                rel="noopener noreferrer">
                Get Directions</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Contact;