import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signout } from '../actions/userAction'; // Ensure this action is correctly handling user logout

export default function LogoutScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(signout()); // Dispatch signout action to clear user data
    localStorage.removeItem('userInfo'); // Clear user info from localStorage
    navigate('/signin'); // Redirect to the Sign-In page
  }, [dispatch, navigate]);

  return null;
}
