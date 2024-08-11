import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import './ContactUs.css'; // Import the CSS file for styling

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const BASE_BACK_URL = "http://localhost:4000";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name && email && message) {
      const mail = { name, email, message };

      try {
        const response = await fetch(`${BASE_BACK_URL}/api/blogs/support`, {
          method: 'POST',
          body: JSON.stringify(mail),
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const json = await response.json();
        if (!response.ok) {
          setError(json.error || 'Something went wrong');
          setSuccess('');
        } else {
          setError('');
          setEmail('');
          setName('');
          setMessage('');
          setSuccess('Message sent!');
          document.getElementById('contact-form').reset();
        }
      } catch (err) {
        setError('Network error. Please try again.');
        setSuccess('');
      }
    } else {
      setError("All fields are required!");
      setSuccess('');
    }
  };

  return (
    <Container className="contact-us-page">
      <div className="contact-us-container">
        <h2 className="contact-us-heading">Contact Us</h2>
        <Form className="contact-us-form" id='contact-form' onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicName">
            <Form.Label>Name<span style={{ color: "red" }}>*</span></Form.Label>
            <Form.Control
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email Address<span style={{ color: "red" }}>*</span></Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicMessage">
            <Form.Label className="message">Message<span style={{ color: "red" }}>*</span></Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Your Message"
              className="message-textarea"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Send
          </Button>
        </Form>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
      </div>
    </Container>
  );
}

export default ContactUs;


