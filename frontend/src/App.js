import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css'; // Custom styling for the app
import { useDispatch, useSelector } from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import SignupScreen from './screens/SignupScreen';
import ProfileScreen from './screens/ProfileScreen';
import LogoutScreen from './screens/LogoutScreen';
import { USER_SIGNIN_SUCCESS } from './constants/userConstant';
import { ProductsScreen } from './screens/ProductsScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import OrderSuccess from './components/OrderSuccess';
import ProtectedRoute from './ProtectedRoute';
function App() {
  const dispatch = useDispatch();
  const userSignIn = useSelector((state) => state.userSignin);
  const { userInfo } = userSignIn;

  useEffect(() => {
    if (userInfo) {
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: userInfo });
      }
      }, [userInfo, dispatch]);
  // Check and persist user state on app load
  useEffect(() => {
    const savedUserInfo = localStorage.getItem('userInfo');
    if (savedUserInfo) {
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: JSON.parse(savedUserInfo) });
    }
  }, [dispatch]);

  const openMenu = () => {
    document.querySelector('.sidebar').classList.add('open');
  };

  const closeMenu = () => {
    document.querySelector('.sidebar').classList.remove('open');
  };

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button onClick={openMenu} className="menu-button">
              &#9776;
            </button>
            <Link to="/" className="brand-link">
              CrowdCart
            </Link>
          </div>
          <div className="header-links">
            <Link to="/cart">Cart</Link>
            {userInfo ? (
              <>
                <Link to="/profile">{userInfo.name}</Link>
                <Link to="/logout">Sign Out</Link>
              </>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
          </div>
        </header>
        <aside className="sidebar">
          <h3>Shopping Categories</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>
            &times;
          </button>
          <ul>
            <li>
              <Link to="/category/pants">Pants</Link>
            </li>
            <li>
              <Link to="/category/shirts">Shirts</Link>
            </li>
          </ul>
        </aside>
        <main className="main">
          <div className="content">
            <Routes>
              <Route path="/product/:id" element={<ProductScreen />} />
              <Route path="/" element={<HomeScreen />} />
              <Route path="/cart/:id?" element={<CartScreen />} />
              <Route path="/signin" element={<SigninScreen />} />
              <Route path="/register" element={<SignupScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/logout" element={<LogoutScreen />} />
              <Route
                path="/products"
                element={
                  <ProtectedRoute>
                    <ProductsScreen />
                  </ProtectedRoute>
                }
              />
              <Route path="/checkout" element={<CheckoutScreen />} />
              <Route path="/ordersuccess" element={<OrderSuccess/>}/>
            </Routes>
          </div>
        </main>
        <footer className="footer">All rights reserved &copy; CrowdCart</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
