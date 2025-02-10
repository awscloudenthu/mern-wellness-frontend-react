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
              I built this project using the <strong>MERN stack, incorporating AWS services</strong> to explore technologies. While the project is still a work in progress and data is not yet persisted, this feature will be enhanced in the future. I’m continuously improving its functionality - stay tuned!
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default About;