import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import Notification from '../components/Notification';
import '../styles/Checkout.css';

const Checkout = () => {
  const { state } = useCart();
  const navigate = useNavigate();
  const [deliveryInfo, setDeliveryInfo] = useState({
    fullName: '',
    address: '',
    phone: '',
    email: '',
    postalCode: '',
  });
  const [notification, setNotification] = useState(null);

  const totalCost = state.items.reduce((total, item) => total + item.productId.price * item.quantity, 0) + 10;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const validateInput = () => {
    const { fullName, address, phone, email, postalCode } = deliveryInfo;
    if (!fullName || !address || !phone || !email || !postalCode) {
      setNotification({ message: 'Please fill out all the fields.', type: 'error' });
      setTimeout(() => setNotification(null), 2000);
      return false;
    }
    if (!/^\d{10}$/.test(phone)) {
      setNotification({ message: 'Phone number must be 10 digits.', type: 'error' });
      setTimeout(() => setNotification(null), 2000);
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setNotification({ message: 'Invalid email address.', type: 'error' });
      setTimeout(() => setNotification(null), 2000);
      return false;
    }
    if (!/^\d+$/.test(postalCode)) {
      setNotification({ message: 'Postal code must be digits only.', type: 'error' });
      setTimeout(() => setNotification(null), 2000);
      return false;
    }
    return true;
  };

  const handleProceedToPayment = () => {
    if (!validateInput()) return;
    navigate('/payment', { state: { deliveryInfo, totalCost, cartItems: state.items } });
  };

  return (
    <div className="checkout-container">
      {notification && <Notification message={notification.message} type={notification.type} />}
      <div className="checkout-cart">
        <h2>Your Cart</h2>
        {state.items.map((item) => (
          <div key={item.productId._id} className="cart-item">
            <p>{item.productId.name} (x{item.quantity})</p>
            <p>${item.productId.price * item.quantity}</p>
          </div>
        ))}
        <p>Delivery: $10</p>
        <h3>Total: ${totalCost}</h3>
      </div>
      <div className="delivery-info">
        <h2>Delivery Information</h2>
        <input type="text" name="fullName" placeholder="Full Name" value={deliveryInfo.fullName} onChange={handleInputChange} required />
        <input type="text" name="address" placeholder="Address" value={deliveryInfo.address} onChange={handleInputChange} required />
        <input type="text" name="phone" placeholder="Phone Number" value={deliveryInfo.phone} onChange={handleInputChange} required />
        <input type="email" name="email" placeholder="Email" value={deliveryInfo.email} onChange={handleInputChange} required />
        <input type="text" name="postalCode" placeholder="Postal Code" value={deliveryInfo.postalCode} onChange={handleInputChange} required />
        <div className="checkout-buttons">
          <button className="back-to-cart" onClick={() => navigate('/cart')}>Back to Your Cart</button>
          <button onClick={handleProceedToPayment}>Proceed to Payment</button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
