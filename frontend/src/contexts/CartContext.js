import { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      return { ...state, items: action.payload.items };
    case 'ADD_TO_CART':
      return { ...state, items: action.payload.items };
    case 'REMOVE_FROM_CART':
      return { ...state, items: state.items.filter((item) => item.productId._id !== action.payload) };
    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        items: state.items.map((item) =>
          item.productId._id === action.payload.itemId
            ? { ...item, quantity: action.payload.newQuantity }
            : item
        ),
      };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const { data } = await axios.get('http://localhost:5000/api/cart', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          dispatch({ type: 'SET_CART', payload: data });
        } catch (error) {
          console.error('Failed to fetch cart:', error);
        }
      }
    };
    fetchCart();
  }, []);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
