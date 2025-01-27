import axios from 'axios';
import { CART_ADD_ITEM, CART_REMOVE_ITEM,FETCH_CART_ITEM } from '../constants/cartConstant';

export const addToCart = (userId, productId, quantity) => async (dispatch, getState) => {
  try {
    
    const { data } = await axios.put(`http://localhost:5000/api/cart/add/${userId}`, { productId, quantity });
    const {items} = data
    dispatch({
      type: CART_ADD_ITEM,
      payload: items,
    });
  } catch (error) {
    console.error('Add to cart failed:', error.response?.data?.message || error.message);
  }
};


export const fetchCartItems = (userId) => async (dispatch, getState) => {
  try {
    
    const { data } = await axios.get(`http://localhost:5000/api/cart/${userId}`);
    const {items} = data
    dispatch({
      type: FETCH_CART_ITEM,
      payload: items,
    });
  } catch (error) {
    console.error('Fetcchcart failed:', error.response?.data?.message || error.message);
  }
};


export const clearCart = () => ({
  type: 'CLEAR_CART',
});


export const removeFromCart = (userId, productId) => async (dispatch, getState) => {
  try {
    const { data } = await axios.delete(`http://localhost:5000/api/cart/remove/${userId}/${productId}`);
    dispatch({
      type: CART_REMOVE_ITEM,
      payload: data,
    });
  } catch (error) {
    console.error('Remove from cart failed:', error.response?.data?.message || error.message);
  }
};
