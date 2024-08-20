import React, { useState } from 'react';
import { useCart } from '../hooks/useCart';
import '../styles/Cart.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import RemoveNotification from '../components/RemoveNotification';

const Cart = () => {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();
  const [removeNotification, setRemoveNotification] = useState(null);

  const handleRemove = async (id, name) => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.delete(`http://localhost:5000/api/cart/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: 'REMOVE_FROM_CART', payload: id });
      setRemoveNotification(`Removed ${name} from cart`);
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
    }
  };

  const handleQuantityChange = async (id, name, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemove(id, name);
      return;
    }
    try {
      const token = localStorage.getItem('authToken');
      await axios.put(`http://localhost:5000/api/cart/${id}`, { quantity: newQuantity }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { itemId: id, newQuantity } });
    } catch (error) {
      console.error('Failed to update item quantity:', error);
    }
  };

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {state.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {state.items.map(item => (
            <div key={item.productId?._id || item.id} className="cart-item">
              {item.productId ? (
                <>
                  <img src={item.productId.image} alt={item.productId.name} />
                  <div className="cart-item-details">
                    <p>{item.productId.name}</p>
                    <p>${item.productId.price}</p>
                    <div className="quantity-selector">
                      <button onClick={() => handleQuantityChange(item.productId._id, item.productId.name, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleQuantityChange(item.productId._id, item.productId.name, item.quantity + 1)}>+</button>
                    </div>
                    <button onClick={() => handleRemove(item.productId._id, item.productId.name)}>Remove</button>
                  </div>
                </>
              ) : (
                <div className="cart-item-details">
                  <p>This product has been removed</p>
                  <button onClick={() => handleRemove(item.id, 'Unknown Product')}>Remove</button>
                </div>
              )}
            </div>
          ))}
          <button className="checkout-button" onClick={() => navigate('/checkout')}>
            Go to Checkout
          </button>
        </>
      )}
      {removeNotification && <RemoveNotification message={removeNotification} onClose={() => setRemoveNotification(null)} />}
    </div>
  );
};

export default Cart;
