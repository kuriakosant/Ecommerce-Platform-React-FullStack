// components/Profile.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Profile.css';

const Profile = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    // Update state to reflect not logged in
    window.location.reload(); // Force a reload to update the state
  };

  if (!currentUser) {
    return (
      <div className="not-logged-in-container">
        <div className="not-logged-in-box">
          <h2>You are not logged in.</h2>
          <button onClick={() => navigate('/login')}>Go to Login Page</button>
        </div>
      </div>
    );
  }



  return (
    <div className="profile-page">
      <div className="welcome-box">
        <h2>Welcome, {currentUser.name}</h2>
      </div>
      <div className="profile-container">
        <h2>Profile</h2>
        <p>Name: {currentUser.name}</p>
        <p>Email: {currentUser.email}</p>
        <p>Phone: {currentUser.phone}</p>
        <p>Address: {currentUser.address}</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <footer>
        © 2024 My E-Shop. All rights reserved.
      </footer>
    </div>
  );
};

export default Profile;
