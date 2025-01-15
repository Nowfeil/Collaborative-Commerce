import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css'; // Custom styling for the app
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';

function App() {
  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  };

  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  };

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button onClick={openMenu} className="menu-button">
              &#9776;
            </button>
            <Link to="/" className="brand-link">CrowdCart</Link>
          </div>
          <div className="header-links">
            <Link to="/cart">Cart</Link>
            <Link to="/signin">Sign In</Link>
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
            </Routes>
          </div>
        </main>
        <footer className="footer">All rights reserved &copy; CrowdCart</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
