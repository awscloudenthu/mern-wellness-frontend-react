import React from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Hero = () => {
    const navigate = useNavigate();
    const navigateWellnessTracker = () => {
        navigate("/WellnessTracker");
    }
    return (
        <section className="hero bg-primary text-white text-center py-5"
            style={{
                backgroundImage: `url(/images/hero1.jpg)`,
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center'
            }}
        >
            <Container fluid>
                <Row>
                    <Col>
                        <h1 className="display-4">Welcome to Your Wellness</h1>
                        <p className="lead">
                            Your journey to better health and happiness starts here!
                        </p>
                        <Button variant="light" size="lg" onClick={navigateWellnessTracker}>
                            Get Started
                        </Button>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Hero;