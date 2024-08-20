// components/ProductCard.js
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import '../styles/ProductCard.css';

const ProductCard = ({ product, showNotification, currentUser, onDelete }) => {
  const { dispatch } = useCart();
  const navigate = useNavigate();

  const addToCart = async (item) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        showNotification('You need to be logged in to add products to the cart');
        return;
      }
      const { data } = await axios.post('http://localhost:5000/api/cart', { productId: item._id, quantity: 1 }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: 'ADD_TO_CART', payload: data });
      showNotification(`Added ${item.name} to cart`);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  const goToProductPage = (e) => {
    if (!e.target.classList.contains('add-to-cart-btn') && !e.target.classList.contains('delete-product-btn')) {
      navigate(`/product/${product._id}`);
    }
  };

  return (
    <div className="product-card" onClick={goToProductPage}>
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <button className="add-to-cart-btn" onClick={() => addToCart(product)}>Add to Cart</button>
      {currentUser && currentUser.isAdmin && (
        <button className="delete-product-btn" onClick={() => onDelete(product._id, product.name)}>Delete Product</button>
      )}
    </div>
  );
};

export default ProductCard;