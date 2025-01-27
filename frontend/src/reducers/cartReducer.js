import { CART_ADD_ITEM, CART_REMOVE_ITEM, FETCH_CART_ITEM ,CLEAR_CART} from '../constants/cartConstant';

export function cartReducer(
  state = { cartItems: [], error: null }, 
  action
) {
  switch (action.type) {
    // Add Item to Cart
    case CART_ADD_ITEM:
      return {
        ...state,
        cartItems: action.payload, // Replace cartItems with the updated cart items from the server
      };

    // Remove Item from Cart
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: action.payload, // Replace cartItems with the updated cart items from the server
      };

    case FETCH_CART_ITEM:
      return {
        ...state,
        cartItems: action.payload,
        };
    
    case CLEAR_CART:
      return { ...state, cartItems: [] };
    default:
      return state;
  }
}
