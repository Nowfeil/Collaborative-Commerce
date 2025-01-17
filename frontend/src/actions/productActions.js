import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_SAVE_REQUEST, PRODUCT_SAVE_SUCCESS, PRODUCT_SAVE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL } from "../constants/productConstant";
import axios from 'axios';

const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    
    const { data } = await axios.get("http://localhost:5000/api/products");

    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
}

const detailsProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: id });
    const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.message });
  }
};

const saveProduct = (product) =>async(dispatch,getState)=>{
   try{
    dispatch({type:PRODUCT_SAVE_REQUEST})
    const {userSignin:{userInfo}} = getState()
    const {data}=await axios.post('http://localhost:5000/api/products',product,{
      headers:{
        'Content-Type':'application/json',
        'Authorization':'Bearer '+userInfo.token
      }
    })
    dispatch({type:PRODUCT_SAVE_SUCCESS,payload:data})
   }catch(err){
    dispatch({type:PRODUCT_SAVE_FAIL,payload:err.message})
   }
}

const deleteProduct = (productId) =>async(dispatch)=>{
  try{
    dispatch({type:PRODUCT_DELETE_REQUEST})
    const {data}=await axios.delete(`http://localhost:5000/api/products/${productId}`)
    dispatch({type:PRODUCT_DELETE_SUCCESS,payload:data})
    }catch(err){
      dispatch({type:PRODUCT_DELETE_FAIL,payload:err.message})
      }
}
export { listProducts ,detailsProduct,saveProduct,deleteProduct};
