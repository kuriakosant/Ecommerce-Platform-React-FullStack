import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Admin = () => {
  const [product, setProduct] = useState({ name: '', description: '', price: '', image: '', category: '', brand: '', gender: '' });
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
      },
    };
    await axios.post('http://localhost:5000/api/products', product, config);
    setProduct({ name: '', description: '', price: '', image: '', category: '', brand: '', gender: '' });
  };

  if (!currentUser) {
    return <p>Please log in to manage products</p>;
  }

  return (
    <div>
      <h1>Admin Panel</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={product.name} onChange={handleChange} placeholder="Name" required />
        <input type="text" name="description" value={product.description} onChange={handleChange} placeholder="Description" required />
        <input type="number" name="price" value={product.price} onChange={handleChange} placeholder="Price" required />
        <input type="text" name="image" value={product.image} onChange={handleChange} placeholder="Image URL" required />
        <input type="text" name="category" value={product.category} onChange={handleChange} placeholder="Category" required />
        <input type="text" name="brand" value={product.brand} onChange={handleChange} placeholder="Brand" required />
        <input type="text" name="gender" value={product.gender} onChange={handleChange} placeholder="Gender" required />
        <button type="submit">Add Product</button>
      </form>
      <button onClick={() => navigate('/shop')}>Back to Shop</button>
    </div>
  );
};

export default Admin;
