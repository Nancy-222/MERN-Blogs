import {React, useState} from 'react';
import { useLogin } from '../hooks/useLogin';
import { Container, Form, Button } from 'react-bootstrap';
import './LogIn.css'; // Import the CSS file for styling

const LogIn = () => {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const {login, error, isLoading} = useLogin()
  const handleSubmit = async (e) => {
    
    e.preventDefault()
  
    await login(email, password)
  
    // const user = {email, password}

    // const response = await fetch(`${BASE_BACK_URL}/api/users/login`, {
    //   method: 'POST',
    //   body: JSON.stringify(user),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // })
    // const json = await response.json()
    // if (!response.ok) {
    //   setError(json.error)
    // }
    // if (response.ok) {
    //   setError(null)
    //   setLoggedIn(json.email)
    // }
  }



  return (
    <Container className="login-container">
      <h2 className="login-heading">Log In</h2>
      <Form className="login-form" onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address<span style={{ color: "red" }}>*</span></Form.Label>
          <Form.Control type="email" placeholder="Enter email"  required={true} onChange={(e) => setEmail(e.target.value)}/>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password<span style={{ color: "red" }}>*</span></Form.Label>
          <Form.Control type="password" placeholder="Password"  required={true} onChange={(e) => setPassword(e.target.value)}/>
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
      {error && <div className="error">{error}</div>}
    </Container>
  );
}

export default LogIn;
