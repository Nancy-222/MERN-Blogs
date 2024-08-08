import 'react-phone-number-input/style.css';
import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import Select from 'react-select';
import { countries } from 'countries-list'; // Import country data
import Flag from 'react-world-flags';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'; // Import the CSS for PhoneInput
import './SignUp.css'; // Import the CSS file for styling

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');

  const BASE_BACK_URL = "http://localhost:4000";

  // Convert country data to options for react-select
  const countryOptions = Object.entries(countries).map(([code, { name }]) => ({
    value: code,
    label: (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Flag code={code.toUpperCase()} style={{ width: 20, height: 15, marginRight: 10 }} />
        {name}
      </div>
    ),
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password != null && password !== "" && password.length < 8) {
      setError('Password must be at least 8 characters long!');
      return;
    }

    const user = {
      firstName,
      lastName,
      country: selectedCountry ? selectedCountry.value : '',
      email,
      password,
      phoneNumber,
    };

    try {
      const response = await fetch(`${BASE_BACK_URL}/api/blogs/users/create`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const json = await response.json();
      if (!response.ok) {
        setError(json.error);
      } else {
        setError('');
        window.location = `/login`;
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    }
  };

  return (
    <Container className="signup-container">
      <h2 className="signup-heading">Sign Up</h2>
      <Form className="signup-form" onSubmit={handleSubmit}>
        <Form.Group controlId="formfirstname">
          <Form.Label>First Name<span style={{ color: "red" }}>*</span></Form.Label>
          <Form.Control type="text" placeholder="Enter a First Name" required onChange={(e) => setFirstName(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formlastname">
          <Form.Label>Last Name<span style={{ color: "red" }}>*</span></Form.Label>
          <Form.Control type="text" placeholder="Enter a Last Name" required onChange={(e) => setLastName(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formCountry" className="form-group-spacing">
          <Form.Label>Country</Form.Label>
          <Select
            value={selectedCountry}
            onChange={setSelectedCountry}
            options={countryOptions}
            placeholder="Select a country"
          />
        </Form.Group>

        <Form.Group controlId="formPhoneNumber" className="form-group-spacing">
          <Form.Label>Phone Number</Form.Label>
          <PhoneInput
            international
            countryCallingCodeEditable={false}
            value={phoneNumber}
            onChange={setPhoneNumber}
            defaultCountry={selectedCountry ? selectedCountry.value : 'US'} // Set default country based on selected country
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address<span style={{ color: "red" }}>*</span></Form.Label>
          <Form.Control type="email" placeholder="Enter email" required onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password<span style={{ color: "red" }}>*</span></Form.Label>
          <Form.Control type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>
      {error && <div className="error">{error}</div>}
    </Container>
  );
};

export default SignUp;

