import { UPDATE_PROFILE_FAIL, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, USER_LOGOUT, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNUP_FAIL, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS } from "../constants/userConstant";

export const userSignInReducer = (state={},action)=>{
    switch(action.type){
        case USER_SIGNIN_REQUEST:
            return {loading:true}
        case USER_SIGNIN_SUCCESS:
            return {loading:false,userInfo:action.payload}
        case USER_SIGNIN_FAIL:
            return {loading:false,error:action.payload}
        case USER_LOGOUT:  // Handle sign out by clearing the state
            return { loading: false, userInfo: {} };  // Reset userInfo on sign out
        default:
            return state
    }
}

export const userSignUnReducer = (state={},action)=>{
    switch(action.type){
        case USER_SIGNUP_REQUEST:
            return {loading:true}
        case USER_SIGNUP_SUCCESS:
            return {loading:false,userInfo:action.payload}
        case USER_SIGNUP_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state
    }
}

export const userProfileUpdateReducer = (state={},action)=>{
    switch(action.type){
        case UPDATE_PROFILE_REQUEST:
            return {loading:true}
        case UPDATE_PROFILE_SUCCESS:
            return {loading:false,userInfo:action.payload}
        case UPDATE_PROFILE_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state
    }

}

// export const userSignoutReducer = (state = {}, action) => {
//     switch (action.type) {
//       case USER_SIGNOUT_REQUEST:
//         return { loading: true }; // User is in the process of signing out
//       case USER_SIGNOUT_SUCCESS:
//         return { loading: false, userInfo: {} }; // Clear user info
//       case USER_SIGNOUT_FAIL:
//         return { loading: false, error: action.payload }; // Handle any errors during logout
//       default:
//         return state;
//     }
//   };