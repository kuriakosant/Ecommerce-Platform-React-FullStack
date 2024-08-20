// src/components/Notification.js
import React, { useEffect } from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import '../styles/Notification.css';

const Notification = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="notification">
      <AiOutlineCheckCircle className="notification-icon" />
      <p className="notification-text">{message}</p>
      <div className="notification-timer"></div>
    </div>
  );
};

export default Notification;
