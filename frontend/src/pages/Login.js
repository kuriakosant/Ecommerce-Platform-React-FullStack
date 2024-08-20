import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import '../styles/Login.css';

const Login = ({ showNotification }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { currentUser, login } = useAuth();

  useEffect(() => {
    if (currentUser) {
      showNotification('You are already logged in. Please log out to login with a different account.');
    }
  }, [currentUser, showNotification]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      showNotification('Login successful');
      navigate('/welcome'); // Redirect to the welcome page
    } catch (error) {
      if (error.response && error.response.status === 401) {
        showNotification('Invalid email or password');
      } else {
        showNotification('Error logging in');
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
      {currentUser && (
        <div className="static-notification">
          You are already logged in. Please log out to login with a different account.
        </div>
      )}
    </div>
  );
};

export default Login;
