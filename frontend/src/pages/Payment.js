// src/pages/Payment.js

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Payment.css';

const Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const validateCardDetails = () => {
    const { cardNumber, expiryDate, cvv } = cardDetails;
    if (!/^\d{16}$/.test(cardNumber)) {
      setError('Card number must be 16 digits.');
      return false;
    }
    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
      setError('Expiry date must be in MM/YY format.');
      return false;
    }
    if (!/^\d{3}$/.test(cvv)) {
      setError('CVV must be 3 digits.');
      return false;
    }
    return true;
  };

  const handleFinalizeOrder = async () => {
    if (!validateCardDetails()) {
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post(
        'http://localhost:5000/api/orders',
        {
          items: state.cartItems,
          deliveryInfo: state.deliveryInfo,
          total: state.totalCost,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        navigate('/order-complete', {
          state: {
            deliveryInfo: state.deliveryInfo,
            totalCost: state.totalCost,
            orderId: response.data._id,
          },
        });
      }
    } catch (error) {
      console.error('Failed to place order:', error);
      setError('Failed to place order. Please try again.');
    }
  };

  return (
    <div className="payment-container">
      <h2>Payment Details</h2>
      <div className="order-summary">
        <h3>Order Summary</h3>
        <p>Full Name: {state.deliveryInfo.fullName}</p>
        <p>Address: {state.deliveryInfo.address}</p>
        <p>Phone: {state.deliveryInfo.phone}</p>
        <p>Email: {state.deliveryInfo.email}</p>
        <p>Postal Code: {state.deliveryInfo.postalCode}</p>
        <h3>Cart Items</h3>
        {state.cartItems.map((item) => (
          <div key={item.productId._id} className="cart-item">
            <p>{item.productId.name} (x{item.quantity})</p>
            <p>${item.productId.price * item.quantity}</p>
          </div>
        ))}
        <h3>Total: ${state.totalCost}</h3>
      </div>
      <div className="card-details">
        <input
          type="text"
          name="cardNumber"
          placeholder="Card Number"
          value={cardDetails.cardNumber}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="expiryDate"
          placeholder="Expiry Date (MM/YY)"
          value={cardDetails.expiryDate}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="cvv"
          placeholder="CVV"
          value={cardDetails.cvv}
          onChange={handleInputChange}
          required
        />
        {error && <p className="error-message">{error}</p>}
        <button onClick={handleFinalizeOrder}>Finalize Order</button>
      </div>
    </div>
  );
};

export default Payment;
