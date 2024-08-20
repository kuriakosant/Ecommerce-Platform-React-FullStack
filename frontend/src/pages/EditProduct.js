import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../styles/EditProduct.css';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    image: '',
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    if (currentUser && currentUser.role === 'admin') {
      fetchProduct();
    } else {
      navigate('/shop');
    }
  }, [id, currentUser, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/products/${id}`, product);
      navigate('/shop');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className="edit-product-container">
      <h1>Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={product.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={product.category}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={product.image}
          onChange={handleChange}
          required
        />
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;
