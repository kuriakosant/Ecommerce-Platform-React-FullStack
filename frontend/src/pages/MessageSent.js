import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/MessageSent.css';

const MessageSent = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const name = state ? state.name : 'User';

  return (
    <div className="message-sent-container">
      <div className="message-box">
        <h1>Thank you for your feedback, {name}!</h1>
        <button onClick={() => navigate('/')} className="home-button">Back to Home Page</button>
      </div>
    </div>
  );
};

export default MessageSent;
