import React, { useEffect } from 'react';
import '../styles/CartNotification.css';

const CartNotification = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const handleClick = () => {
    window.location.href = '/cart';
  };

  return (
    <div className="cart-notification" onClick={handleClick}>
      <p>{message}</p>
      <div className="progress-bar"></div>
    </div>
  );
};

export default CartNotification;
