import axios from "axios"
import { CART_ADD_ITEM, CART_REMOVE_FAIL, CART_REMOVE_ITEM } from "../constants/cartConstant"

export const addToCart = (id,qty) => async(dispatch)=>{
    try{
        const {data} = await axios.get(`http://localhost:5000/api/products/${id}`)
        dispatch({type:CART_ADD_ITEM,payload:{
            product:data._id,
            name:data.name,
            image:data.image,
            price:data.price,
            countInStock:data.countInStock,
            qty
        }})
    }catch(error){

    }

}


export const removeFromCart = (id) =>async(dispatch)=>{
    try{
        dispatch({type: CART_REMOVE_ITEM, payload: {id}})

    }catch(error){
        dispatch({type:CART_REMOVE_FAIL})
    }
}