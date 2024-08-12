// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import './Navbar.css'; // Ensure this CSS file is correctly linked

const Navbar = () => {
  const {logout} = useLogout()
  const { user } = useAuthContext()
  const handleClick = () => {
    logout()
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-title">Blog Buddy</h1>
        <div className="navbar-buttons">
          <Link to="/">Home</Link>
          <Link to="/contact">Contact Us</Link>
          {!user && (
            <div className="navbar-buttons">          
          <Link to="/signup">Sign Up</Link>
          <Link to="/login">Log In</Link>
            </div>
          )}
          {user && (
            <div className="navbar-buttons">
              <span>{user.email}</span>
              <button onClick={handleClick}> Log out</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
