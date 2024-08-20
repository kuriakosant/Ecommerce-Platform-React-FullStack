import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/WelcomePage.css';

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-page">
      <div className="welcome-container">
        <h1>Welcome to My E-Shop!</h1>
        <p>Thank you for registering with us.</p>
        <button onClick={() => navigate('/shop')}>Check Out Our Shop</button>
        <button onClick={() => navigate('/')}>Home Page</button>
        <button onClick={() => navigate('/about')}>About Us</button>
      </div>
    </div>
  );
};

export default WelcomePage;
