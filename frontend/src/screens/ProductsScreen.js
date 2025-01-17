import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, listProducts, saveProduct } from '../actions/productActions';

export const ProductsScreen = () => {
  const dispatch = useDispatch();

  // Redux states
  const productList = useSelector((state) => state.productList);
  const { products } = productList;

  const productSave = useSelector((state) => state.productSave);
  const { loading: saveLoading, success: saveSuccess, error: saveError } = productSave;



  // Local state
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    image: '',
    price: 0,
    category: false,
    brand: false,
    countInStock: 0,
    description: '',
    rating: 0,
    numReviews: 0,
  });
  const [deleted,setDelete] = useState(false)
  // Fetch products when component mounts
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch, saveSuccess,deleted ]);

  // Open modal for adding/editing product
  const openModal = (product = null) => {
    if (product) {
      setFormData({
        id: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        category: product.category,
        brand: product.brand,
        countInStock: product.countInStock,
        description: product.description,
        rating: product.rating,
        numReviews: product.numReviews,
      });
    } else {
      setFormData({
        id: '',
        name: '',
        image: '',
        price: 0,
        category: false,
        brand: false,
        countInStock: 0,
        description: '',
        rating: 0,
        numReviews: 0,
      });
    }
    setModalVisible(true);
  };

  // Handle form changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      saveProduct({
        _id: formData.id,
        name: formData.name,
        image: formData.image,
        price: formData.price,
        category: formData.category,
        brand: formData.brand,
        countInStock: formData.countInStock,
        description: formData.description,
        rating: formData.rating,
        numReviews: formData.numReviews,
      })
    );
    setModalVisible(false);
  };

  // Handle product deletion
// Handle product deletion
const handleDelete = (productId) => {
  dispatch(deleteProduct(productId));

  setDelete(true)
};


  return (
    <>
      {/* Create Product Button */}
      <Box sx={{ textAlign: 'right', mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => openModal()}
        >
          Create Product
        </Button>
      </Box>

      {/* Product Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Product Name</strong></TableCell>
              <TableCell><strong>Image</strong></TableCell>
              <TableCell><strong>Price</strong></TableCell>
              <TableCell><strong>Category</strong></TableCell>
              <TableCell><strong>Brand</strong></TableCell>
              <TableCell><strong>Count In Stock</strong></TableCell>
              <TableCell><strong>Description</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products && products.length > 0 ? (
              products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>
                    <img src={product.image} alt={product.name} width="50" />
                  </TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>{product.category ? 'Electronics' : 'Clothing'}</TableCell>
                  <TableCell>{product.brand ? 'Brand A' : 'Brand B'}</TableCell>
                  <TableCell>{product.countInStock}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => openModal(product)}
                      sx={{ mr: 1 }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No products available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for adding/editing product */}
      {modalVisible && (
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 3, p: 3, boxShadow: 3, borderRadius: 2 }}>
          <Typography variant="h5" component="h1" sx={{ mb: 3, textAlign: 'center' }}>
            {formData.id ? 'Edit Product' : 'Add New Product'}
          </Typography>
          {saveLoading && <p>Loading...</p>}
          {saveError && <p style={{ color: 'red' }}>{saveError}</p>}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              name="name"
              fullWidth
              value={formData.name}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Image URL"
              name="image"
              fullWidth
              value={formData.image}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Price"
              name="price"
              type="number"
              fullWidth
              value={formData.price}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Category"
              name="category"
              select
              fullWidth
              value={formData.category}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            >
              <MenuItem value={true}>Electronics</MenuItem>
              <MenuItem value={false}>Clothing</MenuItem>
            </TextField>
            <TextField
              label="Brand"
              name="brand"
              select
              fullWidth
              value={formData.brand}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            >
              <MenuItem value={true}>Brand A</MenuItem>
              <MenuItem value={false}>Brand B</MenuItem>
            </TextField>
            <TextField
              label="Count in Stock"
              name="countInStock"
              type="number"
              fullWidth
              value={formData.countInStock}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Description"
              name="description"
              fullWidth
              value={formData.description}
              onChange={handleChange}
              required
              multiline
              rows={3}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Rating"
              name="rating"
              type="number"
              fullWidth
              value={formData.rating}
              onChange={handleChange}
              required
              inputProps={{ step: 0.1, min: 0, max: 5 }}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Number of Reviews"
              name="numReviews"
              type="number"
              fullWidth
              value={formData.numReviews}
              onChange={handleChange}
              required
              sx={{ mb: 3 }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              {formData.id ? 'Update Product' : 'Add Product'}
            </Button>
          </form>
        </Box>
      )}
    </>
  );
};
