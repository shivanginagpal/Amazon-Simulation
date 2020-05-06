import { GET_CART , DELETE_CART_ITEM, SAVE_CART_ITEM, CART_CHANGE_PRODUCT_QUANTITY, POST_CART } from '../actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case GET_CART:
            return {
                ...state,
                cartItems: action.payload,
            }
        case DELETE_CART_ITEM:
            return {
                ...state,
                updatedCartItems: action.payload,
            }
        case SAVE_CART_ITEM:
            return {
                ...state,
                updatedCartItems: action.payload,
            }
        case CART_CHANGE_PRODUCT_QUANTITY:
            return {
                ...state,
                updatedCartItems: action.payload,
            }
            case POST_CART:
                return {
                    ...state,
                    status: action.payload,
            }
        default:
            return state;
    }
}