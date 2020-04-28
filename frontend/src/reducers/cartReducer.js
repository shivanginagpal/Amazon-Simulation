import { GET_CART } from '../actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case GET_CART:
            return {
                ...state,
                cartItems: action.payload,
            }
        default:
            return state;
    }
}