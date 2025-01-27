import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
  Alert,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../actions/userAction'; // Action for updating user profile
import { getOrderedItems } from '../actions/orderAction';

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState(false);

  const orders = useSelector(state=>state.orders)
  const {orderItems} = orders;
  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, []);

  useEffect(() => {
    if (userInfo) {
      dispatch(getOrderedItems(userInfo._id)); // Fetch orders for the user
    }
  }, [dispatch, userInfo]);

  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
    } else {
       dispatch(updateUserProfile({ id: userInfo._id, name, email, password }));
      setSuccess(true); // Show success alert
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Profile
        </Typography>
        {success && (
          <Alert severity="success" sx={{ width: '100%', mt: 2 }}>
            Profile updated successfully!
          </Alert>
        )}
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 3, width: '100%' }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="name"
                label="Full Name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Leave blank to keep the same"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Leave blank to keep the same"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Update Profile
          </Button>
        </Box>
      </Box>
      <Box>
      {
  orderItems && orderItems.length > 0 ? (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom >
          Your Orders
        </Typography>
        {orderItems.map((order, index) => (
          <Grid container spacing={2} key={index}>
            <Grid item xs={12} sm={4}>
              {/* Displaying order image */}
              <img
                src={order.image} // Assuming each order has an image field
                alt={order.name} // Assuming each order has a name field
                style={{ width: '100%', height: 'auto' }}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <Typography variant="body1" gutterBottom>
                {/* Displaying product name */}
                <strong>{order.name}</strong>
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {/* Displaying order date */}
                <strong>Order Date: </strong>{new Date(order.orderDate).toLocaleDateString()}
              </Typography>
              <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                {/* Displaying price */}
                Price: ${order.price}
              </Typography>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Grid>
  ) : (
    <Typography variant="body1" color="textSecondary">
      No orders found.
    </Typography>
  )
}

      </Box>
    </Container>
  );
}
