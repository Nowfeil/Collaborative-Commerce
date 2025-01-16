import axios from 'axios'
const { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNUP_FAIL, USER_SIGNUP_SUCCESS, USER_SIGNUP_REQUEST, UPDATE_PROFILE_FAIL, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_REQUEST, USER_LOGOUT } = require("../constants/userConstant")


export const signin = (email, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });

    try {
        const { data } = await axios.post(
            'http://localhost:5000/api/users/signin',
            { email, password }, // Send data in the request body
            {
                headers: { 'Content-Type': 'application/json' }, // Ensure JSON format
            }
        );
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload:
                error.response && error.response.data.msg
                    ? error.response.data.msg
                    : error.message,
        });
    }
};


export const signup = (name,email, password,isAdmin) => async (dispatch) => {
    dispatch({ type: USER_SIGNUP_REQUEST, payload: { email, password } });

    try {
        const { data } = await axios.post(
            'http://localhost:5000/api/users/signup',
            { name,email, password,isAdmin }, // Send data in the request body
            {
                headers: { 'Content-Type': 'application/json' }, // Ensure JSON format
            }
        );
        dispatch({ type: USER_SIGNUP_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: USER_SIGNUP_FAIL,
            payload:
                error.response && error.response.data.msg
                    ? error.response.data.msg
                    : error.message,
        });
    }
};



export const updateUserProfile = (id,name,email, password) => async (dispatch, getState) => {
    dispatch({ type: UPDATE_PROFILE_REQUEST });
    
    const token = getState().userSignin.userInfo.token; // Adjust the path based on your state structure
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
  
    try {
      const { data } = await axios.put(
        'http://localhost:5000/api/users/profile',
        { id,name, email,password },
        config
      );
      dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: UPDATE_PROFILE_FAIL,
        payload: error.response && error.response.data.msg
          ? error.response.data.msg
          : error.message, // Include a fallback error message
      });
    }
  };
  

export const signout = () => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGOUT });
    localStorage.removeItem('userInfo');
  } catch (error) {
    
  }
};