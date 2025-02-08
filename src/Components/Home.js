import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Container, Row, Col } from 'react-bootstrap';

function Home() {
    return (
        <div>
           {console.log ("I am in Home")}
            <Container   className="mt-2" fluid>
                <Row className="g-4">
                <Col md={4}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Resilience</Card.Title>
                                <Card.Text>
                                Bloom with grace, embrace your thorns.
                                </Card.Text>
                            </Card.Body>
                            <Card.Img variant="bottom" src="/images/img2.jpg" alt="Card Image" />
                        </Card>
                    </Col>
                     <Col md={4}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Hope</Card.Title>
                                <Card.Text>
                                Where there are roses, hope is in full bloom.
                                </Card.Text>
                            </Card.Body>
                            <Card.Img variant="bottom" src="/images/IMG_4029.jpg" alt="Card Image" />
                        </Card>
                    </Col>

                    <Col md={4}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Mindfulness</Card.Title>
                                <Card.Text>
                                Stop and smell the roses, for life is fleeting.
                                </Card.Text>
                            </Card.Body>
                            <Card.Img variant="bottom" src="/images/IMG_4080.jpg" alt="Card Image" />
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Home;
