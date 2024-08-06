import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import './ContactUs.css'; // Import the CSS file for styling

const ContactUs = () => {
  return (
    <Container className="contact-us-container">
      <h2 className="contact-us-heading">Contact Us</h2>
      <Form className="contact-us-form">
        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Your Name" />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group controlId="formBasicMessage">
          <Form.Label>Message</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Your Message" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Send
        </Button>
      </Form>
    </Container>
  );
}

export default ContactUs;
