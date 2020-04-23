import { POST_PRODUCT, GET_PRODUCT_CATEGORIES } from '../actions/types';

const initialState = {
    product_categories: {},
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCT_CATEGORIES:
            return {
                ...state,
                product_categories: action.payload,
            }
        default:
            return state;
    }
}