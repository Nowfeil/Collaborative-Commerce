import { ORDER_ITEMS_FAIL, ORDER_ITEMS_REQUEST, ORDER_ITEMS_SUCCESS } from "../constants/orderConstant";
import axios from "axios";
export const orderItems = (cartItems, id) => async (dispatch) => {
    try {
      dispatch({ type: ORDER_ITEMS_REQUEST, processing: true });
      const res = await axios.post(`http://localhost:5000/api/orders/${id}`, { products: cartItems });
      dispatch({ type: ORDER_ITEMS_SUCCESS, payload: res.data, processing: false });
    } catch (err) {
      dispatch({ type: ORDER_ITEMS_FAIL, payload: err.response?.data?.message || err.message, processing: false });
      console.error("Order Creation Error:", err.response?.data || err.message);
    }
  };

export const getOrderedItems = (id)=>async(dispatch)=>{
    try{
        dispatch({type:ORDER_ITEMS_REQUEST,processing:true})
        const res=await axios.get(`http://localhost:5000/api/orders/${id}/orders`)
        dispatch({type:ORDER_ITEMS_SUCCESS,payload:res.data,processing:false})
        }catch(err){
            dispatch({type:ORDER_ITEMS_FAIL,payload:err.response?.data?.message||err.message,processing:false})
        }
}
  