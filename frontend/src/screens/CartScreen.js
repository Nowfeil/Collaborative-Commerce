import React, { useEffect } from 'react';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartAction';
import '../css/CartScreen.css';

export default function CartScreen() {
  const { id } = useParams();
  const location = useLocation();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const queryParams = new URLSearchParams(location.search);
  const qty = queryParams.get('qty') ? Number(queryParams.get('qty')) : 1;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, []);

  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const checkoutHandler = () => {
    navigate(`/signin?redirect=shipping`)
  };

  return (
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
                  <div className="cart-item-price">${item.price}</div>
                  <div className="cart-item-quantity">
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(addToCart(item.product, Number(e.target.value)))
                      }
                    >
                      {/* Render quantity options based on stock */}
                      {[...Array(item.inStock > 0 ? item.inStock : 1).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                    {item.inStock === 0 && <p className="out-of-stock">Out of stock</p>}
                  </div>
                </div>
                <button
                  className="remove-button"
                  onClick={() => removeFromCartHandler(item.product)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="cart-action">
            <h3>
              Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)
            </h3>
            <p>
              Total: Rs.{' '}
              {cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)}
            </p>
            <button className="checkout-button" onClick={checkoutHandler}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
