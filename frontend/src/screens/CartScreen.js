import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart,fetchCartItems, removeFromCart } from '../actions/cartAction';
import { getUserGroup, getGroupMemberDetails, sendInvite } from '../actions/userAction';
import '../css/CartScreen.css';

export default function CartScreen() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux state selectors
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const allUsers = useSelector((state) => state.allUsers);
  const { users } = allUsers;

  const groupData = useSelector((state) => state.userGroup);
  const { groupMembers } = groupData;

  const groupDetails = useSelector((state) => state.groupMembers);
  const { members } = groupDetails;

  const [searchVal, setSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  const queryParams = new URLSearchParams(location.search);
  const quantity = queryParams.get('qty') ? Number(queryParams.get('qty')) : 1;
  useEffect(() => {
    console.log("Updated Cart Items:", cartItems);
  }, [cartItems]);
  
  // Fetch user group when user logs in
  useEffect(() => {
    if (userInfo) {
      dispatch(getUserGroup(userInfo._id));
    }
  }, [userInfo]);

  // Fetch group members' details when groupMembers changes
  useEffect(() => {
    if (groupMembers?.length > 0) {
      dispatch(getGroupMemberDetails(groupMembers));
    }
  }, [groupMembers]);

  // Fetch users and update cart when id changes
  useEffect(() => {
    if (id && userInfo) {
      const existingItem = cartItems?.find((item) => item.product === id);
      if (!existingItem || existingItem.quantity !== quantity) {
        dispatch(addToCart(userInfo._id, id, quantity));
      }
    }
  }, [id, userInfo  , quantity, dispatch]);

  // Search user by email
  useEffect(() => {
    if (searchVal.trim() !== '') {
      const filtered = users.filter((user) =>
        user.email.toLowerCase().includes(searchVal.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers([]);
    }
  }, [searchVal, users]);

  const removeFromCartHandler = (id, productId) => {
    dispatch(removeFromCart(id, productId));
  };

  const checkoutHandler = () => {
    navigate(`/checkout`);
  };

  const handleAddUsers = (email) => {
    dispatch(sendInvite(email, userInfo.email));
    setSearch('');
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
                        onChange={(e) => {
                          const newQuantity = Number(e.target.value);
                          dispatch(addToCart(userInfo._id, item.product, newQuantity));
                        }}
                      >
                        {[...Array(item.countInStock > 0 ? item.countInStock : 1).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
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

      {/* Group Buying Section */}
      <div className="group-container">
        <h2>Form a Buying Group</h2>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search user by email"
            value={searchVal}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          
          {/* Suggestion Box */}
          {filteredUsers.length > 0 && (
            <div className="suggestion-box">
              {filteredUsers.map((user) => (
                <div key={user._id} className="suggestion-item">
                  {user.name} ({user.email}) 
                  <button className="add-btn" onClick={() => handleAddUsers(user.email)}>Add</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Group Members Section */}
      <div className="group-members-container">
        <h2>Group Members</h2>
        {members && members.length > 0 ? (
          <ul className="group-members-list">
            {members.map((member) => (
              <li key={member._id} className="group-member-item">
                {member.name} ({member.email})
              </li>
            ))}
          </ul>
        ) : (
          <p>No members in the group.</p>
        )}
      </div>
    </>
  );
}
