import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './FeaturedAuthor.css';

const FeaturedAuthor = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  const BASE_BACK_URL = "http://localhost:4000"; // API base URL

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${BASE_BACK_URL}/api/users`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError('There was an error fetching the users!');
        console.error('There was an error fetching the users!', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="featured-author-background">
      <Container fluid className="mt-4">
        <h1 className="text-center mb-4">Featured Authors</h1>
        {error && <div className="error-message text-center">{error}</div>}
        <Row className="justify-content-center">
          {users.map(user => (
            <Col md={4} key={user._id} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{user.firstName} {user.lastName}</Card.Title>
                  <Card.Text>{user.bio || 'No bio provided'}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default FeaturedAuthor;
