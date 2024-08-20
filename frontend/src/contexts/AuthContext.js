//contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          const { data } = await axios.get('http://localhost:5000/api/users/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setCurrentUser({ ...data, token }); // Ensure token is included
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = async (email, password) => {
    const { data } = await axios.post('http://localhost:5000/api/users/login', { email, password });
    localStorage.setItem('authToken', data.token);
    setCurrentUser({ ...data, token: data.token }); // Ensure token is included
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setCurrentUser(null);
  };

  const register = async (userData) => {
    const { data } = await axios.post('http://localhost:5000/api/users/register', userData);
    localStorage.setItem('authToken', data.token);
    setCurrentUser({ ...data, token: data.token }); // Ensure token is included
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};

export default AuthContext;
