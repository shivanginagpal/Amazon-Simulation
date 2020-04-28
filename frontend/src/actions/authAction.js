import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from '../Components/SignUp/helperApis';

export const registeruser = (userData, history) => dispatch => {
     axios.post('/signUpUser', userData)
      .then(res => history.push('/login'))
      .catch(err => {
        console.log("Got an error",err);
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
            })}
        );
};

//Login
 export const loginUser = (userData, history) => dispatch =>{
    axios.post('/signIn',userData)
    .then(res => {
        console.log("got response",res);
        const {token} = res.data;
        //set token to local storage
        localStorage.setItem('jwtToken',token);
        setAuthToken(token);
        //Decode token
        const decoded = jwt_decode(token);
        //set current user
        dispatch(setCurrentUser(decoded));
    }).catch(err => { 
        console.log("Got an error",err);
        dispatch(
            {
                type: GET_ERRORS,
                payload: err.response.data
            })
        });
};

//Set Logged in user
export const setCurrentUser = (decoded) => {
    return{
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

//LogOut
export const logoutUser = () => dispatch =>{
    localStorage.removeItem('jwtToken');
    //remove auth
    setAuthToken(false);
    //Set current user empty obj
    dispatch(setCurrentUser({}));
}

export const updateUserInfo = (data,history) => dispatch => {
    axios.post('/updateUserInfo',data)
    .then(res => {
        console.log("got response",res);
        const {token} = res.data;
        //set token to local storage
        localStorage.setItem('jwtToken',token);
        setAuthToken(token);
        //Decode token
        const decoded = jwt_decode(token);
        //set current user
        dispatch(setCurrentUser(decoded));
        
        history.push('/userProfile');
    }).catch(err => { 
        console.log("Got an error",err);
        dispatch(
            {
                type: GET_ERRORS,
                payload: err.response.data
            })
        });
}