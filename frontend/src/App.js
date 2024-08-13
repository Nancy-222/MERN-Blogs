import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import BlogDetails from './components/BlogDetails'; // Ensure correct path
import BlogForm from './components/BlogForm'; // Ensure correct path
import ContactUs from './pages/ContactUs';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import Footer from './pages/Footer';
import BlogPages from './pages/BlogPages'; // Ensure correct path
import BlogFormDetails from './pages/BlogFormDetails'; // Ensure correct path
import Navbar from './components/Navbar';
import { AuthContextProvider, AuthContext } from './context/AuthContext';
import FeaturedAuthor from './pages/FeaturedAuthor';


// Private Route Component
const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = React.useContext(AuthContext);
  return isAuthenticated ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <BrowserRouter>
          <Navbar />
          <div className="pages">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blogs" element={<BlogPages />} /> {/* Use BlogPages for listing all blogs */}
              {/* <Route path="/users/:id" element={<ProfilePage />} /> */}
              <Route path="/blog-form" element={<BlogForm />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<LogIn />} />
              {/* <Route path="/home" element={<PrivateRoute element={<Home />} />} /> */}
              <Route path="/featured-author" element={<FeaturedAuthor />} />
              <Route path="/blog-form-details" element={<BlogFormDetails />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
