import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { PLACE_ORDER} from './types';
import {getEmail} from '../Components/SignUp/helperApis';

export const placeOrder = (payload) => dispatch => {
  //alert("YYYYY"+JSON.stringify(newCard))
  axios.post('/placeOrder', payload)
      .then(res => 
      {
        alert("IN ACTION RESPONSE "+JSON.stringify(res));
        dispatch({type: PLACE_ORDER, payload: res});
      })
      .catch(err => 
      {
        alert("IN ACTION ERROR "+JSON.stringify(err));
        dispatch({type: PLACE_ORDER, payload: {}})
      });
};