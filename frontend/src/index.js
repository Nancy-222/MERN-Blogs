import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BlogsContextProvider } from './context/BlogContext';
import { AuthProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BlogsContextProvider>
      <App />
      </BlogsContextProvider>
    </AuthProvider>
  </React.StrictMode>
);