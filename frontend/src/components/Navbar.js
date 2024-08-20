import React from 'react';
import { FaHeadphones, FaEnvelope, FaShoppingCart, FaHome, FaUserCircle, FaUserAlt } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { currentUser } = useAuth();

  return (
    <div className="navbar">
      <div className="navbar-contact">
        <p>
          <FaHeadphones className="icon" /> +40 0123 456 789 / +2610 0123 456 789
          <FaEnvelope className="envelope-icon icon" /> AntonGarmentsInc.support@test.com
        </p>
      </div>
      <div className="navbar-center-wrapper">
        <div className="navbar-center">
          <h1><a href="/"><FaHome className="home-icon" /> My E-Shop</a></h1>
        </div>
      </div>
      <div className="navbar-right">
        <a href="/cart"><FaShoppingCart className="cart-icon" /></a>
        <div className="navbar-profile">
          <a href="/profile"><FaUserCircle className="profile-icon" /></a>
          {currentUser && <span className="navbar-user"><FaUserAlt className="static-icon" /> {`Logged in as: ${currentUser.name}`}</span>}
        </div>
      </div>
      <div className="navbar-menu">
        <a href="/">Home</a>
        <a href="/shop">Shop</a>
        <a href="/about">About Us</a>
        <a href="/contact">Contact</a>
        <a href="/shipping-policy">Shipping Policy</a>
        <a href="/partners">Partners</a>
        <a href="/login">Login</a>
        <a href="/register">Register</a>
        {currentUser && <a href="/orders">Orders</a>}
        {currentUser && currentUser.isAdmin && <a href="/admin-dashboard" className="admin-dashboard-button">Admin Dashboard</a>}
      </div>
    </div>
  );
}

export default Navbar;

 
