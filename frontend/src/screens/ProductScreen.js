import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../css/ProductScreen.css'; // Add a CSS file for layout and styling
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct } from '../actions/productActions';

function ProductScreen() {
  const { id } = useParams(); // Fetch product ID from the URL params
  const [quantity, setQuantity] = useState(1);

  const productDetails = useSelector(state => state.productDetails);
  const { product, loading, error } = productDetails;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      dispatch(detailsProduct(id)); // Dispatch the action with the product ID
    }
  }, [dispatch, id]);

  const handleToCart = (id)=>{
    navigate(`/cart/${id}?qty=${quantity}`)
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  if (!product) return <div>Product not found</div>;

  return (
    <div className="product-screen">
      <div className="back-to-result">
        <Link to="/">← Back to result</Link>
      </div>

      <div className="product-container">
        {/* Image Column */}
        <div className="product-image-container">
          <img src={product.image} alt={product.name} className="product-image" />
        </div>

        {/* Details Column */}
        <div className="product-details">
          <h1>{product.name}</h1>
          <p className="product-rating">
            ⭐ {product.rating} Stars ({product.numReviews} Reviews)
          </p>
          <p className="product-price">
            Price: <strong>${product.price}</strong>
          </p>
          <p className="product-description">{product.description}</p>
        </div>

        {/* Actions Column */}
        <div className="product-actions">
          <ul>
            <li>
              <span>Price:</span> ${product.price * quantity}
            </li>
            <li>
             {
               product.inStock>0?<span>Status:In Stock</span> :<span>Status:Out of Stock</span>
               
            }
              
            </li>
            <li>
              <span>Qty:</span>
              <select onChange={(e) => setQuantity(e.target.value)} value={quantity}>
                {[...Array(product.inStock).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>

            </li>
            <li>
              {
                product.inStock>0?
                <button className="button primary" onClick={()=>handleToCart(product._id)}>Add to Cart</button>:
                <div style={{color:"red"}}></div>
              }
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProductScreen;
