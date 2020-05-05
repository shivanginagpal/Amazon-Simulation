import { PLACE_ORDER } from '../actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case PLACE_ORDER:
            return {
                ...state,
                cartItems: action.payload,
            }
        default:
            return state;
    }
}