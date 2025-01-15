import axios from 'axios'
const { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNUP_FAIL, USER_SIGNUP_SUCCESS, USER_SIGNUP_REQUEST } = require("../constants/userConstant")


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
