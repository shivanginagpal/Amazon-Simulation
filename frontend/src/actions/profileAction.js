import axios from 'axios';

import { GET_PROFILE, PROFILE_LOADING, GET_ERRORS, CLEAR_CURRENT_PROFILE } from './types';

export const getCustomerProfile = (id) => dispatch => {
    dispatch(setProfileLoading());
    console.log("id", id);
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