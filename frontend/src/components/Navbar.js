import React from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import './Navbar.css'; // Ensure this CSS file is correctly linked


const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-title">omyblog</h1>
        <div className="navbar-links">
          <Link to="/" className="nav-item">Home</Link>
          <Link to="/contact" className="nav-item">Contact Us</Link>
          {!user && (
          <Link to="/signup" className="nav-item">Sign Up</Link>
          )}
          {!user && (
          <Link to="/login" className="nav-item">Log In</Link>
          )}
          {user && (
          <Link onClick={handleClick} className="nav-item">Log out</Link>
          )}
        </div>
        <div className="navbar-social">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebookF} className="social-icon" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTwitter} className="social-icon" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} className="social-icon" />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faYoutube} className="social-icon" />
          </a>
          { user && (<div  className="loggedInUser">
            <p>Logged in as</p>
            <h5>{user.name}</h5>
          </div>)}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
