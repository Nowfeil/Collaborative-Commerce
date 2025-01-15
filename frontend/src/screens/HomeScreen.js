import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';
import '../css/HomeScreen.css'; // Import the CSS file for styling

function HomeScreen() {
  const productList = useSelector(state => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
    return () => {
      // Cleanup
    };
  }, [dispatch]);

  return loading ? (
    <div className="loading">Loading...</div>
  ) : error ? (
    <div className="error">{error}</div>
  ) : (
    <ul className="products">
      {products.map(product => (
        <li key={product._id} className="product-card">
          <div className="product">
            <Link to={`/product/${product._id}`}>
              <img
                className="product-image"
                src={product.image}
                alt="product"
              />
            </Link>
            <div className="product-info">
              <div className="product-name">
                <Link to={`/product/${product._id}`}>{product.name}</Link>
              </div>
              <div className="product-brand">{product.brand}</div>
              <div className="product-price">${product.price}</div>
              <div className="product-rating">
                {product.rating} Stars ({product.numReviews} Reviews)
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default HomeScreen;
