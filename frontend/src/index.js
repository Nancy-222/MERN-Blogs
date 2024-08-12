import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BlogsContextProvider } from './context/BlogContext';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <BlogsContextProvider>
      <App />
      </BlogsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);