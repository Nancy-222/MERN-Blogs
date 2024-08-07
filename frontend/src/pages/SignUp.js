import {React, useState} from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import './SignUp.css'; // Import the CSS file for styling

const SignUp = () => {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [error, setError] = useState(null)
  const BASE_BACK_URL = "http://localhost:4000"


  const handleSubmit = async (e) => {
    
    e.preventDefault()
    const user = {email, password}

    const response = await fetch(`${BASE_BACK_URL}/api/blogs/users/create`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()
    if (!response.ok) {
      setError(json.error)
    }
    if (response.ok) {
      setError(null)
      window.location = `/login`
    }
  }


  return (
    <Container className="signup-container">
      <h2 className="signup-heading">Sign Up</h2>
      <Form className="signup-form" onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" required={true} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" required={true} onChange={(e) => setPassword(e.target.value)}/>
        </Form.Group>

        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>
      {error && <div className="error">{error}</div>}
    </Container>
  );
}

export default SignUp;
