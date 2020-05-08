import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { PLACE_ORDER, GET_ORDER, GET_CUSTOMER_ORDERS, DELETE_ORDER_ITEM, DELETE_ORDER, GET_SELLER_ORDERS, UPDATE_ORDER_STATUS_BY_SELLER, CANCEL_ORDER_BY_SELLER} from './types';
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
        dispatch({type: GET_CUSTOMER_ORDERS, payload: res.data});
      })
      .catch(err => 
      {
        dispatch({type: GET_CUSTOMER_ORDERS, payload: {}})
      });
};

export const deleteOrderItem = (payload) => dispatch => {
  let result = {};
   axios.put("/deleteOrderItem", payload)
    .then(response =>
      { 
        let url = '/getOrderById/'+payload.itemId;
        axios.get(url)
        .then(response =>
          { 
            let flag = Object.keys(response.data).length!==0;
            result = {data : response.data, status : flag}
            dispatch({type: GET_ORDER, payload: result});  
          })
        .catch(err => {
          console.log("GET ORDER ERROR -- ",err);
          result = {data : err, status : false}
          dispatch({type: GET_ORDER, payload: result})}
          );
        //dispatch({type: DELETE_CART_ITEM, payload: result});  
      })
    .catch(err => {
      // console.log("GET CART ERROR -- ",err);
      // result = {data : err, status : false}
      dispatch({type: DELETE_ORDER_ITEM, payload: err})}
      );
};

export const deleteOrder = (payload) => dispatch => {
  let result = {};
  let outerUrl = '/deleteOrder/'+payload;
   axios.put(outerUrl)
    .then(response =>
      { 
        let url = '/getOrderById/'+payload;
        axios.get(url)
        .then(res =>
          { 
            let flag = Object.keys(res.data).length!==0;
            result = {data : res.data, status : flag}
            dispatch({type: GET_ORDER, payload: result});  
          })
        .catch(err => {
          console.log("GET ORDER ERROR -- ",err);
          result = {data : err, status : false}
          dispatch({type: GET_ORDER, payload: result})}
          );
      })
    .catch(err => {
      dispatch({type: DELETE_ORDER, payload: err})}
      );
};

export const getSellerOrders = () => dispatch => {
  let url = '/getSellerOrders/'+getID();
  axios.get(url)
      .then(res => 
      {
        dispatch({type: GET_SELLER_ORDERS, payload: res});
      })
      .catch(err => 
      {
        dispatch({type: GET_SELLER_ORDERS, payload: {}})
      });
};

export const updateOrderStatusBySeller = (payload) => dispatch => {
  let result = {};
   axios.put("/updateOrderStatusBySeller", payload)
    .then(response =>
      { 
        let url = '/getOrderById/'+payload.itemId;
        axios.get(url)
        .then(response =>
          { 
            let flag = Object.keys(response.data).length!==0;
            result = {data : response.data, status : flag}
            dispatch({type: GET_ORDER, payload: result});  
          })
        .catch(err => {
          console.log("GET ORDER ERROR -- ",err);
          result = {data : err, status : false}
          dispatch({type: GET_ORDER, payload: result})}
          );
      })
    .catch(err => {
      dispatch({type: UPDATE_ORDER_STATUS_BY_SELLER, payload: err})}
      );
};

export const cancelOrderBySeller = (payload) => dispatch => {
  let result = {};
   axios.put("/cancelOrderBySeller", payload)
    .then(response =>
      { 
        //dispatch({type: CANCEL_ORDER_BY_SELLER, payload: response})
        let url = '/getSellerOrders/'+getID();
        axios.get(url)
            .then(res => 
            {
              dispatch({type: GET_SELLER_ORDERS, payload: res});
            })
            .catch(err => 
            {
              dispatch({type: GET_SELLER_ORDERS, payload: {}})
            });
      })
    .catch(err => {
      dispatch({type: CANCEL_ORDER_BY_SELLER, payload: err})}
      );
};
