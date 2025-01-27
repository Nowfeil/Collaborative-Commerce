import React, { useEffect } from 'react';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, fetchCartItems, removeFromCart } from '../actions/cartAction';
import '../css/CartScreen.css';

export default function CartScreen() {
  const { id } = useParams();
  const location = useLocation();
  const cart = useSelector((state) => state.cart);
  const { cartItems  } = cart; // Default to empty array if cartItems is undefined
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const queryParams = new URLSearchParams(location.search);
  const quantity = queryParams.get('qty') ? Number(queryParams.get('qty')) : 1;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id && userInfo) {
      const existingItem = cartItems?.find((item) => item.product === id);
      if (!existingItem || existingItem.quantity !== quantity) {
        dispatch(addToCart(userInfo._id, id, quantity));
      }
    }
    
  }, [id, userInfo, cartItems, quantity, dispatch]);
  



  const removeFromCartHandler = (id, productId) => {
    dispatch(removeFromCart(id, productId));
  };

  const checkoutHandler = () => {
    navigate(`/checkout`);
  };

  return (
    <>
       <div className="cart-screen">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <div>
          Your cart is empty. <Link to="/">Go Back</Link>
        </div>
      ) : (
        <div className="cart">
          <div className="cart-list">
            {cartItems.map((item) => (
              <div key={item.product} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <Link to={`/product/${item.product}`} className="cart-item-name">
                    {item.name}
                  </Link>
                  <div className="cart-item-price">₹{item.price}</div>
                  <div className="cart-item-quantity">
                    <select
                      value={item.quantity}
                      onChange={(e) =>
                        dispatch(addToCart(userInfo._id, item.product, Number(e.target.value)))
                      }
                    >
                      {[...Array(item.countInStock > 0 ? item.countInStock : 1).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                    {item.countInStock === 0 && <p className="out-of-stock">Out of stock</p>}
                  </div>
                </div>
                <button
                  className="remove-button"
                  onClick={() => removeFromCartHandler(userInfo._id, item.product)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="cart-action">
            <h3>
              Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)
            </h3>
            <p>
              Total: ₹{' '}
              {cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
            </p>
            <button className="checkout-button" onClick={checkoutHandler}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
    </>
  );
}
