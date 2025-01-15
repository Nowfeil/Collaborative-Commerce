import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstant.js';

export function cartReducer(state = { cartItems: [] }, action) {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const product = state.cartItems.find((x) => x.product === item.product);
      if (product) {
        // If the product already exists, update the quantity
        return {
          cartItems: state.cartItems.map((x) =>
            x.product === product.product ? { ...x, qty: item.qty } : x
          ),
        };
      }
      return { cartItems: [...state.cartItems, item] };

    case CART_REMOVE_ITEM:
      return {

        cartItems: state.cartItems.filter((x) => x.product !== action.payload.id),
      };
    default:
      return state;
  }
}
