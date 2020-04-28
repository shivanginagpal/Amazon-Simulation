import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { GET_CART } from './types';
import {getEmail} from '../Components/SignUp/helperApis';

export const getCart = () => dispatch => {
    let url = '/getCart/'+getEmail();
     axios.get(url)
      .then(response =>
        { 
            dispatch({type: GET_CART, payload: response.data});  
        })
      .catch(err => {
        console.log("GET CART ERROR -- ",err);
        dispatch({type: GET_CART, payload: err.response.data})}
        );
};
