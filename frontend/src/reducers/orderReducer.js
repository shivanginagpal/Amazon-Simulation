import { PLACE_ORDER } from '../actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case PLACE_ORDER:
            return {
                ...state,
                status: action.payload.status,
                orderId: action.payload.id
            }
        default:
            return state;
    }
}