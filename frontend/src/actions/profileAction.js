import axios from 'axios';

import { GET_PROFILE, PROFILE_LOADING, GET_ERRORS, CLEAR_CURRENT_PROFILE } from './types';

export const getCustomerProfile = (id) => dispatch => {
    dispatch(setProfileLoading());
    console.log("id", id);
    axios('/getCustomerProfile',
        {
            method: 'get',
        })
        .then(res =>{
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
    return{
        type: PROFILE_LOADING
    }
}

//clear profile
export const clearProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    }
}