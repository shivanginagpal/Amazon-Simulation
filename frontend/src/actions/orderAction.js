import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { PLACE_ORDER, GET_ORDER, GET_CUSTOMER_ORDERS} from './types';
import {getEmail, getID} from '../Components/SignUp/helperApis';

export const placeOrder = (payload) => dispatch => {
  axios.post('/placeOrder', payload)
      .then(res => 
      {
        dispatch({type: PLACE_ORDER, payload: res});
      })
      .catch(err => 
      {
        dispatch({type: PLACE_ORDER, payload: {}})
      });
};

export const getOrder = (payload) => dispatch => {
  let url = '/getOrderById/'+payload;
  axios.get(url)
      .then(res => 
      {
        dispatch({type: GET_ORDER, payload: res});
      })
      .catch(err => 
      {
        dispatch({type: GET_ORDER, payload: {}})
      });
};

export const getMyOrders = (payload) => dispatch => {
 //("REQUESTING----------getMyOrders-------")
  let url = '/getCustomerOrdersById/'+getID();
  axios.get(url)
      .then(res => 
      {
       // alert("IN getMyOrders ACTION RESPONSE "+JSON.stringify(res.data));
        dispatch({type: GET_CUSTOMER_ORDERS, payload: res.data});
      })
      .catch(err => 
      {
       // alert("IN getMyOrders ACTION ERROR "+JSON.stringify(err));
        dispatch({type: GET_CUSTOMER_ORDERS, payload: {}})
      });
};