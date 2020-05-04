import axios from 'axios';

import { GET_ERRORS, GET_PRODUCT_CATEGORIES, GET_PRODUCTS, PRODUCT_LOADING, GET_PRODUCT } from './types';

export const postProduct = (formdata, history) => dispatch => {
    console.log("Inside post product actions")
    console.log(formdata);

    axios.post('/addProduct/productImage', formdata)
        .then(res => history.push('/sellerHome'))
        .catch(err => {
            console.log("Got an error", err);
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        }
        );
};

export const getProductCategoryNames = () => dispatch => {
    dispatch(setProductLoading());
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

export const productSearch = (data) => dispatch => {
    dispatch(setProductLoading());
    axios.post('/productSearch', data)
        .then(res => {
            console.log(res.data);
            dispatch({
                type: GET_PRODUCTS,
                payload: res.data
            })
        })
        .catch(err =>
            dispatch({
                type: GET_PRODUCTS,
                payload: {}
            })
        );
};


export const getProduct = (id) => dispatch => {
    dispatch(setProductLoading());
    axios('/getProduct', {
        method : 'get',
        params: { "productId": id }
    })
        .then(res => {
            //console.log(res.data);
            dispatch({
                type: GET_PRODUCT,
                payload: res.data
            })
        })
        .catch(err =>
            dispatch({
                type: GET_PRODUCT,
                payload: {}
            })
        );
};



//loading product
export const setProductLoading = () => {
    console.log("came to set product loading");
    return {
        type: PRODUCT_LOADING
    }
}

