import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import Notification from '../components/Notification';
import '../styles/ProductCreatePage.css';

const ProductCreatePage = () => {
  const [product, setProduct] = useState({ name: '', description: '', price: '', image: '', category: '', brand: '', gender: '' });
  const [notification, setNotification] = useState(null);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken'); // Ensure token is retrieved correctly
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.post('http://localhost:5000/api/products', product, config);
      setProduct({ name: '', description: '', price: '', image: '', category: '', brand: '', gender: '' });
      setNotification({ message: 'Product created successfully', type: 'success' });
    } catch (error) {
      console.error('Failed to create product:', error);
      setNotification({ message: 'Failed to create product. Please try again.', type: 'error' });
    }
  };

  return (
    <div className="product-create-container">
      {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
      <h2>Create Product</h2>
      <form onSubmit={handleSubmit} className="product-create-form">
        <input type="text" name="name" value={product.name} onChange={handleChange} placeholder="Name" required />
        <input type="text" name="description" value={product.description} onChange={handleChange} placeholder="Description" required />
        <input type="number" name="price" value={product.price} onChange={handleChange} placeholder="Price" required />
        <input type="text" name="image" value={product.image} onChange={handleChange} placeholder="Image URL" required />
        <input type="text" name="category" value={product.category} onChange={handleChange} placeholder="Category" required />
        <input type="text" name="brand" value={product.brand} onChange={handleChange} placeholder="Brand" required />
        <input type="text" name="gender" value={product.gender} onChange={handleChange} placeholder="Gender" required />
        <button type="submit">Add Product</button>
      </form>
      <button className="back-to-shop-button" onClick={() => navigate('/shop')}>Back to Shop</button>
    </div>
  );
};

export default ProductCreatePage;
