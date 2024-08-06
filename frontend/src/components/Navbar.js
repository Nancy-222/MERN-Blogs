// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Ensure this CSS file is correctly linked

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-title">Blog Buddy</h1>
        <div className="navbar-buttons">
          <Link to="/">Home</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/signin">Sign In</Link>
          <Link to="/login">Log In</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
