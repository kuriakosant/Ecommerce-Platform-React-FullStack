import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import Notification from '../components/Notification';
import '../styles/Orders.css';

const Orders = () => {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://localhost:5000/api/orders', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleCancelOrder = async (orderId) => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.delete(`http://localhost:5000/api/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(orders.filter(order => order._id !== orderId));
      setNotification({ message: `Your Order with ID: ${orderId} has been cancelled`, type: 'error' });
    } catch (error) {
      console.error('Failed to cancel order:', error);
      if (error.response) {
        // Server responded with a status other than 200 range
        console.error('Server Error:', error.response.data);
      } else if (error.request) {
        // Request was made but no response received
        console.error('Network Error:', error.request);
      } else {
        // Something else happened in setting up the request
        console.error('Error:', error.message);
      }
      setNotification({ message: 'Failed to cancel order. Please try again.', type: 'error' });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="orders-container">
      {notification && <Notification message={notification.message} type={notification.type} />}
      <h2>Your Orders</h2>
      {currentUser ? (
        orders.length === 0 ? (
          <p>Hello {currentUser.name}, you have no orders yet.</p>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="order">
              <h3>Order ID: {order._id}</h3>
              <p>Total: ${order.total}</p>
              <p>Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <h4>Delivery Information</h4>
              <p>Full Name: {order.deliveryInfo.fullName}</p>
              <p>Address: {order.deliveryInfo.address}</p>
              <p>Phone: {order.deliveryInfo.phone}</p>
              <p>Email: {order.deliveryInfo.email}</p>
              <p>Postal Code: {order.deliveryInfo.postalCode}</p>
              <h4>Items</h4>
              {order.items.map((item) => (
                <div key={item.productId?._id || item._id} className="order-item">
                  <p>{item.productId?.name || 'Deleted Product'} (x{item.quantity})</p>
                  <p>${item.productId?.price * item.quantity || 'N/A'}</p>
                </div>
              ))}
              <button className="cancel-order-button" onClick={() => handleCancelOrder(order._id)}>Cancel Order</button>
            </div>
          ))
        )
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
};

export default Orders;
