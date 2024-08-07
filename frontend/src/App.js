import { BrowserRouter, Routes, Route } from 'react-router-dom';
// src/index.js or src/App.js
// import 'bootstrap/dist/css/bootstrap.min.css';


// pages & components
import Home from './pages/Home';
import ContactUs from './pages/ContactUs';  // Import ContactUs page
import SignIn from './pages/SignUp';        // Import SignUp page
import LogIn from './pages/LogIn';          // Import LogIn page
import Navbar from './components/Navbar';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<ContactUs />} />  // Add route for ContactUs page
            <Route path="/signin" element={<SignIn />} />      // Add route for SignIn page
            <Route path="/login" element={<LogIn />} />        // Add route for LogIn page
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
