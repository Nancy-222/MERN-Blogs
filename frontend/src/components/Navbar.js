import { Link } from 'react-router-dom';
import './Navbar.css'; // Ensure this file is updated

const Navbar = () => {
    return (
        <header className="navbar">
            <div className="container">
                <div className="brand">
                    <Link to="/">
                        <h1>Blog Buddy</h1>
                    </Link>
                </div>
                <nav className="nav-links">
                    <Link to="/">Home</Link>
                    <Link to="/contact">Contact Us</Link>
                    <Link to="/signin">Sign In</Link>
                    <Link to="/login">Log In</Link>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;
