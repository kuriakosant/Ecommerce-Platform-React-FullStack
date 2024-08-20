// pages/Shop.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import CartNotification from '../components/CartNotification';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Shop.css';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [brand, setBrand] = useState('all');
  const [gender, setGender] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [notification, setNotification] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    return (
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (category === 'all' || product.category === category) &&
      (brand === 'all' || product.brand === brand) &&
      (gender === 'all' || product.gender === gender) &&
      product.price >= priceRange[0] &&
      product.price <= priceRange[1]
    );
  });

  if (sortOrder === 'asc') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  const resetFilters = () => {
    setSearchTerm('');
    setCategory('all');
    setBrand('all');
    setGender('all');
    setPriceRange([0, 5000]);
    setSortOrder('asc');
  };

  const handleAddProduct = () => {
    if (currentUser && currentUser.isAdmin) {
      window.location.href = '/create-product';
    } else {
      setNotification({ message: 'This feature is only available for admin users', type: 'error' });
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
      setProducts(products.filter(product => product._id !== productId));
      setNotification({ message: `Product ${productName} has been deleted successfully`, type: 'success' });
    } catch (error) {
      console.error('Failed to delete product:', error);
      setNotification({ message: 'Failed to delete product. Please try again.', type: 'error' });
    }
  };

  return (
    <div className="shop-container">
      <div className="shop-background"></div>
      <h1 className="shop-title">Shop</h1>
      <h2 className="shop-subtitle">Home | Shop</h2>
      <div className="search-bar">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="all">Select Category</option>
            <option value="clothing">Clothing</option>
            <option value="shoes">Shoes</option>
          </select>
          <select value={brand} onChange={(e) => setBrand(e.target.value)}>
            <option value="all">Select Brand</option>
            <option value="brand1">Brand 1</option>
            <option value="brand2">Brand 2</option>
          </select>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="all">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <div className="price-slider">
            <label>Price Range: ${priceRange[0]} - ${priceRange[1]}</label>
            <input
              type="range"
              min="0"
              max="5000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, Number(e.target.value)])}
            />
          </div>
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
          <button className="search-button" onClick={() => {}}>Search</button>
          <button className="reset-button" onClick={resetFilters}>Reset</button>
          {currentUser && currentUser.isAdmin && (
            <button className="add-product-button" onClick={handleAddProduct}>+ Add New Product</button>
          )}
        </div>
      </div>
      <div className="product-grid">
        {filteredProducts.map(product => (
          <ProductCard
            key={product._id}
            product={product}
            showNotification={setNotification}
            currentUser={currentUser}
            onDelete={handleDeleteProduct}
          />
        ))}
      </div>
      {notification && <CartNotification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
    </div>
  );
};

export default Shop;
