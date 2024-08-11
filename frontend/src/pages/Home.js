import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import 'bootstrap/dist/css/bootstrap.min.css'; 

const HomePage = () => {
  return (
    <Container fluid className="home">
      <Row className="justify-content-center mb-4">
        <Col md={8} className="text-center">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lead"
          >
            Discover the latest articles and insights from our community.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link to="/signup"> {/* Link to the sign-up page */}
              <Button variant="primary" size="lg">
                Get Started
              </Button>
            </Link>
          </motion.div>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={4}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="mb-4 shadow-sm">
              <Card.Body>
                <Card.Title>Latest Articles</Card.Title>
                <Card.Text>
                  Stay updated with our most recent blog posts. Dive into
                  engaging content and explore topics that interest you.
                </Card.Text>
                <Link to="/blogs">
                  <Button variant="outline-primary">Read More</Button>
                </Link>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
        <Col md={4}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="mb-4 shadow-sm">
              <Card.Body>
                <Card.Title>Featured Authors</Card.Title>
                <Card.Text>
                  Get to know the voices behind our blog. Learn more about our
                  featured authors and their expertise.
                </Card.Text>
                <Button variant="outline-primary">Learn More</Button>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
