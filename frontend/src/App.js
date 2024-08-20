import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Contact from './pages/Contact';
import Shop from './pages/Shop';
import ProductPage from './pages/ProductPage';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Payment from './pages/Payment';
import Orders from './pages/Orders';
import ShippingPolicy from './pages/ShippingPolicy';
import Partners from './pages/Partners';
import Welcome from './pages/Welcome';
import About from './pages/About'; 
import CreateProduct from './pages/ProductCreatePage'; 
import OrderComplete from './pages/OrderComplete'; 
import MessageSent from './pages/MessageSent';
import AdminDashboard from './pages/AdminDashboard';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './hooks/useCart';
import Notification from './components/Notification';
import useNotification from './hooks/useNotification';

function App() {
  const { notification, showNotification } = useNotification();

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Navbar />
          {notification && <Notification message={notification} onClose={() => showNotification(null)} />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login showNotification={showNotification} />} />
            <Route path="/register" element={<Register showNotification={showNotification} />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/shop" element={<Shop showNotification={showNotification} />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/shipping-policy" element={<ShippingPolicy />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/about" element={<About />} /> 
            <Route path="/message-sent" element={<MessageSent />} />
            <Route path="/create-product" element={<CreateProduct showNotification={showNotification} />} /> 
            <Route path="/order-complete" element={<OrderComplete />} /> 
            <Route path="/admin-dashboard" element={<AdminDashboard />} /> 
          </Routes>
          <Footer />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
