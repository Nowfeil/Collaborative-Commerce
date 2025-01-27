import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const userSignIn = useSelector((state) => state.userSignin);
  const { userInfo } = userSignIn;

  if (!userInfo) {
    // Redirect to sign-in if not logged in
    return <Navigate to="/signin" />;
  }

  if (!userInfo.isAdmin) {
    // Redirect to home if the user is not an admin
    return <Navigate to="/" />;
  }

  return children; // Render the protected component if the user is authorized
};

export default ProtectedRoute;
