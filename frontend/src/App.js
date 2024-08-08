import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// pages & components
import Home from './pages/Home';
import ContactUs from './pages/ContactUs';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import Footer from './pages/Footer';
import Navbar from './components/Navbar';
import { AuthProvider, AuthContext } from './context/AuthContext';

// Private Route Component
const PrivateRoute = ({ element, ...rest }) => {
  const { isAuthenticated } = React.useContext(AuthContext);
  return isAuthenticated ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <div className="pages">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="/home" element={<PrivateRoute element={<Home />} />} />
            </Routes>
            
          </div>
          <Footer/>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
