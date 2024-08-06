import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import './SignUp.css'; // Import the CSS file for styling

const SignUp = () => {
  return (
    <Container className="signup-container">
      <h2 className="signup-heading">Sign Up</h2>
      <Form className="signup-form">
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>
    </Container>
  );
}

export default SignUp;
