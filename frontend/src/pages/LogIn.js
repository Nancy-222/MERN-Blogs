import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import './LogIn.css'; // Import the CSS file for styling

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const BASE_BACK_URL = "http://localhost:4000";
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { email, password };

    try {
      const response = await fetch(`${BASE_BACK_URL}/api/users/login`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const json = await response.json();
      if (!response.ok) {
        setError(json.error);
      } else {
        setError(null);
        navigate('/blog-form-details'); // Redirect to the BlogFormDetails page
      }
    } catch (err) {
      setError('An error occurred while logging in.');
    }
  };

  return (
    <Container className="login-page">
      <div className="login-container">
        <h2 className="login-heading">Log In</h2>
        <Form className="login-form" onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email Address<span style={{ color: "red" }}>*</span></Form.Label>
            <Form.Control 
              type="email" 
              placeholder="Enter email"  
              required 
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password<span style={{ color: "red" }}>*</span></Form.Label>
            <Form.Control 
              type="password" 
              placeholder="Password"  
              required 
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <div className="btn-container">
            <Button variant="primary" type="submit">
              Log In
            </Button>

            <span className="forgotPassword">
              <a href="#">Forgot Password</a>
            </span>
          </div>
        </Form>
        {error && <div className="error">{error}</div>}
      </div>
    </Container>
  );
}

export default LogIn;
