import { ORDER_ITEMS_FAIL, ORDER_ITEMS_REQUEST, ORDER_ITEMS_SUCCESS } from "../constants/orderConstant";

export function orderReducer(state = { orderItems: [] }, action) {
  switch (action.type) {
     case ORDER_ITEMS_REQUEST:
        return { processing: true};
    case ORDER_ITEMS_SUCCESS:
        return {processing:false,orderItems:action.payload}
    case ORDER_ITEMS_FAIL:
        return {processing:false,error:action.payload}
    default:
        return state
  }
}
