// src/pages/OrderComplete.js
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/OrderComplete.css';

const OrderComplete = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      document.getElementById('order-success-notification').style.display = 'none';
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!state) {
    return <p>Loading...</p>;
  }

  return (
    <div className="order-complete-container">
      <div id="order-success-notification" className="order-success-notification">
        Order Has Been Successfully Placed
      </div>
      <div className="order-complete-box">
        <div className="order-complete-box-inner">
          <h2>Thank you {state.deliveryInfo.fullName} for your order!</h2>
          <p>Your Order ID: {state.orderId}</p>
          <p>Your Total: ${state.totalCost}</p>
          <p>Order Completion Date: {new Date().toLocaleDateString()}</p>
          <p>You can view your orders here:</p>
          <div className="order-complete-buttons">
            <button className="view-orders" onClick={() => navigate('/orders')}>My Orders</button>
            <button className="back-to-shop" onClick={() => navigate('/shop')}>Back to Shop</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderComplete;
