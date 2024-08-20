// ProductPage.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../contexts/AuthContext';
import CartNotification from '../components/CartNotification';
import '../styles/ProductPage.css';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [notification, setNotification] = useState(null);
  const { dispatch } = useCart();
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setNotification('Error fetching product details');
      }
    };
    fetchProduct();
  }, [id]);

  const addToCart = async (item) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:5000/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: item._id, quantity }),
      });
      const data = await response.json();

      if (response.ok) {
        dispatch({ type: 'ADD_TO_CART', payload: data });
        setNotification(`${quantity} x ${item.name} has been added to cart`);
        setTimeout(() => {
          setNotification(null);
        }, 2000);
      } else {
        setNotification(`Error: ${data.message}`);
      }
    } catch (error) {
      setNotification('Error adding to cart');
      setTimeout(() => {
        setNotification(null);
      }, 2000);
    }
  };

  const handleDeleteProduct = async (productId, productName) => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.delete(`http://localhost:5000/api/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await axios.delete(`http://localhost:5000/api/cart/remove-product/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await axios.delete(`http://localhost:5000/api/orders/remove-product/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotification({ message: `Product ${productName} has been deleted successfully`, type: 'success' });
      navigate('/shop');
    } catch (error) {
      console.error('Failed to delete product:', error);
      setNotification({ message: 'Failed to delete product. Please try again.', type: 'error' });
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-page">
      <button className="back-to-shop" onClick={() => navigate('/shop')}>Back to Shop</button>
      <div className="product-details">
        <img src={product.image} alt={product.name} className="product-image" />
        <div className="product-info">
          <h2>{product.name}</h2>
          <div className="reviews">
            <span>{product.reviews} reviews</span>
            <span>★ ★ ★ ☆ ☆</span> {/* Simplified star rating for illustration */}
          </div>
          <p className="price">${product.price}</p>
          <p className="description">{product.description}</p>
          <div className="quantity-selector">
            <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>-</button>
            <input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} min="1" />
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>
          <button className="add-to-cart-btn" onClick={() => addToCart(product)}>Add to Cart</button>
          {currentUser && currentUser.isAdmin && (
            <button className="delete-product-btn" onClick={() => handleDeleteProduct(product._id, product.name)}>Delete Product</button>
          )}
          {notification && <CartNotification message={notification.message || notification} onClose={() => setNotification(null)} />}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
