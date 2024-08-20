import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import Notification from '../components/Notification';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const { currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (currentUser && currentUser.token) {
          console.log("Token: ", currentUser.token);
          const { data } = await axios.get('http://localhost:5000/api/users', {
            headers: {
              Authorization: `Bearer ${currentUser.token}`,
            },
          });
          // Filter out admin user
          const nonAdminUsers = data.filter(user => !user.isAdmin);
          setUsers(nonAdminUsers);
        }
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };

    if (currentUser && currentUser.isAdmin) {
      fetchUsers();
    }
  }, [currentUser]);

  const handleDelete = async (userId) => {
    try {
      if (currentUser && currentUser.token) {
        await axios.delete(`http://localhost:5000/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        });
        setUsers(users.filter(user => user._id !== userId));
        setNotification({ message: `User with id ${userId} has been discarded permanently`, type: 'error' });
      }
    } catch (error) {
      console.error('Failed to delete user:', error);
      setNotification({ message: 'Failed to delete user', type: 'error' });
    }
  };

  return (
    <div className="admin-dashboard-container">
      {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
      <h2>Welcome to the Admin Dashboard, here you can make changes to user profiles:</h2>
      <div className="users-container">
        <h3>Currently registered users:</h3>
        {users.map(user => (
          <div key={user._id} className="user-info-box">
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>Address: {user.address}</p>
            {/* Ensure orders and cart are defined */}
            <p>Orders: {user.orders ? user.orders.length : 0}</p>
            <p>Active Cart: {user.cart && user.cart.length > 0 ? 'Yes' : 'No'}</p>
            <button className="delete-button" onClick={() => handleDelete(user._id)}>Permanent Discard of User</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
