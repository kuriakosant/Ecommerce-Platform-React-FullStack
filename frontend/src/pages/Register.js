// components/Register.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import '../styles/Register.css';

const Register = ({ showNotification }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      showNotification('You are already logged in. Please log out to register a new account.');
    }
  }, [currentUser, showNotification]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/register', {
        email, password, name, phone, address
      });
      localStorage.setItem('authToken', response.data.token);
      showNotification('Registration successful');
      navigate('/welcome'); // Redirect to the welcome page
    } catch (error) {
      if (error.response && error.response.status === 400) {
        showNotification('User already exists. Please login.');
      } else {
        showNotification('Error registering');
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="form-container">
        <h2>Register</h2>
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
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <button type="submit">Register</button>
        </form>
      </div>
      {currentUser && (
        <div className="static-notification">
          You are already logged in. Please log out to register with a different account.
        </div>
      )}
    </div>
  );
};

export default Register;
