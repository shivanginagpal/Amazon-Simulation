import { GET_PRODUCT_CATEGORIES, GET_PRODUCTS, PRODUCT_LOADING, GET_PRODUCT } from '../actions/types';

const initialState = {
    product_categories: null,
    products_items: null,
    loading: false,
    product:null,
    reviewed_products: [],

}

export default function (state = initialState, action) {
    switch (action.type) {
        case PRODUCT_LOADING:
            return {
                ...state,
                loading: true

            }
        case GET_PRODUCT_CATEGORIES:
            return {
                ...state,
                loading: false,
                product_categories: action.payload,
            }
        case GET_PRODUCTS:
            return {
                ...state,
                loading: false,
                products_items: action.payload,
            }
        case GET_PRODUCT:
            return {
                ...state,
                loading: false,
                product: action.payload,
            }

        default:
            return state;
    }
}