import axios from 'axios';

import { GET_PROFILE, PROFILE_LOADING, GET_ERRORS, CLEAR_CURRENT_PROFILE } from './types';

export const getCustomerProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios('/getCustomerProfile',
        {
            method: 'get',
        })
        .then(res => {
            console.log(res.data);
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        }
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: {}
            })
        );
}

export const getSellerProfile = (id) => dispatch => {
    dispatch(setProfileLoading());

    axios('/getSellerProfile',
        {
            method: 'get',
            params: { "sellerId": id }
        })
        .then(res => {
            console.log(res.data);
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        }
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: {}
            })
        );
}

//Profile Loading 
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}

//clear profile
export const clearProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    }
}

export const addCustomerNewAddress = (newAddr, history) => dispatch => {
    axios.post('/addAddress', newAddr)
        .then(res => history.push('/savedAddresses'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }))
}

export const addCustomerNewCard = (newCard, history) => dispatch => {
    console.log(newCard);
    axios.post('/addPaymentInfo', newCard)
        .then(res => history.push('/paymentInfo'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }))
}

// Delete Card
export const deleteCard = id => dispatch => {
    axios
        .delete(`/deletePaymentInfo/${id}`)
        .then(res =>
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Delete Address
export const deleteAddress = id => dispatch => {
    axios
        .delete(`/deleteAddress/${id}`)
        .then(res =>
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

//Update Seller Addr
export const updateSellerAddr = (newAddr, history) => dispatch => {
    axios.post('/updateSellerProfile', newAddr)
        .then(res => history.push('/userProfile'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }))
}

export const updateCustomerAddress = (newAddr, history) => dispatch => {
    axios.post('/updateAddress', newAddr )
        .then(res => history.push('/savedAddresses'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }))
}

export const updateCustomerCardInfo = (newCard, history) => dispatch => {
    axios.post('/updatePaymentInfo', newCard )
        .then(res => history.push('/paymentInfo'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }))
}