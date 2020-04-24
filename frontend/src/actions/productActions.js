import axios from 'axios';

import {  GET_ERRORS,GET_PRODUCT_CATEGORIES } from './types';

export const postProduct = (formdata,history) => dispatch => {
    console.log("Inside post product actions")
    console.log(formdata);
    
    axios.post('/addProduct/productImage', formdata)
    .then(res => history.push('/sellerHome'))
    .catch(err => {
        console.log("Got an error",err);
      dispatch({
          type: GET_ERRORS,
          payload: err.response.data
          })}
      );
  };

  export const getProductCategoryNames = () => dispatch => {

    axios.get('/getProductCategories')
         .then(res => {
            //console.log(res.data);
            dispatch({
                type: GET_PRODUCT_CATEGORIES,
                payload: res.data
            })
        })
        .catch(err =>
            dispatch({
                type: GET_PRODUCT_CATEGORIES,
                payload: {}
            })
        );
};

  