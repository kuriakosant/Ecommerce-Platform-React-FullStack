import React, { createContext, useReducer, useContext } from 'react';
import axios from 'axios';

const CartContext = createContext();

const initialState = {
  items: [],
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.productId._id !== action.payload),
      };
    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.productId._id === action.payload.itemId
            ? { ...item, quantity: action.payload.newQuantity }
            : item
        ),
      };
    case 'SET_CART':
      return {
        ...state,
        items: action.payload,
      };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const fetchCart = async () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const { data } = await axios.get('http://localhost:5000/api/cart', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Filter out invalid products
        const validItems = data.items.filter(item => item.productId);

        dispatch({ type: 'SET_CART', payload: validItems });
      } catch (error) {
        console.error('Failed to fetch cart:', error);
      }
    }
  };

  React.useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
