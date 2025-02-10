import React from 'react';
import { Card, ListGroup, Container, Row, Col } from 'react-bootstrap';

function Stack() {
  return (
    <Container fluid className="mt-3">
      <Row className="justify-content-center m-0"> {/* Remove margin */}
        <Col xs={12} md={8} className="p-0">  {/* Ensure full width and no padding */}
          <Card className="shadow-lg w-100">  {/* Ensure the card is full width */}
            <Card.Body>
              <Card.Title className="text-center mb-4">Technology Stack</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <b><a href="https://www.mongodb.com/resources/languages/mern-stack/" target="_blank" rel="noopener noreferrer">MERN</a>:</b> MangoDB, Express, React, & Node.js.
                </ListGroup.Item>
                <ListGroup.Item>
                  <b><a href="https://aws.amazon.com/" target="_blank" rel="noopener noreferrer">AWS Cloud</a>:</b> IAM for access management, Route 53 for domain name management, EC2 for hosting the Express API, S3 for static web hosting, CloudFront for content delivery, API Gateway as a reverse proxy, CloudWatch for monitoring, and KMS for data security.
                </ListGroup.Item>
                <ListGroup.Item>
                  <b><a href="https://docs.docker.com/compose/" target="_blank" rel="noopener noreferrer">Docker Compose</a>:</b> Used to containerize MongoDB and the Express API for easy deployment and management.
                </ListGroup.Item>
                <ListGroup.Item>
                  <b><a href="https://getbootstrap.com/" target="_blank" rel="noopener noreferrer">Bootstrap</a>:</b> A framework for building responsive, mobile-first websites.
                </ListGroup.Item>
                <ListGroup.Item>
                  <b><a href="https://docs.github.com/" target="_blank" rel="noopener noreferrer">GitHub</a>:</b> Source Control.
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
            <Card.Footer className="text-center">
              <div className="mt-3">
                <p>
                  <strong>Author:</strong> Jaya
                  <a
                    href="https://www.linkedin.com/in/jayalalitha-pallatadaka-56169b12"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ marginLeft: '10px' }}
                  >
                    LinkedIn
                  </a>
                </p>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Stack;