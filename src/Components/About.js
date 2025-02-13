import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';

function About() {
  return (
    <Container fluid className="mt-3">
      <Row className="justify-content-center m-0"> {/* Remove margin */}
        <Col xs={12} md={8} className="p-0">  {/* Ensure full width and no padding */}
          <Card className="shadow-lg w-100">  {/* Ensure the card is full width */}
            <Card.Body>
              <Card.Title className="text-center mb-4">About This Project</Card.Title>
              I built this project using the <strong>MERN stack—MongoDB, Express, React, and Node.js—along with AWS services</strong> to explore technologies. To track and persist wellness data, you’ll need to sign up for the application. During the signup process, a verification code will be sent to your email, which must be entered to complete your account creation. <strong>I’m continuously improving its functionality—stay tuned for updates!</strong>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default About;