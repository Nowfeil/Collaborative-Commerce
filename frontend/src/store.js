import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import {thunk} from 'redux-thunk';
import { productDetailsReducer, productListReducer, productSaveReducer } from './reducers/productReducer';
import { cartReducer } from './reducers/cartReducer';
import { userProfileUpdateReducer, userSignInReducer, userSignUnReducer } from './reducers/userReducer';
import { orderReducer } from './reducers/orderReducer';

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

    const initialState = {userSignin: { userInfo: userInfoFromStorage }};
const reducer = combineReducers({
  productList: productListReducer,
  productDetails:productDetailsReducer,
  cart:cartReducer,
  userSignin:userSignInReducer,
  userSignup:userSignUnReducer,
  userProfile:userProfileUpdateReducer,
  productSave:productSaveReducer,
  orders:orderReducer
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store;