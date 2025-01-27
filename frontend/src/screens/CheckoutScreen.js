import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import { orderItems } from "../actions/orderAction";
import { clearCart } from "../actions/cartAction";

export default function CheckoutScreen (){
  const userSignin = useSelector((state)=>state.userSignin)
  const {userInfo} = userSignin
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  // Calculate total price
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // User details state
  const [userDetails, setUserDetails] = useState({
    name: "",
    address: "",
    paymentMethod: "Card",
  });
  const navigate = useNavigate("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const dispatch = useDispatch();
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  // Simulate payment process
  const handlePayment = () => {
    if (!userDetails.name || !userDetails.address) {
      alert("Please fill in all required fields!");
      return;
    }

    setPaymentStatus("Processing...");
    dispatch(orderItems(cartItems,userInfo._id))
    setTimeout(() => {
      setPaymentStatus("Payment Successful! Thank you for your purchase.");
    }, 2000);
    dispatch(clearCart())
    navigate(`/ordersuccess`)
  };

  return (
    <Box sx={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Checkout
      </Typography>

      <Grid container spacing={4}>
        {/* User Details Form */}
        <Grid item xs={12} md={6}>
          <Card sx={{ padding: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Shipping Information
              </Typography>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={userDetails.name}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={userDetails.address}
                onChange={handleInputChange}
                margin="normal"
                multiline
                rows={3}
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Payment Method"
                name="paymentMethod"
                value={userDetails.paymentMethod}
                onChange={handleInputChange}
                select
                margin="normal"
                variant="outlined"
              >
                <MenuItem value="Card">Credit/Debit Card</MenuItem>
                <MenuItem value="PayPal">PayPal</MenuItem>
                <MenuItem value="UPI">UPI</MenuItem>
              </TextField>
            </CardContent>
          </Card>
        </Grid>

        {/* Cart Summary */}
        <Grid item xs={12} md={6}>
          <Card sx={{ padding: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              {cartItems.map((item) => (
                <Box
                  key={item.product}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 1,
                  }}
                >
                  <Typography>{`${item.name} x ${item.quantity}`}</Typography>
                  <Typography>{`₹${item.price * item.quantity}`}</Typography>
                </Box>
              ))}
              <Typography variant="h6" align="right" gutterBottom>
                Total: ₹{totalPrice}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Payment Button */}
        <Grid item xs={12}>
          <Box sx={{ textAlign: "center" }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handlePayment}
              sx={{ marginBottom: 2 }}
            >
              Pay Now
            </Button>
            {paymentStatus && (
              <Typography variant="body1" color="success.main">
                {paymentStatus}
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

