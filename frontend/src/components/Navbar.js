import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css'; // Ensure this CSS file is correctly linked

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = () => {
    logout();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="burger-menu" onClick={toggleMenu}>
          <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
        </div>
        <h1 className="navbar-title">omyblog</h1>
        <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-item">Home</Link>
          <Link to="/contact" className="nav-item">Contact Us</Link>
          {!user && (
            <>
              <Link to="/signup" className="nav-item">Sign Up</Link>
              <Link to="/login" className="nav-item">Log In</Link>
            </>
          )}
          {user && (
            <span onClick={handleClick} className="nav-item">Log out</span>
          )}
        </div>
        {user && (
          <div className="loggedInUser">
            <p>Logged in as</p>
            <h5>{user.name}</h5>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

