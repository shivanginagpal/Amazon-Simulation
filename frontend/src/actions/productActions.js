import axios from 'axios';

import { GET_ERRORS, GET_PRODUCT_CATEGORIES, GET_PRODUCTS, PRODUCT_LOADING, GET_PRODUCT, POST_PRODUCT, GET_CUSTOMER_NAME, POST_REVIEW, DELETE_PRODUCT, UPDATE_PRODUCT ,UPDATE_IMAGE_PRODUCT, SET_VIEWCOUNT} from './types';

export const postProduct = (formdata, history) => dispatch => {
    console.log("Inside post product actions")
    console.log(formdata);

  return  axios.post('/addProduct/productImage', formdata)
        .then(res => {
            dispatch({
                type: POST_PRODUCT,
                payload: res.status
            })
           // history.push('/sellerHome');
    })
        .catch(err => {
            console.log("Got an error", err);
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        }
        );
};

export const postReviewToProduct = (data) => dispatch => {
    console.log("Inside post product actions")
    console.log(data);

  return  axios.post('/addProductReview', data)
        .then(res => {
            dispatch({
                type: POST_REVIEW,
                payload: res.status
            })
    })
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

export const updateProduct = (data, history) => dispatch => {
    axios.post('/updateProduct', data)
        .then(res => {
            //console.log(res.data);
            dispatch({
                type: UPDATE_PRODUCT,
                payload: res.data
            })
           history.push('/sellerHome');
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

export const updateProductImage= (data, history) => dispatch => {
    axios.post('/updateProductImage/ProductImage', data)
        .then(res => {
            //console.log(res.data);
            dispatch({
                type: UPDATE_IMAGE_PRODUCT,
                payload: res.data
            })
            history.push('/sellerHome');
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: {}
            })
        );
};

export const deleteProduct = (productId, history) => dispatch => {
  return  axios.post('/removeProduct', productId)
        .then(res => {
            //console.log(res.data);
            dispatch({
                type: DELETE_PRODUCT,
                payload: res.status
            })
           // history.push('/sellerHome');
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
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

export const updateProductViews = (id) => dispatch => {
    dispatch(setProductLoading());
    axios.post('/updateProductViews', { "productId": id }
    )
        .then(res => {
            //console.log(res.data);
            dispatch({
                type: SET_VIEWCOUNT,
                payload: res.data
            })
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: {}
            })
        );
};

export const getCustomerName = (id) => dispatch => {
    dispatch(setProductLoading());
    return axios('/getCustomerName', {
        method : 'get',
        params: { "customerId": id }
    })
        .then(res => {
            //console.log(res.data);
            dispatch({
                type: GET_CUSTOMER_NAME,
                payload: res.data
            })
        })
        .catch(err =>
            dispatch({
                type: GET_CUSTOMER_NAME,
                payload: {}
            })
        );
};

export const sellerProducts = (data) => dispatch => {
    dispatch(setProductLoading());
    axios.post('/sellerProductSearch', data)
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


//loading product
export const setProductLoading = () => {
    console.log("came to set product loading");
    return {
        type: PRODUCT_LOADING
    }
}

export const getCustomerReviews = () => dispatch => {
    dispatch(setProductLoading());
   
    axios('/getCustomerReview', {
        method : 'get'
    })
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

export const getProductsUnderSeller = (data) => dispatch => {
    dispatch(setProductLoading());
   
    axios.put('/viewProductsUnderSeller', data)
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