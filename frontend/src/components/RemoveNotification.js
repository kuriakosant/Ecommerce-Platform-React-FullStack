import React, { useEffect } from 'react';
import '../styles/RemoveNotification.css';

const RemoveNotification = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="remove-notification">
      <div className="message">{message}</div>
      <div className="progress-bar"></div>
    </div>
  );
};

export default RemoveNotification;
