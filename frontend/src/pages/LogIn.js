import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import './LogIn.css'; // Import the CSS file for styling

const LogIn = () => {
  return (
    <Container className="login-container">
      <h2 className="login-heading">Log In</h2>
      <Form className="login-form">
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address<span style={{ color: "red" }}>*</span></Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password<span style={{ color: "red" }}>*</span></Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <div className='btn-container'>
          <Button variant="primary" type="submit">
            Log In
          </Button>

          <span className='forgotPassword'>
            <a href="#">Forgot Password</a>
          </span>
        </div>


      </Form>
    </Container>
  );
}

export default LogIn;
